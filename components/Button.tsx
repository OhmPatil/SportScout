'use client'
import React, { useState } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>
{
  label?: string;
}

function Button({label}: ButtonProps) {
const [joined, setJoined] = useState(false)
  return (
    <button className='font-semibold h-fit w-fit flex justify-center items-center px-[15px] py-[10px] bg-[#0062FF] rounded-[10px]'>
      {label ? label : "Join"}
    </button>
  )
}

export default Button