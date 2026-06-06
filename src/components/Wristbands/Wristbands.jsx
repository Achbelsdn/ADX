import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './wristbands.css';

gsap.registerPlugin(ScrollTrigger);

const Wristbands = () => {
    const wristbandsRef = useRef(null);

    useGSAP(() => {
        gsap.to(".band-1", {
            y: "+=15",
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        gsap.from(".wristband", {
            opacity: 0,
            scale: 1.1,
            duration: 1.5,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: wristbandsRef.current,
                start: "top 80%"
            }
        });
    }, { scope: wristbandsRef });

    const marqueeContent = (
        <div className="marquee-content" key={Math.random()}>
            <span style={{ color: 'white' }}>ADX®</span>
            <div className="checkerboard"></div>
            <span className="cursor">👆</span>
            <span style={{ fontSize: '110px' }}>BÉNIN</span>
            <span>→</span>
            <span style={{ fontSize: '110px' }}>2026</span>
        </div>
    );

    return (
        <div className="wristbands-container" ref={wristbandsRef}>
            <div className="noise-overlay"></div>
            <div className="scene">
                <div className="wristband band-1">
                    <div className="band-end">914261 {">>>"}</div>
                    <div className="band-content">
                        <div className="marquee-track">
                            {[...Array(10)].map((_, i) => (
                                <div className="marquee-content" key={i}>
                                    <span style={{ color: 'white' }}>ADX®</span>
                                    <div className="checkerboard"></div>
                                    <span className="cursor">👆</span>
                                    <span style={{ fontSize: '110px' }}>BÉNIN</span>
                                    <span>→</span>
                                    <span style={{ fontSize: '110px' }}>2026</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wristbands;
