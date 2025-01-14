"use client"
import { useEffect } from "react"
import gsap from "gsap"

const SALE = () => {
  useEffect(() => {
    gsap.from('.red', {
      duration: 1,
      yoyo: true,
      repeat: -1,
      scale:0.6,
      ease: 'power1.inOut'
    })
  }, [])
  return (
    <div className='bg-white w-full sm:h-[4vh] text-black text-center text-xs font-b py-1 flex justify-center items-center gap-1'>
      <h1>Winter Sale Live Now</h1>
      <div className='red bg-red-500 h-2 w-2 rounded-full'></div>
      </div>
  )
}

export default SALE