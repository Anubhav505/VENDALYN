import Link from "next/link"
export default function Policies() {
 return(
   <div className="w-full flex justify-center px-4 py-12">
     <div className="sm:w-[60%] flex flex-col gap-10 text-sm text-justify">

       <div className="flex flex-col gap-4">
         <h1 className='text-[5.5vw] font-bold sm:text-2xl text-center'>TERMS AND CONDITIONS</h1>
         <div>
           <h1 className='font-bold'>Acceptance of Terms</h1>
           <p>Welcome to VENDALYN! By accessing or using our website, you agree to comply with and be bound by the following Terms and Conditions. If you do not agree to these terms, you may not use our website.</p>
         </div>
         <div>
           <h1 className='font-bold'>Changes to Terms</h1>
           <p>VENDALYN reserves the right to update or modify these Terms and Conditions at any time without prior notice. Continued use of the website following any changes constitutes your acceptance of the revised terms.</p>
         </div>
         <div>
           <h1 className='font-bold'>Use of Website</h1>
           <p>Our website is open to users of all ages.</p>
           <p>You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others or restrict or inhibit their use of the website.</p>
         </div>
         <div>
           <h1 className='font-bold'>Product Information</h1>
           <p>We strive to ensure that all product descriptions, pricing, and availability are accurate. However, errors may occur. VENDALYN reserves the right to correct any errors, inaccuracies, or omissions and to change or update information without prior notice.</p>
         </div>
         <div>
           <h1 className='font-bold'>Orders and Payments</h1>
           <p>All orders are subject to acceptance and availability.</p>
           <p>Payments are processed securely, and your personal information is protected according to our Privacy Policy.</p>
           <p>VENDALYN reserves the right to cancel any order if we suspect fraudulent activity or other issues.</p>
         </div>
         <div>
           <h1 className='font-bold'>Shipping and Delivery</h1>
           <p>Delivery timelines are estimates and may vary based on location and circumstances beyond our control.</p>
           <p>VENDALYN is not responsible for delays caused by courier services or other external factors.</p>
         </div>
         <div>
           <h1 className='font-bold'>Returns and Refunds</h1>
           <p>Please refer to our **Refund Policy** for detailed information on returns and refunds.</p>
           <p>Items must be returned in their original condition within the specified return period to be eligible for a refund.</p>
         </div>
         <div>
           <h1 className='font-bold'>Intellectual Property</h1>
           <p>All content on this website, including text, images, logos, and graphics, is the property of VENDALYN or its licensors and is protected by copyright laws.</p>
           <p>You may not reproduce, distribute, or use any content from the website without prior written permission from VENDALYN.</p>
         </div>
         <div>
           <h1 className='font-bold'>Limitation of Liability</h1>
           <p>VENDALYN will not be held responsible for any indirect, incidental, or consequential damages arising from the use of our website or products.</p>
         </div>
         <div>
           <h1 className='font-bold'>User Conduct</h1>
           <p>You agree not to engage in any activity that disrupts or interferes with the functionality of the website.</p>
           <p>You must not upload or share any harmful, offensive, or unlawful content.</p>
         </div>
         <div>
           <h1 className='font-bold'>Third-Party Links</h1>
           <p> Certain content, products and Services available via our Service may include materials from third-parties.
             Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or Services of third-parties.
             We are not liable for any harm or damages related to the purchase or use of goods, Services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party&apos;s policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.</p>
         </div>
         <div>
           <h1 className='font-bold'>Governing Law</h1>
           <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.</p>
         </div>
       </div>

       <div className="flex flex-col gap-4">
         <h1 className='text-[5.5vw] font-bold sm:text-2xl text-center'>PRIVACY POLICY</h1>
         <p>At <strong>VENDALYN</strong>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our website.</p>
         <div>
           <h1 className='font-bold'>Information We Collect</h1>
           <p>Personal Information: Name, email address, shipping address, phone number, and payment details.</p>
           <p>Non-Personal Information: Browser type, IP address, and usage data for analytics purposes.</p>
         </div>
         <div>
           <h1 className='font-bold'>How We Use Your Information</h1>
           <p> To process and fulfill orders.</p>
           <p>To improve our website and services.</p>
           <p>To send updates, promotions, or important notifications.</p>
         </div>
         <div>
           <h1 className='font-bold'>Sharing of Information</h1>
           <p>We do not sell or rent your personal information to third parties. We may share your information with trusted partners to facilitate order processing, delivery, and payment.</p>
         </div>
         <div>
           <h1 className='font-bold'>Data Security</h1>
           <p>We implement robust security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
         </div>
         <div>
           <h1 className='font-bold'>Third-Party Links</h1>
           <p>Our website may contain links to external sites. VENDALYN is not responsible for their privacy practices or content.</p>
         </div>
         <div>
           <h1 className='font-bold'>Changes to This Policy</h1>
           <p>We may update this Privacy Policy periodically. Continued use of our website constitutes acceptance of any changes.</p>
         </div>
       </div>

       <div className="flex flex-col gap-4">
         <h1 className='text-[5.5vw] font-bold sm:text-2xl text-center'>SHIPPING POLICY</h1>
         <p><b>There might be rare cases of delays.</b></p>
         <p>Your product will be shipped within 0-7 business days after your order is placed. Orders for T-shirts and other clothing items, which are made on demand, will be processed within 1-2 business days and delivered in 3-5 business days. Delivery of all orders typically occurs within 5-7 days after dispatch. You can track your order once it has been dispatched from our warehouse</p>
         <p>There might be instances of delays, in-case of any issue please use the <Link href='/contactUs' className="text-blue-500">CONTACT US</Link> Section to get in touch with the team.</p>
         <p>Once an order has been placed, it cannot be canceled because of the fast processing time.</p>
       </div>

       <div className='flex flex-col gap-4'>
         <h1 className='text-[5.5vw] font-bold sm:text-2xl text-center'>RETURN /  REPLACEMENT POLICY</h1>
         <div>
           <h2 className='font-bold'>NO CANCELLATIONS OR REFUNDS</h2>
           <p>We do not offer cancellations or refunds once an order is placed and confirmed. Kindly review all product details, including the size chart, before finalizing your purchase.</p>
         </div>
         <div>
           <h2 className='font-bold'>REPLACEMENT POLICY</h2>
           <p>We provide replacements only for incorrect sizes under the following conditions:</p>
           <p>You must contact us within 72 hours of receiving the product.</p>
           <p>The product should be unused, undamaged, and in its original condition with tags intact.</p>
           <p>You must provide proof of the issue (photos and videos) when contacting us. If an exchange is issued, the video should clearly show the item being packed and handed to the courier, with no cuts, and the parcel fully visible.</p>
           <p>Please note replacements are only possible if the item is available in stock.</p>
           <p>If the customer receives the product in the size they ordered, no exchange will be made, as the size chart is already provided for your reference.</p>
           <p>For replacement requests, please contact us only via the Contact Us section on our website.</p>
         </div>
         <div className='font-bold'>
           <h2>ORDER CONFIRMATION</h2>
           <p>For every order, we will call the customer to confirm the details before processing. This ensures accuracy and minimizes errors, especially regarding size or product selection.</p>
         </div>
       </div>

       <p className="text-center">Thank you for shopping with <b>VENDALYN</b>. We value your trust and strive to deliver the best shopping experience!</p>
     </div>
   </div>
 )

}
