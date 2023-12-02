"use client"
import React from "react";
import EarthIcon from "@/assets/Sidebar/EarthIcon.svg";
import TrophyIcon from "@/assets/Sidebar/TrophyIcon.svg";
import ListIcon from "@/assets/Sidebar/ListIcon.svg";
import WhistleIcon from "@/assets/Sidebar/WhistleIcon.svg";
import PlayersIcon from "@/assets/Sidebar/PlayersIcon.svg";
import Image from "next/image";
import { usePathname } from 'next/navigation';

const SidebarContent = [
  {
    icon: EarthIcon,
    name: "Newsfeed",
    link: "newsfeed",
  },
  {
    icon: TrophyIcon,
    name: "Tournaments",
    link: "tournaments",
  },
  {
    icon: ListIcon,
    name: "Leaderboard",
    link: "leaderboard",
  },
  {
    icon: WhistleIcon,
    name: "Sports",
    link: "sports",
  },
  {
    icon: PlayersIcon,
    name: "Players",
    link: "players",
  },
];

function Sidebar() {
    const pathname = usePathname();
    const currentPath = pathname.split('/')[1]
    console.log(currentPath);
    
  return (
    <section className="h-full min-w-[300px] w-[20%]">
      <ul className="flex flex-col gap-8">
        {SidebarContent.map((item, index) => {
          return (
            <li key={index}>
              <a
                href={item.link}
                className="group flex justify-start items-center gap-4 font-bold cursor-pointer"
              >
                {/* blue thing that shows up when item is selected */}
                <div className={(currentPath == item.link ? 'opacity-100' : 'opacity-0') + " h-[30px] w-[5px] bg-blue-400 rounded-tr-xl rounded-br-xl"}></div>

                {/* Link image and name */}
                <div className="h-[40px] aspect-square flex justify-center items-center rounded-full border-2 border-[#292932] group-hover:border-white">
                  <Image src={item.icon} alt="" />
                </div>
                <p>{item.name}</p>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Sidebar;
