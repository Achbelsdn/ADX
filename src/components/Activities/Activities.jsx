import { useGSAP } from "@gsap/react";
import gsap, { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
// If the constants file still has the old names:
import { chooseLinesSM as activitiesLinesSM } from "../../constants/welcome"; import './activities.css';
import { activitiesLinesLG } from "../../constants/activites"; import './activities.css';

const Activities = () => {
    const isMobD = useMediaQuery({
        query: "(max-width:768px)",
    });
    const activitiesLines = isMobD ? activitiesLinesSM : activitiesLinesLG;

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 769px)",
            isMobile: "(max-width: 768px)"
        }, (context) => {
            let { isMobile } = context.conditions;

            const lines = gsap.utils.toArray(".activities-title-clip");
            const progressLines = gsap.utils.toArray(".progress-line");

            const activitiesTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".activities-section",
                    start: "top 80%",
                    end: "top 20%",
                    scrub: true,
                },
            });

            activitiesTl.from(".activities-subtitle", {
                yPercent: 100,
                opacity: 0,
                ease: "power1.inOut"
            });

            // Animate the div height
            if (!isMobile) {
                activitiesTl.fromTo(
                    ".activities-part",
                    { height: "10vh" },
                    { height: "50vh", ease: "none" }
                );
            }

            // Animate text reveal — run *at the same time*
            activitiesTl.to(
                lines,
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    ease: "none",
                    stagger: 0.2,
                    duration: 1,
                },
                "<" // 👈 runs at the same time as the previous animation
            );

            if (!isMobile) {
                activitiesTl.from(".activities-sec", {
                    yPercent: 100,
                    duration: 1,
                }, "<");
            }

            // Animate Starter progress line from 0% to 50%
            activitiesTl.fromTo(progressLines[0],
                { width: "0%" },
                { width: "50%", duration: 0.5, ease: "power2.in" }
            );

            // Animate Business progress line from 0% to 75%
            activitiesTl.fromTo(progressLines[1],
                { width: "0%" },
                { width: "75%", duration: 0.5, ease: "power2.in" },
                "<" // Start at same time as previous
            );

            // Animate Premium progress line from 0% to 100%
            activitiesTl.fromTo(progressLines[2],
                { width: "0%" },
                { width: "100%", duration: 0.5, ease: "power2.in" },
                "<" // Start at same time as previous
            );
        });
    });

    return (
        <section id="nos-formules" className="activities-section w-full h-[120vh] p-8 mt-16 bg-[#000000]">
            <p className='text-[.7rem] font-bold text-[#FFFFFF] activities-subtitle'>Nos niveaux de service</p>
            <div className="lg:mt-10 mt-7 activities-part origin-bottom">
                {activitiesLines.map((line, index) => (
                    <h1 key={index} className={`activities-heading text-[#FFFFFF] text-[clamp(2.5rem,8vw,9.5rem)] leading-[0.9] font-medium tracking-tighter`}>
                        <span className={`activities-title-break ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>
                            {line}
                            <span className={`activities-title-clip ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>
                                {line}
                            </span>
                        </span>
                    </h1>
                ))}
            </div>
            <div className="activities-sec w-full flex lg:flex-row flex-col justify-center items-start gap-10 lg:mt-0">
                <div className='lg:w-1/2 w-full'>
                    <div className="lg:w-[30%] w-[60%]">
                        <p className="text-[.7rem] text-[#FFFFFF] text-nowrap">Les services ADX® sont adaptés à chaque niveau de projet :</p>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-5 mt-8 mr-14">
                        <div className="w-full mr-14">
                            <div className="flex justify-between w-full mb-4">
                                <h1 className="text-[#FFFFFF] text-xl">Starter</h1>
                                <p className="text-[#FFFFFF] text-[0.7rem]">Délai : 2 à 4 semaines</p>
                            </div>
                            <div className="relative z-9 w-full h-[0.1rem] bg-[#333333]">
                                <div className="progress-line absolute z-10 bg-[#6D001A] w-[50%] h-[0.1rem] top-1/2 -translate-y-1/2 left-0"></div>
                            </div>
                        </div>
                        <div className="w-full mr-14">
                            <div className="flex justify-between w-full mb-4">
                                <h1 className="text-[#FFFFFF] text-xl">Business</h1>
                                <p className="text-[#FFFFFF] text-[0.7rem]">Délai : 1 à 3 mois</p>
                            </div>
                            <div className="relative z-9 w-full h-[0.1rem] bg-[#333333]">
                                <div className="progress-line absolute z-10 bg-[#6D001A] w-[75%] h-[0.1rem] top-1/2 -translate-y-1/2 left-0"></div>
                            </div>
                        </div>
                        <div className="w-full mr-14">
                            <div className="flex justify-between w-full mb-4">
                                <h1 className="text-[#FFFFFF] text-xl">Premium</h1>
                                <p className="text-[#FFFFFF] text-[0.7rem]">Délai : 3 à 6 mois</p>
                            </div>
                            <div className="relative z-9 w-full h-[0.1rem] bg-[#333333]">
                                <div className="progress-line absolute z-10 bg-[#6D001A] w-full h-[0.1rem] top-1/2 -translate-y-1/2 left-0"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lg:w-1/2 w-full text-[#FFFFFF] lg:text-[2rem] text-[1rem] md:leading-[1.1] lg:mt-0 mt-8 lg:pr-0'>
                    <p>Nous voulons nous assurer que votre projet digital soit exceptionnel et percutant. C'est pourquoi nous proposons des formules adaptées à chaque envergure de projet. Que vous lanciez un site vitrine ou une plateforme immersive complexe, nous avons la solution pour donner vie à votre vision.</p>
                </div>
            </div>
        </section>
    );
};

export default Activities;