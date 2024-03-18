import React from "react";
import Image, { StaticImageData } from "next/image";
import SampleEvent1 from "@/assets/Tournaments page/SampleEvent1.png";
import participantIcon from "@/assets/Tournaments page/ParticipantIcon.png";
import Button from "@/components/Button";

type Props = {
  eventName?: string;
  sportName?: string;
  sportType?: string;
  venue?: string;
  date?: string;
  image?: StaticImageData;
  capacity?: number;
  enrolledUsers?: number;
};

function TournamentCard({eventName, sportName, sportType, venue, date, enrolledUsers, image, capacity}: Props) {
  
  return (
    <div className="min-w-[250px] flex flex-col justify-center items-center gap-4 rounded-[18px] border-2 border-[#292932] p-3">
      {/* Top Image */}
      {/* <Image src={image as StaticImageData} alt="" /> */}

      {/* Title and date */}
      <div className="w-full">
        <h3 className="font-bold text-xl">{sportName}</h3>
        <p>{sportType}</p>
        <h3 className="font-medium">{eventName}</h3>
        <p className="font-light">{venue}</p>
        <p>{date}</p>
      </div>

      {/* no. of participants and button */}
      <div className="w-full flex justify-between">
        <div>
          <div className="flex justify-start items-center gap-2">
            <Image src={participantIcon} alt="" />
            <p className="font-bold">{capacity} <span className="font-normal">Slots</span></p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <Image src={participantIcon} alt="" />
            <p className="font-bold">{enrolledUsers} <span className="font-normal">Participant/s</span></p>
          </div>
        </div>
        <Button />
      </div>
    </div>
  );
}

export default TournamentCard;
