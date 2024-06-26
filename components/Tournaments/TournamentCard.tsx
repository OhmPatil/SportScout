"use client"
import React from "react";
import Image, { StaticImageData } from "next/image";
import SampleEvent1 from "@/assets/Tournaments page/SampleEvent1.png";
import participantIcon from "@/assets/Tournaments page/ParticipantIcon.png";
import { useMutation } from "@apollo/client";
import { ADD_USER_TO_EVENT, GET_EVENTS, PUBLISH_EVENT } from "@/utils/queries";
import client from "@/utils/apolloClient";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

type Props = {
  id: string
  eventName?: string;
  sportName?: string;
  sportType?: string;
  venue?: string;
  date?: string;
  image?: string;
  capacity?: number;
  enrolledUsers?: number;
  joined?: any
};

function TournamentCard({id, eventName, sportName, sportType, venue, date, enrolledUsers, image, capacity, joined}: Props) {
  
  const {toast} = useToast()
  const { data: session } = useSession();
  const [publishEvent] = useMutation(PUBLISH_EVENT, {client: client})
  const [addUsertoEvent] = useMutation(ADD_USER_TO_EVENT, {client: client})

  async function joinEvent() {
    try {
      const {data} = await addUsertoEvent({variables: {id: id, email: session?.user?.email}})
      console.log({data});
      const result = await publishEvent({variables: {id:id}})
      console.log(result);
      client.refetchQueries({include: [GET_EVENTS]})
      toast({title: "Event joined successfully!"})
    }
    catch(error){
      console.log(error);
      toast({title: "An error occured :(",description: "If you haven't completed your profile, please do so in /account", variant: "destructive"})  
    }
  }

  let buttonText;
  if (joined) buttonText = 'Joined'
  else buttonText = 'Join'
  
  return (
    <div className="min-w-[300px] flex flex-col justify-center items-center gap-4 rounded-[18px] border-2 border-[#292932] hover:bg-[#2c2c38] transition-all duration-300">
      {/* Top Image */}
      <div className="w-[300px] h-[200px] rounded-t-[18px] overflow-hidden">
        <Image src={image as string} alt="event picture" width={300} height={200} objectFit="cover" />
      </div>

      {/* Title and date */}
      <div className="w-full p-3">
        <h3 className="font-bold text-xl">{sportName}</h3>
        <p>{sportType}</p>
        <h3 className="font-medium">{eventName}</h3>
        <p className="font-light">{venue}</p>
        <p>{date}</p>
      </div>

      {/* no. of participants and button */}
      <div className="w-full flex justify-between p-3">
        <div>
          <div className="flex justify-start items-center gap-2">
            <Image src={participantIcon} alt="" />
            <p className="font-bold">{capacity! - enrolledUsers!} <span className="font-normal">Slots open</span></p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <Image src={participantIcon} alt="" />
            <p className="font-bold">{enrolledUsers} <span className="font-normal">Participant/s</span></p>
          </div>
        </div>
        <Button disabled={joined} onClick={joinEvent} variant={"secondary"}>{buttonText}</Button>
      </div>
    </div>
  );
}

export default TournamentCard;
