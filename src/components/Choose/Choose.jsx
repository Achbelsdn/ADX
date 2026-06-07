import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Choose = () => {
    const containerRef = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 769px)",
            isMobile: "(max-width: 768px)"
        }, (context) => {
            let { isMobile } = context.conditions;

            const lines = gsap.utils.toArray(".line-reveal");
            const targetWidth = isMobile ? 120 : 300;
            
            lines.forEach((line) => {
                const imgSpan = line.querySelector('.img-span');
                
                if (imgSpan) {
                    let finalWidth = targetWidth;
                    // Si l'image a la classe img-span-small, on réduit sa largeur cible pour éviter les décalages
                    if (imgSpan.classList.contains('img-span-small')) {
                        finalWidth = isMobile ? 70 : 180;
                    }
                    
                    gsap.to(imgSpan, {
                        width: finalWidth,
                        ease: "none",
                        scrollTrigger: {
                            trigger: line,
                            start: "top 90%",
                            end: "top 40%",
                            scrub: 1,
                        }
                    });
                }
            });
        });
    }, { scope: containerRef });

    const imgWidthClass = isMobile ? "w-[120px]" : "w-[300px]";
    const imgHeightClass = isMobile ? "h-[45px]" : "h-[110px]";
    const textClass = isMobile 
        ? "text-[clamp(2.5rem,7vw,4rem)] font-bold tracking-[-2px] text-[#FFFFFF] leading-none" 
        : "text-[7.5rem] font-bold tracking-[-4px] text-[#FFFFFF] leading-none";

    const textClassBlack = isMobile 
        ? "text-[clamp(2.5rem,7vw,4rem)] font-bold tracking-[-2px] text-[#000000] leading-none" 
        : "text-[7.5rem] font-bold tracking-[-4px] text-[#000000] leading-none";

    const fontStyle = { fontFamily: "'Bricolage Grotesque', sans-serif" };

    return (
        <div 
            id="services"
            ref={containerRef}
            className='choose-section w-full min-h-[120vh] bg-[#6D001A] relative z-40 rounded-t-[2.5rem] -mt-[100vh] py-32 flex flex-col justify-center items-center overflow-hidden'
        >
            <div className="flex flex-col gap-4 md:gap-6 w-full px-4 md:px-10 mt-10 md:mt-20">
                <div className="line-reveal flex flex-wrap justify-center items-center gap-3 md:gap-5">
                    <span className={textClass} style={fontStyle}>Nous créons</span>
                    <span className={`img-span ${imgHeightClass} w-0 rounded-[5px] overflow-hidden relative inline-block shrink-0`}>
                        <img className={`absolute left-1/2 h-full ${imgWidthClass} max-w-none -translate-x-1/2 rounded-[5px] object-cover object-center`} src="https://i.pinimg.com/1200x/93/27/65/932765c7cd00055218ba7398119d7d4d.jpg" alt="" />
                    </span>
                    <span className={textClass} style={fontStyle}>des expériences</span>
                </div>
                <div className="line-reveal flex flex-wrap justify-center items-center gap-3 md:gap-5">
                    <span className={textClass} style={fontStyle}>digitales</span>
                    <span className={`img-span ${imgHeightClass} w-0 rounded-[5px] overflow-hidden relative inline-block shrink-0`}>
                        <img className={`absolute left-1/2 h-full ${imgWidthClass} max-w-none -translate-x-1/2 rounded-[5px] object-cover object-center`} src="https://i.pinimg.com/736x/a9/f1/19/a9f11909a9644d7bfd5102fabcd8310c.jpg" alt="" />
                    </span>
                    <span className={textClass} style={fontStyle}>qui</span>
                </div>
                <div className="line-reveal flex flex-wrap justify-center items-center gap-3 md:gap-5">
                    <span className={textClass} style={fontStyle}>inspirent</span>
                    <span className={`img-span ${imgHeightClass} w-0 rounded-[5px] overflow-hidden relative inline-block shrink-0`}>
                        <img className={`absolute left-1/2 h-full ${imgWidthClass} max-w-none -translate-x-1/2 rounded-[5px] object-cover object-center`} src="https://i.pinimg.com/1200x/48/09/77/480977567d6b4503c8f642728f266b72.jpg" alt="" />
                    </span>
                </div>
                <div className="line-reveal flex flex-wrap justify-center items-center gap-3 md:gap-5">
                    <span className={textClass} style={fontStyle}>et propulsent</span>
                </div>
                <div className="line-reveal flex flex-wrap justify-center items-center gap-3 md:gap-5">
                    <span className={textClass} style={fontStyle}>les marques</span>
                    <span className={`img-span img-span-small ${imgHeightClass} w-0 rounded-[5px] overflow-hidden relative inline-block shrink-0`}>
                        <img className={`absolute left-1/2 h-full ${imgWidthClass} max-w-none -translate-x-1/2 rounded-[5px] object-cover object-center`} src="https://i.pinimg.com/1200x/9e/f2/b7/9ef2b73b1e2ff489f99bc0a90196fbea.jpg" alt="" />
                    </span>
                    <span className={textClass} style={fontStyle}>en avant.</span>
                </div>
            </div>
        </div>
    );
};

export default Choose;