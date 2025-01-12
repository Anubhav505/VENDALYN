import Link from "next/link"
import React from 'react'

const page = () => {
  return (
    <div className='h-full w-full flex justify-center my-12 px-2'>
      <div className='sm:w-[60%] flex flex-col gap-6 text-justify text-sm'>
        <h1 className='heading text-[5.5vw] font-bold sm:text-5xl text-center'>SHIPPING POLICY</h1>
      <p><b>This does not apply for items in Pre-order- Pre-order items take 2-6 days to dispatch post the pre-order ends.</b></p>

      <p><b>There might be rare cases of delays. (details for those will be mentioned in the description)</b></p>

      <p>Your product is shipped within two business days after your order is placed. However, if your order is placed before 10 am, we are most likely to ship on the same day. Your order will be delivered 5-7 days after dispatch. Orders for T-Shirts and other clothing&apos;s will be processed in 1-2 business days ( as it is made on demand ) and will be delivered in 3-5 business days. You can track your order once it has been dispatched from our warehouse. An email and SMS will be sent with a link.</p>

      <p>There might be instances of delays, in-case of any issue please use the <Link href='/contactUs' className="text-blue-500">CONTACT US</Link> Section to get in touch with the team.</p>

      <p>Once an order has been placed, it cannot be canceled because of the fast processing time.</p></div></div>
  )
}

export default page