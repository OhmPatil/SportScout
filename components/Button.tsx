'use client'
import React, { useState } from 'react'

type Props = {}

function Button({}: Props) {
const [joined, setJoined] = useState(false)
  return (
    <button className='font-semibold h-fit w-fit flex justify-center items-center px-[15px] py-[10px] bg-[#0062FF] rounded-[10px]'>
      Join
    </button>
  )
}

export default Button