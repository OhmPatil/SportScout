import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import exportFromJSON from "export-from-json";

type Props = {
  id: string;
  eventName?: string;
  sportName?: string;
  sportType?: string;
  venue?: string;
  date?: string;
  image?: string;
  capacity?: number;
  enrolledUsers?: {
    name: string;
    email: string;
    gender: string;
    dob: string;
  }[];
  joined?: any;
};

function AccountEventCard({
  id,
  eventName,
  sportName,
  sportType,
  venue,
  date,
  enrolledUsers,
  image,
  capacity,
  joined,
}: Props) {

  return (
    <div className="min-w-[300px] flex flex-col justify-center items-center gap-4 rounded-[18px] border-2 border-[#292932]">
      {/* Top Image */}
      <div className="w-[300px] max-h-[200px] rounded-t-[18px] overflow-hidden">
        <Image
          src={image as string}
          alt="event picture"
          width={300}
          height={200}
          objectFit="cover"
        />
      </div>

      {/* Title and date */}
      <div className="w-full p-3">
        <h3 className="font-bold text-xl">{sportName}</h3>
        <p>{sportType}</p>
        <h3 className="font-medium">{eventName}</h3>
        <p className="font-light">{venue}</p>
        <p>{date}</p>
      </div>

      {/* export button */}
      {enrolledUsers?.length! > 0 && enrolledUsers != undefined && (
        <div className="w-full flex justify-between p-3">
            <Button
            variant={"secondary"}
            onClick={() =>
                exportFromJSON({
                data: enrolledUsers as object,
                fields: ["name", "email", "dob", "gender"],
                fileName: `${eventName} participant list`,
                exportType: exportFromJSON.types.csv,
                })
            }
            >
            Export Participants
            </Button>
        </div>
      )}
    </div>
  );
}

export default AccountEventCard;
