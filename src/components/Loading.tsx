import gsap from 'gsap';
import React, { useEffect } from 'react';

const Loading: React.FC = () => {
    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        gsap.fromTo(
            '.brand h1',
            {
                y: "65vh",
                opacity: 0,
            },
            {
                duration: 1.5,
                y: "-55vh",
                opacity: 1,
                ease: "power2.out",
                stagger: isMobile ? 0 : 0.1,
            }
        );
    }, []);

    return (
        <div className="fixed top-0 w-full h-screen bg-white text-black z-[9999999999999] text-[11vw]">
            <div className='nav absolute top-[100vh] flex justify-center w-full brand'>
                <h1>V</h1>
                <h1>E</h1>
                <h1>N</h1>
                <h1>D</h1>
                <h1>A</h1>
                <h1>L</h1>
                <h1>Y</h1>
                <h1>N</h1>
            </div>
        </div>
    );
};

export default Loading;
