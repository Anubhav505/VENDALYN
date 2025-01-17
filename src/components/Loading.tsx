import gsap from 'gsap';
import React, { useEffect } from 'react';


const Loading: React.FC = () => {
    useEffect(() => { 
        gsap.from('.brand span', { 
            duration: 1, 
            y: "10vh", 
            opacity: 0,
            ease: "power2.out",
            stagger: 0.2});
    }, []);
    return (
        <div className="fixed top-0 w-full flex items-center pt-1 justify-center h-screen bg-black text-white z-[9999999999999] brand">       
                <span className='text-[7vw] nav'>V</span>
                <span className='text-[7vw] nav'>E</span>
                <span className='text-[7vw] nav'>N</span>
                <span className='text-[7vw] nav'>D</span>
                <span className='text-[7vw] nav'>A</span>
                <span className='text-[7vw] nav'>L</span>
                <span className='text-[7vw] nav'>Y</span>
                <span className='text-[7vw] nav'>N</span>
        </div>
    );
};

export default Loading;
