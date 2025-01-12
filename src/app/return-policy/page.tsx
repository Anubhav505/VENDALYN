import React from 'react'

const page = () => {
  return (
    <div className='h-full w-full flex justify-center my-12 px-2'>
      <div className='sm:w-[60%] flex flex-col gap-6 text-justify text-sm'>

        <h1 className='heading text-[5.5vw] font-bold sm:text-5xl text-center'>RETURN /  REPLACEMENT POLICY</h1>

        <div>
          <h2 className='text-sm font-bold'>NO CANCELLATIONS OR REFUNDS</h2>
          <p>We do not offer cancellations or refunds once an order is placed and confirmed. Kindly review all product details, including the size chart, before finalizing your purchase.</p>
        </div>

        <div>
          <h2 className='text-sm font-bold'>REPLACEMENT POLICY</h2>
          <p>We provide replacements only for incorrect sizes under the following conditions:</p>
          <p>You must contact us within 72 hours of receiving the product.</p>
          <p>The product should be unused, undamaged, and in its original condition with tags intact.</p>
          <p>You must provide proof of the issue (photos and videos) when contacting us. If an exchange is issued, the video should clearly show the item being packed and handed to the courier, with no cuts, and the parcel fully visible.</p>
          <p>Please note replacements are only possible if the item is available in stock.</p>
          <p>If the customer receives the product in the size they ordered, no exchange will be made, as the size chart is already provided for your reference.</p>
          <p>For replacement requests, please contact us only via the Contact Us section on our website.</p>
        </div>

        <div className='text-sm font-bold'>
          <h2>ORDER CONFIRMATION</h2>
          <p>For every order, we will call the customer to confirm the details before processing. This ensures accuracy and minimizes errors, especially regarding size or product selection.</p>
        </div>
        
        <p>Thank you for shopping with VENDALYN. We value your trust and strive to deliver the best shopping experience!</p>
      
      </div>
    </div>
  )
}

export default page
