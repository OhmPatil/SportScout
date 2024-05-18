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
import { useMutation } from "@apollo/client";
import { CREATE_USER, PUBLISH_USER } from "@/utils/queries";
import client from "@/utils/apolloClient";
import { useToast } from "@/components/ui/use-toast";

type Props = {};

function Page({}: Props) {
  const { toast } = useToast();
  const dobRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [gender, setGender] = useState("");
  const { data: session } = useSession();

  const [createUser] = useMutation(CREATE_USER, { client: client });
  const [publishUser] = useMutation(PUBLISH_USER, { client: client });

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
    <section className="w-[60%]">
      <form action={handleSubmit} className="space-y-4 w-fit mx-auto">
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
    </section>
  );
}

export default Page;
