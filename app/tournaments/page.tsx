import React from 'react'
import TrophyCup from '@/assets/Tournaments page/TrophyCup.png'
import Image from 'next/image'
import TournamentCard from '@/components/Tournaments/TournamentCard'
import { Events } from '@/dummyData'

type Props = {}

function page({}: Props) {
  
  return (
    <section className='w-[60%] flex flex-col justify-center items-center'>
      {/* Top blue heading section */}
      <div className='relative w-full min-h-[120px] bg-[#0062FF] flex justify-center items-center rounded-[20px]'>
        <Image src={TrophyCup} alt='' className='absolute left-[25px]'/>
        <h2 className='text-[24px] text-center font-bold'>381 tournaments<br></br>waiting for you</h2>
      </div>

      {/* Event card container */}
      <div className='max-h-[60vh] w-full flex justify-start items-start flex-wrap gap-8 mt-8 overflow-auto'>
        {Events.map((event, index) => {          
          return (
            <TournamentCard key={index} title={event.title} date={event.date} image={event.image} participantCount={event.participantCount}/>
          )
        })}
      </div>

    </section>
  )
}

export default page