import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    verso: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663429490206/OIHoSfauIrQhLmDL.png",
    recto: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663429490206/IEmzoiSQCzggMGID.png"
  },
  {
    verso: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663429490206/IbeRBdIHNSfhIasr.png",
    recto: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663429490206/ExHwpCVFPjBiKAQG.png"
  },
  {
    verso: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663429490206/XjRylZgxQhPuguba.png",
    recto: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663429490206/GafOAMRkZzFdtbXe.png"
  }
];

const StickyCols = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 1024px)",
            isMobile: "(max-width: 1023px)"
        }, (context) => {
            let { isMobile } = context.conditions;

            const cards = gsap.utils.toArray(".lusion-card");
            const totalScrollHeight = isMobile ? window.innerHeight * 1.5 : window.innerHeight * 3;
            
            // On desktop spread horizontally, on mobile spread vertically
            const leftPositions = isMobile ? [50, 50, 50] : [20, 50, 80];
            const topPositions = isMobile ? [25, 50, 75] : [50, 50, 50];
            const rotations = isMobile ? [-5, 0, 5] : [-15, 0, 15];
            
            // Adjust scale on mobile if 300px width is too large for the screen
            const scale = isMobile ? 0.75 : 1;

            // Reset transforms to use GSAP
            gsap.set(cards, { xPercent: -50, yPercent: -50, left: "50%", top: "50%", scale: scale });

            // pin the cards section
            ScrollTrigger.create({
                trigger: ".lusion-cards-section",
                start: "top top",
                end: () => `+=${totalScrollHeight}`,
                pin: true,
                pinSpacing: true,
            });

            // Transition background to a refined blue variant only during the animation
            ScrollTrigger.create({
                trigger: ".lusion-cards-section",
                start: "top top",
                end: () => `+=${totalScrollHeight}`,
                id: "body-bg-blue",
                onEnter: () => {
                    gsap.to(".lusion-cards-section", { backgroundColor: "#1d4ed8", duration: 0.5 });
                    gsap.to("body", { backgroundColor: "#1d4ed8", duration: 0.5 });
                },
                onLeave: () => {
                    gsap.to(".lusion-cards-section", { backgroundColor: "#181717", duration: 0.5 });
                    gsap.to("body", { backgroundColor: "#181717", duration: 0.5 });
                },
                onEnterBack: () => {
                    gsap.to(".lusion-cards-section", { backgroundColor: "#1d4ed8", duration: 0.5 });
                    gsap.to("body", { backgroundColor: "#1d4ed8", duration: 0.5 });
                },
                onLeaveBack: () => {
                    gsap.to(".lusion-cards-section", { backgroundColor: "#181717", duration: 0.5 });
                    gsap.to("body", { backgroundColor: "#181717", duration: 0.5 });
                },
            });

            // spread cards
            cards.forEach((card, index) => {
                gsap.to(card, {
                    left: `${leftPositions[index]}%`,
                    top: `${topPositions[index]}%`,
                    rotation: rotations[index],
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".lusion-cards-section",
                        start: "top top",
                        end: () => `+=${isMobile ? window.innerHeight * 0.5 : window.innerHeight}`,
                        scrub: 0.5,
                        id: `spread-${index}`,
                    },
                });
            });

            // rotate and flip cards with staggered effect
            cards.forEach((card, index) => {
                const frontEl = card.querySelector(".flip-card-front");
                const backEl = card.querySelector(".flip-card-back");

                const staggerOffset = index * 0.05;
                const startOffset = 1 / 3 + staggerOffset;
                const endOffset = 2 / 3 + staggerOffset;

                ScrollTrigger.create({
                    trigger: ".lusion-cards-section",
                    start: "top top",
                    end: () => `+=${totalScrollHeight}`,
                    scrub: 1,
                    id: `rotate-flip-${index}`,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        if (progress >= startOffset && progress <= endOffset) {
                            const animationProgress = (progress - startOffset) / (1 / 3);
                            const frontRotation = -180 * animationProgress;
                            const backRotation = 180 - 180 * animationProgress;
                            const cardRotation = rotations[index] * (1 - animationProgress);

                            gsap.set(frontEl, { rotationY: frontRotation });
                            gsap.set(backEl, { rotationY: backRotation });
                            gsap.set(card, { rotation: cardRotation }); // xPercent/yPercent is maintained by GSAP
                        }
                    },
                });
            });
        });

        return () => {
            gsap.set("body", { backgroundColor: "#181717" });
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.id && (trigger.vars.id.includes("spread") || trigger.vars.id.includes("rotate-flip") || trigger.vars.id.includes("body-bg-blue"))) {
                    trigger.kill();
                }
            });
        };
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="lusion-cards-section relative w-full h-[100dvh] bg-[#181717] overflow-hidden m-0 p-0">
            <style>
                {`
                .floating-anim-0 { animation: floating 3s infinite ease-in-out 0s; }
                .floating-anim-1 { animation: floating 3s infinite ease-in-out 0.2s; }
                .floating-anim-2 { animation: floating 3s infinite ease-in-out 0.4s; }

                @keyframes floating {
                    0% { transform: translate(-50%, -50%); }
                    50% { transform: translate(-50%, -60%); }
                    100% { transform: translate(-50%, -50%); }
                }
                `}
            </style>

            {cardsData.map((data, index) => (
                <div key={index} className="lusion-card absolute top-1/2 left-1/2 w-[300px] h-[450px] z-10" style={{ perspective: "1000px" }}>
                    <div className={`card-wrapper absolute top-1/2 left-1/2 w-full h-full floating-anim-${index}`}>
                        <div className="flip-card-inner relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                            <div className="flip-card-front absolute w-full h-full rounded-2xl overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
                                <img src={data.verso} alt={`Verso Carte ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                            <div className="flip-card-back absolute w-full h-full rounded-2xl overflow-hidden" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                                <img src={data.recto} alt={`Recto Carte ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default StickyCols;