import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';

gsap.registerPlugin(SplitText, ScrollTrigger);

const FooterBanner = () => {
    const fbConRef = useRef(null);
    const textRef = useRef(null);
    const keyboardAnimated = useRef(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!fbConRef.current) return;
        const rect = fbConRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    useGSAP(() => {
        if (!textRef.current || !fbConRef.current) return;
        
        const heading = textRef.current.querySelector('h1');
        
        // Split text into characters
        const split = new SplitText(heading, { type: "chars", charsClass: "about-char inline-block" });
        
        // Set initial 3D perspective
        gsap.set(textRef.current, { perspective: 1000, transformStyle: "preserve-3d" });
        
        // Create an epic timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: fbConRef.current,
                start: "center 80%", // Déclenche quand le centre de la section arrive en bas de l'écran
                toggleActions: "play none none reverse"
            }
        });

        // Les lettres arrivent de très loin en 3D
        tl.from(split.chars, {
            duration: 1.5,
            z: 600,
            y: 150,
            x: () => gsap.utils.random(-100, 100),
            rotateX: () => gsap.utils.random(-80, 80),
            rotateY: () => gsap.utils.random(-80, 80),
            rotateZ: () => gsap.utils.random(-30, 30),
            scale: 0,
            opacity: 0,
            stagger: {
                amount: 0.8,
                from: "random"
            },
            ease: "back.out(1.5)"
        });

        // Deuxième ScrollTrigger : On déclenche l'animation sans bloquer le scroll (pas de pin)
        ScrollTrigger.create({
            trigger: fbConRef.current,
            start: "top 30%", // Quand la section arrive à 30% du haut de l'écran
            onEnter: () => {
                // Rangement du texte "À PROPOS" en haut à gauche
                gsap.to(textRef.current, { 
                    scale: 0.2, 
                    x: "-35vw",
                    y: "-35vh",
                    filter: "brightness(0.5)",
                    duration: 1.2,
                    ease: "power3.inOut"
                });

                // Apparition du clavier avec animejs
                if (!keyboardAnimated.current) {
                    keyboardAnimated.current = true;
                    gsap.set(".keyboard-container", { perspective: 1500 }); // On ne met PAS pointerEvents auto pour ne pas bloquer le scroll
                    animate('.keyboard-container', {
                        scale: [0.5, 1], // Il prend tout l'espace
                        opacity: [0, 1],
                        rotateX: ['60deg', '0deg'], // Il commence "posé" (couché) et se redresse
                        rotateZ: ['-15deg', '0deg'],
                        duration: 1200,
                        delay: 400, // Petit délai pour laisser le texte s'écarter
                        ease: 'outElastic(1, .8)'
                    });
                }
            },
            onLeaveBack: () => {
                // Le texte revient au centre
                gsap.to(textRef.current, { 
                    scale: 1, 
                    x: "0vw",
                    y: "0vh",
                    filter: "brightness(1)",
                    duration: 1.2,
                    ease: "power3.inOut"
                });

                // Le clavier disparaît
                if (keyboardAnimated.current) {
                    keyboardAnimated.current = false;
                    animate('.keyboard-container', {
                        scale: [1, 0.5],
                        opacity: [1, 0],
                        rotateX: ['0deg', '60deg'],
                        rotateZ: ['0deg', '15deg'],
                        duration: 600,
                        ease: 'inQuad'
                    });
                }
            }
        });

        // Cleanup
        return () => {
            split.revert();
        };

    }, { scope: fbConRef });

    return (
        <div 
            ref={fbConRef} 
            onMouseMove={handleMouseMove}
            className="relative w-full min-h-dvh bg-[#000000] flex flex-col items-center justify-center overflow-hidden py-20"
        >

            {/* Contenu Principal */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-7xl px-4">
                
                {/* Typographie Massive ABOUT US */}
                <div ref={textRef} className="flex flex-col gap-1 will-change-transform" style={{ perspective: "1000px" }}>
                    <h1 className="font-ttnorms text-[clamp(4rem,15vw,16rem)] font-bold tracking-tighter text-[#FFFFFF] leading-none whitespace-nowrap">
                        À PROPOS
                    </h1>
                </div>
                
            </div>

            {/* CLAVIER 3D SPLINE - NOUVELLE VERSION */}
            {/* L'espace entier devient l'espace du clavier (inset-0, w-full h-full) */}
            <div className="keyboard-container absolute inset-0 z-40 w-full h-full pointer-events-none opacity-0">
                <iframe 
                    src="https://my.spline.design/customkeyboardcmdcorv-z0dSNUEvaZl1LNYNf2qk3QPt/" 
                    frameBorder="0" 
                    width="100%" 
                    height="100%"
                    className="w-full h-full pointer-events-none bg-transparent"
                    allowTransparency="true"
                ></iframe>
                {/* Patch noir pour cacher le logo Spline sans rogner l'iframe */}
                <div className="absolute bottom-0 right-0 w-[160px] h-[60px] bg-[#000000] z-50 pointer-events-none"></div>
            </div>
        </div>
    );
};

export default FooterBanner;