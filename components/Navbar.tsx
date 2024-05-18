'use client'
import Image from 'next/image'
import React from 'react'
import SearchIcon from '@/assets/Navbar/SearchIcon.svg'
import FriendReqIcon from '@/assets/Navbar/FriendRequest.svg'
import BellIcon from '@/assets/Navbar/BellIcon.svg'
import ChatIcon from '@/assets/Navbar/ChatIcon.svg'
import PfpPlaceholderIcon from '@/assets/Navbar/PfpPlaceholder.svg'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import {redirect} from 'next/navigation'
import Link from 'next/link'
import { Button } from './ui/button'

type Props = {}

function Navbar({}: Props) {
  const {data: session} = useSession({
    required: true,
  })
  
  return (
    <div className='bg-[#15151A] w-full h-fit min-h-[80px] flex justify-between items-center px-8'>
        {/* Left logo */}
        <div>
          <Link href={"/tournaments"}>
            <h1 className='text-[16px] tracking-[.4rem]'>SPORTSCOUT</h1>
          </Link>
        </div>

        {/* Center Search bar */}
        <div className='flex justify-start items-center gap-[14px] p-[13px] rounded-[60px] border-2 border-[#292932]'>
            <Image src={SearchIcon} alt=''/>
            <input type="text" name='searchbox' placeholder="Search" className='bg-transparent text-white focus:outline-none' />
        </div>

        {/* Right icons */}
        <div className='flex justify-center items-center gap-6'>
          <p>Signed in as {session?.user?.email}</p>
          <Button variant={"destructive"} onClick={() => signOut()}>Sign out</Button>
            <Image src={FriendReqIcon} alt=''/>
            <Image src={BellIcon} alt=''/>
            <Image src={ChatIcon} alt=''/>
            <Link href={"/account"}>
              <Image src={session?.user?.image!} width={40} height={40} alt='' className='rounded-full'/>
            </Link>
        </div>

    </div>
  )
}

export default Navbar