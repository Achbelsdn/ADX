import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const VideoShowcase = () => {
    const sectionRef = useRef(null);
    const videoWrapperRef = useRef(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const heading = sectionRef.current.querySelector('.vs-heading');
        const sub = sectionRef.current.querySelector('.vs-sub');

        const cta = sectionRef.current.querySelector('.vs-cta');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            }
        });

        tl.from(heading, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" })
          .from(sub, { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
          .from(cta, { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");

        // Parallaxe vidéo
        if (videoWrapperRef.current) {
            gsap.fromTo(videoWrapperRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: videoWrapperRef.current,
                        start: "top 85%",
                    }
                }
            );
        }
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#000000] overflow-hidden pt-24 md:pt-36 pb-2 sm:pb-3"
        >
            {/* Contenu haut — layout horizontal */}
            <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">

                {/* Titre (Gauche) */}
                <h2 className="vs-heading font-ttnorms text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white text-left max-w-2xl">
                    Votre bibliothèque
                    <br />
                    <span className="text-white/40">de composants UX/UI</span>
                </h2>

                {/* Sous-titre et CTA (Droite) */}
                <div className="flex flex-col items-start text-left max-w-sm shrink-0">
                    <p className="vs-sub font-ttnorms text-[15px] md:text-[17px] text-white/50 font-medium leading-relaxed">
                        Choisissez, personnalisez et assemblez vos propres composants pour construire un site qui vous ressemble.
                    </p>

                    <div className="vs-cta mt-6 md:mt-8">
                        <button className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white font-ttnorms text-[13px] sm:text-[14px] font-medium pl-5 sm:pl-6 pr-2 py-2 rounded-full gap-4 transition-colors duration-300">
                            <span className="overflow-hidden h-[20px]">
                                <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                                    <span className="h-[20px] flex items-center">Être notifié</span>
                                    <span className="h-[20px] flex items-center">Être notifié</span>
                                </span>
                            </span>
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
                                <ArrowRight size={14} strokeWidth={2.5} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Vidéo pleine largeur */}
            <div
                ref={videoWrapperRef}
                className="relative z-10 max-w-[1440px] mx-auto px-2 sm:px-3"
            >
                <div className="relative rounded-3xl overflow-hidden bg-[#0a0a0a]">
                    {/* Ligne lumineuse en haut */}
                    <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/25 to-transparent z-10" />

                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto block"
                    >
                        <source src="/ADX/component-library.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
        </section>
    );
};

export default VideoShowcase;
