"use client"
import React from 'react'
import TrophyCup from '@/assets/Tournaments page/TrophyCup.png'
import Image from 'next/image'
import TournamentCard from '@/components/Tournaments/TournamentCard'
// import { Events } from '@/dummyData'
import convertISOToNormalDate from '@/utils/convertDate'

import { InMemoryCache, gql, useQuery } from '@apollo/client'
import apolloClient from "@/utils/apolloClient"

type Props = {}

interface eventInterface {
  eventName: string,
  eventDateTime: string,
  isActive: boolean,
  sportName: string,
  sportType: string,
  venue: string,
  id: string,
  capacity: number
}

const GET_EVENTS = gql`
query FetchEvents {
  events {
    eventName
    eventDateTime
    isActive
    sportName
    sportType
    venue
    id
    capacity
  }
}
`

function Page({}: Props) {

  const { loading, error, data } = useQuery(GET_EVENTS, { client: apolloClient});

  if (loading) return <p>loading</p>
  if (error) return <p>{error.message}</p>
  console.log(data.events);

  // Typecasting fetched data 
  const events: eventInterface[] | undefined = data.events as eventInterface[]
  
  
  return (
    <section className='w-[60%] flex flex-col justify-start items-center'>
      {/* Top blue heading section */}
      <div className='relative w-full min-h-[120px] bg-[#0062FF] flex justify-center items-center rounded-[20px]'>
        <Image src={TrophyCup} alt='' className='absolute left-[25px]'/>
        <h2 className='text-[24px] text-center font-bold'>381 tournaments<br></br>waiting for you</h2>
      </div>

      {/* Event card container */}
      <div className='max-h-[60vh] w-full flex justify-start items-start flex-wrap gap-8 mt-8 overflow-auto'>
        {events.map((event, index) => {          
          return (
            <TournamentCard key={index} title={event.eventName} date={convertISOToNormalDate(event.eventDateTime)} participantCount={event.capacity}/>
          )
        })}
      </div>

    </section>
  )
}

export default Page