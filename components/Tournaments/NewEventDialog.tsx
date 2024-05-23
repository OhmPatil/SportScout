"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@apollo/client";
import { CREATE_EVENT, CREATE_IMAGE_ASSET, GET_EVENTS, PUBLISH_EVENT, PUBLISH_IMAGE_ASSET } from "@/utils/queries";
import client from "@/utils/apolloClient";
import { useToast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import sleep from "@/utils/sleep";

type Props = {};

function NewEventDialog({}: Props) {
  const { data: session } = useSession();
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast();
  const [sportType, setSportType] = useState("");
  const [createEvent] = useMutation(CREATE_EVENT, { client: client });
  const [publishEvent] = useMutation(PUBLISH_EVENT, {client: client})
  const [createAsset] = useMutation(CREATE_IMAGE_ASSET, {client: client})
  const [publishAsset] = useMutation(PUBLISH_IMAGE_ASSET, {client: client})

  const eventNameRef = useRef<HTMLInputElement>(null);
  const sportNameRef = useRef<HTMLInputElement>(null);
  const capacityRef = useRef<HTMLInputElement>(null);
  const venueRef = useRef<HTMLInputElement>(null);
  const dateTimeRef = useRef<HTMLInputElement>(null);  

  async function handleSubmit() {
    setLoading(true)
    // Upload image to cloudinary
    const imageFormData = new FormData()
    imageFormData.append("file", image)
    imageFormData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_UPLOAD_PRESET as string)
    imageFormData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME as string)
    const response = await fetch(process.env.NEXT_PUBLIC_CLOUD_URL as string, {method: 'post', body: imageFormData})
    // res contains public url for image -> res.url
    const res = await response.json()
    // Create asset in hygraph (draft stage)
    const createAssetResponse = await createAsset({variables: {url: res.url}})
    const imageID = await createAssetResponse.data.createAsset.id;
    // Need some sleep time between creating and publishing asset
    await sleep(4000)
    // Publish newly created asset
    const publishAssetResponse = await publishAsset({variables: {id: imageID}})

    
    try {
      setLoading(true)
      // Create event object in hygraph
      const { data } = await createEvent({
        variables: {
          eventName: eventNameRef.current?.value,
          sportName: sportNameRef.current?.value,
          sportType: sportType,
          capacity: Number(capacityRef.current?.value),
          venue: venueRef.current?.value,
          eventDateTime: new Date(
            dateTimeRef.current?.value as string
          ).toISOString(),
          creator: session?.user?.email,
          imageID: imageID
        },
      });
      console.log("New event created:", data.createEvent.id);

    //   Publish the newly created object
      const result = await publishEvent({
        variables: { id: data.createEvent.id},
      });
      console.log("EVENT PUBLISHED:", result);
      setLoading(false)
      client.refetchQueries({include: [GET_EVENTS]})
    //   Display success toast
      toast({
        title: "Event created Successfully ✅!",
        description: "idk random description.",
      });
    } catch (error) {
      // Display error toast
      toast({
        title: "Something went wrong :(",
        description:
          "Have you completed your profile yet?, check console for more details",
        variant: "destructive",
      });
      console.error("Error creating event:", error);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Create Event</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-black">Create New Event</DialogTitle>
          <DialogDescription>
            Fill in the form to create a new event.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-name" className="text-right text-black">
                Event name
              </Label>
              <Input
                ref={eventNameRef}
                id="event-name"
                className="col-span-3 text-black"
                placeholder="Name of the event"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sport-name" className="text-right text-black">
                Sport Name
              </Label>
              <Input
                ref={sportNameRef}
                id="sport-name"
                className="col-span-3 text-black"
                placeholder="Cricket / Football etc"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sport-type" className="text-right text-black">
                Type of sport
              </Label>
              <Select required onValueChange={(value) => setSportType(value)}>
                <SelectTrigger className="text-black" id="sport-type">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Indoor">Indoor</SelectItem>
                  <SelectItem value="Outdoor">Outdoor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right text-black">
                Capacity
              </Label>
              <Input
                ref={capacityRef}
                type="number"
                id="capacity"
                className="col-span-3 text-black"
                placeholder="0-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="venue" className="text-right text-black">
                Venue
              </Label>
              <Input
                ref={venueRef}
                type="text"
                id="venue"
                className="col-span-3 text-black"
                placeholder="Alkapuri club, Vadodara"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date-time" className="text-right text-black">
                Date and Time
              </Label>
              <Input
                ref={dateTimeRef}
                type="datetime-local"
                id="date-time"
                className="col-span-3 text-black"
              />
            </div>
          </div>
          <div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image-picker" className="text-right text-black">Event Cover Image</Label>
            {/* @ts-ignore */}
            <Input id="image-picker" type="file" onChange={(e) => setImage(e.target.files[0])}/>
          </div>
          </div>
          <DialogFooter>
            <Button type="submit">{loading ? 'Loading...' : 'Create Event'}</Button>
            {loading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500 my-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NewEventDialog;
