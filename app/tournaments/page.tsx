"use client";
import React from "react";
import TrophyCup from "@/assets/Tournaments page/TrophyCup.png";
import Image from "next/image";
import TournamentCard from "@/components/Tournaments/TournamentCard";
// import { Events } from '@/dummyData'
import convertISOToNormalDate from "@/utils/convertDate";
import { GET_EVENTS } from "@/utils/queries";

import { useQuery } from "@apollo/client";
import apolloClient from "@/utils/apolloClient";
import { useSession } from "next-auth/react";
import NewEventDialog from "@/components/Tournaments/NewEventDialog";

type Props = {};

interface eventInterface {
  eventName: string;
  eventDateTime: string;
  isActive: boolean;
  sportName: string;
  sportType: string;
  venue: string;
  id: string;
  capacity: number;
  about: string
  enrolledAppUsers: {
    email: string;
  }[];
  image: {
    url: string
  }
}

function Page({}: Props) {
  const { data: session } = useSession();

  const { loading, error, data } = useQuery(GET_EVENTS, {
    client: apolloClient,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
  });

  if (loading) return <p>loading</p>;
  if (error) return <p>{error.message}</p>;

  // Typecasting fetched data
  const events: eventInterface[] | undefined = data.events as eventInterface[];
  console.log(events);
  
  

  // logic to check whether user is already registered in an event (used in JSX below)
  // console.log(events[0].enrolledAppUsers.some(obj => obj.email === session?.user?.email));

  return (
    <section className="w-[60%] flex flex-col justify-start items-start gap-4">
      {/* Top blue heading section */}
      <div className="relative w-full min-h-[120px] bg-[#0062FF] flex justify-center items-center rounded-[20px]">
        <Image src={TrophyCup} alt="" className="absolute left-[25px]" />
        <h2 className="text-[24px] text-center font-bold">
          381 tournaments<br></br>waiting for you
        </h2>
      </div>

      {/* Event card container */}
      <div className="max-h-[60vh] w-full flex justify-start items-start flex-wrap gap-8 mt-8 overflow-auto">
        {events.map((event, index) => {
          return (
            <TournamentCard
              image={event.image.url}
              key={index}
              id={event.id}
              eventName={event.eventName}
              date={convertISOToNormalDate(event.eventDateTime)}
              capacity={event.capacity}
              sportName={event.sportName}
              sportType={event.sportType}
              venue={event.venue}
              enrolledUsers={event.enrolledAppUsers.length}
              joined={event.enrolledAppUsers.some((obj) => obj.email === session?.user?.email)}
            />
          );
        })}
      </div>
      <NewEventDialog/>
    </section>
  );
}

export default Page;
