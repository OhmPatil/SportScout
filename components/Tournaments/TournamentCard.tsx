import React from "react";
import Image, { StaticImageData } from "next/image";
import SampleEvent1 from "@/assets/Tournaments page/SampleEvent1.png";
import participantIcon from "@/assets/Tournaments page/ParticipantIcon.png";
import Button from "@/components/Button";

type Props = {
  title?: string;
  date?: string;
  image?: StaticImageData;
  participantCount?: number;
};

function TournamentCard({title, date, image, participantCount}: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 rounded-[18px] border-2 border-[#292932]">
      {/* Top Image */}
      {/* <Image src={image as StaticImageData} alt="" /> */}

      {/* Title and date */}
      <div className="w-full px-3">
        <h3 className="font-bold">{title}</h3>
        <p>{date}</p>
      </div>

      {/* no. of participants and button */}
      <div className="w-full flex justify-between px-3 pb-3">
        <div className="flex justify-between items-center gap-2">
          <Image src={participantIcon} alt="" />
          <p className="font-bold">{participantCount} <span className="font-normal">Participants</span></p>
        </div>
        <Button />
      </div>
    </div>
  );
}

export default TournamentCard;
