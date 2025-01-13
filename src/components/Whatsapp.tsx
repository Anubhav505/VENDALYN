import { Instagram } from 'lucide-react'
import React from 'react'

const Whatsapp = () => {
    return (
        <div className='fixed bottom-5 right-5 z-50 text-5xl rounded-lg overflow-hidden cursor-pointer flex  items-center px-1 gap-1'>
            <a href="https://wa.me/message/V4YRKECJHD3TE1" target="_blank">
                <i className="fa-brands fa-square-whatsapp text-green-500 p-1"></i>
            </a>
            <a href="https://www.instagram.com/vendalyn_/" target="_blank">
                <Instagram color="#ff004c" size={49} className='' />
            </a>
        </div>
    )
}

export default Whatsapp