import { Instagram } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='h-[50vh] w-full flex flex-col justify-center items-center text-lg'>
      <div>
        <p>Contact us at </p>
        <p>Company Adress : Delhi Road, Kharkhoda (Sonipat), Ward No. : 6, Pin Code : 131402</p>
        <p>Email : <a href='mailto:vendalyn.store@gmail.com' className="text-indigo-600 hover:underline">vendalyn.store@gmail.com</a></p>
        <p className='flex gap-1'>Instagram : <a href='https://www.instagram.com/vendalyn_' target="_blank" className="text-pink-500"><Instagram /></a></p>
      </div>
    </div>
  )
}

export default page