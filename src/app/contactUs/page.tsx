import { Instagram } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='h-[50vh] w-full flex flex-col justify-center items-center text-lg'>
      <div>
        <p>Contact us at </p>
        <p>Email : <a href='mailto:vendalyn.store@gmail.com' className="text-indigo-600 hover:underline">vendalyn.store@gmail.com</a></p>
        <p className='flex gap-1'>Instagram : <a href='https://www.instagram.com/vendalyn_' target="_blank" className="text-pink-500"><Instagram /></a></p>
      </div>
    </div>
  )
}

export default page