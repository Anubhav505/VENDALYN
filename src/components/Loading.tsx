"use client";
import gsap from 'gsap';
import React, { useEffect } from 'react';

const Loading: React.FC = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const isMobile = window.innerWidth <= 768;

        gsap.fromTo(
            '.brand h1',
            { y: "65vh", opacity: 0 },
            {
                duration: 1.5,
                y: "-55vh",
                opacity: 1,
                ease: "power2.out",
                stagger: isMobile ? 0 : 0.1,
            }
        );

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="fixed top-0 w-full h-screen bg-white text-black z-[9999999] text-[11vw]">
            <div className='nav absolute top-[100vh] flex justify-center w-full brand'>
                {['V', 'E', 'N', 'D', 'A', 'L', 'Y', 'N'].map((letter, index) => (
                    <h1 key={index}>{letter}</h1>
                ))}
            </div>
        </div>
    );
};

export default Loading;
