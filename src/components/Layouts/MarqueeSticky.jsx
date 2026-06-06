// import './marqueesticky.css';
import MarqueeText from "../Marquee/MarqueeText";
import StickyCols from "../StickyCols/StickyCols";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MarqueeSticky = () => {
    useGSAP(() => {
        // Removed the height animation that breaks ScrollTrigger positions for subsequent sections
    });

    return (
        <section id="pourquoi-adx" className="w-full min-h-[85vh] overflow-hidden bg-[#181717]">
            <div className="pin-con relative min-h-[85vh] flex flex-col justify-between py-12">
                <div className="pl-8">
                    <p className="text-[0.7rem] text-[#eae5dd] choose-subtitle">
                        Envie d'en savoir plus sur
                        <br />
                        les avantages de—ADX<span>®</span> ?
                    </p>
                </div>

                <div className="w-full my-auto py-8 overflow-hidden z-10">
                    <MarqueeText />
                </div>

                {/* SPACE RESERVER — extremely important */}
                <div className="sticky-spacer w-full h-[30vh]" />
            </div>
        </section>
    );
};

export default MarqueeSticky;
