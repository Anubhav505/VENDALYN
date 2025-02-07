import React from 'react'

const page = () => {
    return (
        <div className='h-full w-full flex justify-center my-12 px-2'>
            <div className='sm:w-[60%] flex flex-col gap-6 text-justify text-sm'>
                <h1 className='heading text-[5.5vw] font-bold sm:text-5xl text-center'>PRIVACY POLICY</h1>

                <p>At <strong>VENDALYN</strong>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our website.</p>

                <div>
                    <h2 className='text-sm font-bold'>Information We Collect</h2>
                    <p>Personal Information: Name, email address, shipping address, phone number, and payment details.</p>
                    <p>Non-Personal Information: Browser type, IP address, and usage data for analytics purposes.</p>
                </div>

                <div>
                    <h2 className='text-sm font-bold'>How We Use Your Information</h2>
                    <p> To process and fulfill orders.</p>
                    <p>To improve our website and services.</p>
                    <p>To send updates, promotions, or important notifications.</p>
                </div>

                <div>
                    <h2 className='text-sm font-bold'>Sharing of Information</h2>
                    <p>We do not sell or rent your personal information to third parties. We may share your information with trusted partners to facilitate order processing, delivery, and payment.</p>
                </div>

                <div>
                    <h2 className='text-sm font-bold'>Data Security</h2>
                    <p>We implement robust security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
                </div>

                <div>
                    <h2 className='text-sm font-bold'>Third-Party Links</h2>
                    <p>Our website may contain links to external sites. VENDALYN is not responsible for their privacy practices or content.</p>
                </div>

                <div>
                    <h2 className='text-sm font-bold'>Changes to This Policy</h2>
                    <p>We may update this Privacy Policy periodically. Continued use of our website constitutes acceptance of any changes.</p>
                </div>

                <p>Thank you for choosing <strong>VENDALYN</strong></p>
            </div>
        </div>
    )
}

export default page