"use client";
import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER, PUBLISH_USER, GET_ENROLLED_EVENTS, GET_CREATED_EVENTS } from "@/utils/queries";
import client from "@/utils/apolloClient";
import { useToast } from "@/components/ui/use-toast";
import apolloClient from "@/utils/apolloClient";
import convertISOToNormalDate from "@/utils/convertDate";
import exportFromJSON from 'export-from-json'
import TournamentCard from "@/components/Tournaments/TournamentCard";
import AccountEventCard from "@/components/Account/AccountEventCard";

type Props = {};

interface enrolledEventInterface {
  id: string
  eventName: string,
  eventDateTime: string,
  capacity: number
  sportType: string,
  sportName: string,
  venue: string,
  image: {
    url: string
  }
}

interface createdEventInterface {
  id: string,
  capacity: number
  eventName: string,
  eventDateTime: string,
  sportType: string,
  sportName: string,
  venue: string,
  enrolledAppUsers: {
    name: string,
    email: string,
    gender: string,
    dob: string,
  }[],
  image: {
    url: string
  }

}

function Page({}: Props) {
  const { toast } = useToast();
  const dobRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [gender, setGender] = useState("");
  const { data: session } = useSession();

  const [createUser] = useMutation(CREATE_USER, { client: client });
  const [publishUser] = useMutation(PUBLISH_USER, { client: client });
  const enrolledEventsData = useQuery(GET_ENROLLED_EVENTS, {
    variables: {email: session?.user?.email},
    client: apolloClient,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
  });
  
  const createdEventsData = useQuery(GET_CREATED_EVENTS, {
    variables: {email: session?.user?.email},
    client: apolloClient,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
  });
  
  
  if (enrolledEventsData.loading || createdEventsData.loading) return <p>loading...</p>
  if (enrolledEventsData.error || createdEventsData.error) return <p>error occured...</p>
  const enrolledEvents : enrolledEventInterface[] | undefined = enrolledEventsData.data.appUser.enrolledEvents as enrolledEventInterface[]
  const createdEvents : createdEventInterface[] | undefined = createdEventsData.data.events as createdEventInterface[]
  console.log(createdEventsData.data.events);


  async function handleSubmit() {
    try {
      // Create user object in hygraph
      const { data } = await createUser({
        variables: {
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          dob: new Date(dobRef.current?.value as string).toISOString(),
          gender: gender,
        },
      });
      console.log("New user created:", data.createAppUser.id);

      // Publish the newly created object
      const result = await publishUser({
        variables: { id: data.createAppUser.id },
      });
      console.log("USER PUBLISHED:", result);
      // Display success toast
      toast({
        title: "Details saved successfully ✅!",
        description: "You may join events now.",
      });
    } catch (error) {
      // Display error toast
      toast({ title: "Something went wrong :(", description: "User with this email probably exists, check console for more details", variant: "destructive" });
      console.error("Error creating user:", error);
    }
  }

  // TODO: Disable form fields if user already exists in DB
  return (
    <section className="w-[60%] max-h-[80vh] space-y-4 overflow-auto">
      <h3 className="text-2xl font-semibold">Your account</h3>
      <form action={handleSubmit} className="space-y-4 w-fit">
        {/* Name Field */}
        <div className="">
          <Label htmlFor="name">Name</Label>
          <Input
            required
            ref={nameRef}
            id="name"
            className="text-black border-2 border-black"
            placeholder="Enter your name"
            defaultValue={session?.user?.name as string}
            type="text"
          />
        </div>

        <div className="">
          {/* Email Field */}
          <Label htmlFor="email">Email</Label>
          <Input
            required
            ref={emailRef}
            id="name"
            className="text-black border-2 border-black"
            defaultValue={session?.user?.email as string}
            type="email"
            disabled
          />
        </div>

        <div className="">
          {/* DOB Field */}
          <Label htmlFor="dob">Date Of Birth</Label>
          <Input
            required
            ref={dobRef}
            id="dob"
            className="text-black border-2 border-black"
            placeholder="name@example.com"
            type="date"
          />
        </div>

        <div>
          {/* Gender Field */}
          <Label htmlFor="gender">Gender</Label>
          <Select required onValueChange={(value) => setGender(value)}>
            <SelectTrigger className="text-black" id="gender">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" label="Submit" />
      </form>

      {/* Show enrolled events */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Enrolled events</h3>
        {enrolledEventsData.loading && (
          <span>loading events...</span>
        )}
          <div className="w-fit flex gap-4 flex-wrap">
            {enrolledEvents.map((item, index:number) => {
              return (
                <AccountEventCard
                  image={item.image.url}
                  key={index}
                  id={item.id}
                  eventName={item.eventName}
                  date={convertISOToNormalDate(item.eventDateTime)}
                  capacity={item.capacity}
                  sportName={item.sportName}
                  sportType={item.sportType}
                  venue={item.venue}
                />
              )
            })}
          </div>
        </div>

      {/* Show created events */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Created events</h3>
        {createdEventsData.loading && (
          <span>loading events...</span>
        )}
        <div className="w-fit flex gap-4 flex-wrap">
        {createdEvents.map((item, index:number) => {
          return (
            <div key={index} className="">
                <AccountEventCard
                  image={item.image.url}
                  key={index}
                  id={item.id}
                  eventName={item.eventName}
                  date={convertISOToNormalDate(item.eventDateTime)}
                  capacity={item.capacity}
                  sportName={item.sportName}
                  sportType={item.sportType}
                  venue={item.venue}
                  enrolledUsers={item.enrolledAppUsers}
                />              
            </div>
        )
        })}
        </div>
      </div>
    </section>
  );
}

export default Page;
