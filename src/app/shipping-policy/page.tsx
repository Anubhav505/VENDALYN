import Link from "next/link"
import React from 'react'

const page = () => {
  return (
    <div className='h-full w-full flex justify-center my-12 px-2'>
      <div className='sm:w-[60%] flex flex-col gap-6 text-justify text-sm'>
        <h1 className='heading text-[5.5vw] font-bold sm:text-5xl text-center'>SHIPPING POLICY</h1>

      <p><b>There might be rare cases of delays.</b></p>

      <p>Your product will be shipped within 0-7 business days after your order is placed. Orders for T-shirts and other clothing items, which are made on demand, will be processed within 1-2 business days and delivered in 3-5 business days. Delivery of all orders typically occurs within 5-7 days after dispatch. You can track your order once it has been dispatched from our warehouse</p>

      <p>There might be instances of delays, in-case of any issue please use the <Link href='/contactUs' className="text-blue-500">CONTACT US</Link> Section to get in touch with the team.</p>

      <p>Once an order has been placed, it cannot be canceled because of the fast processing time.</p></div></div>
  )
}

export default page