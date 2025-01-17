import gsap from 'gsap';
import React, { useEffect } from 'react';


const Loading: React.FC = () => {
    useEffect(() => { 
        gsap.from('.brand span', { 
            duration: 2, 
            y: "-15vh", 
            opacity: 0,
            ease: "elastic.out(1, 1)",
            stagger: 0.25});
    }, []);
    return (
        <div className="fixed top-0 w-full flex items-start pt-1 justify-center h-screen bg-black text-white z-[9999999999999] brand">       
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
