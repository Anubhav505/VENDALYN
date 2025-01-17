import gsap from 'gsap';
import React, { useEffect } from 'react';


const Loading: React.FC = () => {
    useEffect(() => { 
        gsap.from('.brand h1', { 
            duration: 1.5, 
            y: "50vh", 
            opacity: 0,
            ease: "power2.out",
            display: "none"
       })
    }, []);
    return (
        <div className="fixed top-0 w-full flex items-center pt-1 justify-center h-screen bg-black text-white z-[9999999999999] brand">       
                <h1 className='text-[11vw] nav'>VENDALYN</h1>
        </div>
    );
};

export default Loading;
