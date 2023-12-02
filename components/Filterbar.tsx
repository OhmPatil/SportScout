import React from 'react'
import sportThumbnail from '@/assets/Tournaments page/SportsThumbnail.png'
import venueThumbnail from '@/assets/Tournaments page/VenueThumbnail.png'
import Image from 'next/image'

type Props = {}

export default function Filterbar({}: Props) {
  return (
    <section className='w-[20%] h-full max-h-[80vh] flex flex-col justify-start items-start gap-8 px-8 overflow-auto'>

        {/* Filter section */}
        <h4 className='text-[24px] font-bold'>Filter by</h4>
        <select name="" id="" className='p-[10px] font-sans font-bold bg-transparent rounded-[10px] border-2 border-white'>
            <option value="" className='bg-transparent text-black'>This week</option>
            <option value="" className='bg-transparent text-black'>This month</option>
            <option value="" className='bg-transparent text-black'>This year</option>
        </select>
        <select name="" id="" className='p-[10px] font-sans font-bold bg-transparent rounded-[10px] border-2 border-white'>
            <option value="" className='bg-transparent text-black'>Global</option>
            <option value="" className='bg-transparent text-black'>Local</option>
        </select>
        <select name="" id="" className='p-[10px] font-sans font-bold bg-transparent rounded-[10px] border-2 border-white'>
            <option value="" className='bg-transparent text-black'>Any format</option>
            <option value="" className='bg-transparent text-black'>Specific format</option>
        </select>

        {/* Sports section */}
        <div className='flex flex-col gap-4'>
            <h4 className='text-[24px] font-bold'>Sports</h4>
            <div className='grid grid-cols-3 items-start gap-x-6 gap-y-4'>
                <Image src={sportThumbnail} alt=''/>
                <Image src={sportThumbnail} alt=''/>
                <Image src={sportThumbnail} alt=''/>
                <Image src={sportThumbnail} alt=''/>
                <Image src={sportThumbnail} alt=''/>
                <Image src={sportThumbnail} alt=''/>
                <Image src={sportThumbnail} alt=''/>
                <Image src={sportThumbnail} alt=''/>
                <Image src={sportThumbnail} alt=''/>
            </div>
        </div>

        {/* Venue section */}
        <div className='flex flex-col gap-4'>
            <h4 className='text-[24px] font-bold'>Venues</h4>
            <div className='grid grid-cols-3 items-start gap-x-6 gap-y-4'>
                <Image src={venueThumbnail} alt=''/>
                <Image src={venueThumbnail} alt=''/>
                <Image src={venueThumbnail} alt=''/>
            </div>
        </div>

    </section>
  )
}