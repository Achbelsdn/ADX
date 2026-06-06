import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Welcome = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const headers = gsap.utils.toArray('.services-header');
    
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      // 1. Entrée : les 3 lignes glissent vers le centre depuis les côtés
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
          gsap.set(headers[1], { x: `${-100 + self.progress * 100}%` });
          gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
        },
      });

      // 2. Pin : section bloquée, puis effet de séparation + scale-down
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: isMobile ? `+=${window.innerHeight}` : `+=${window.innerHeight * 2}`,
        pin: true,
        scrub: 1,
        pinSpacing: true,
        onUpdate: (self) => {
          if (self.progress <= 0.5) {
            // Phase 1 : ligne 1 descend, ligne 3 monte → ligne 2 reste
            const yProgress = self.progress / 0.5;
            gsap.set(headers[0], { y: `${yProgress * 100}%` });
            gsap.set(headers[2], { y: `${yProgress * -100}%` });
            gsap.set(".welcome-inner", { scale: 1, filter: "brightness(1)" });
          } else {
            // Phase 2 : lignes 1 & 3 hors-écran, tout se réduit (scale)
            gsap.set(headers[0], { y: '100%' });
            gsap.set(headers[2], { y: '-100%' });

            const scaleProgress = (self.progress - 0.5) / 0.5;
            const minScale = isMobile ? 0.4 : 0.1;
            const textScale = 1 - scaleProgress * (1 - minScale);

            headers.forEach((header) => gsap.set(header, { scale: textScale }));
            
            // Effet Leeroy : la section entière se réduit et s'assombrit pendant que Choose la recouvre
            gsap.set(".welcome-inner", { 
              scale: 1 - (0.08 * scaleProgress), 
              filter: `brightness(${1 - (0.6 * scaleProgress)})` 
            });
          }
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section 
      id="a-propos"
      ref={containerRef} 
      className="services relative w-full h-[100svh] bg-transparent z-30 mt-[-2px] overflow-hidden"
    >
      <div className="welcome-inner absolute inset-0 bg-[#000000] w-full h-full flex flex-col justify-center items-center rounded-t-[2.5rem] overflow-hidden origin-top">
        <div className="services-header relative w-full px-4 sm:px-8 bg-[#000000] flex justify-center will-change-transform" style={{ transform: 'translateX(100%)' }}>
          <h2 
            className="text-[clamp(3.5rem,11vw,12rem)] font-bold text-[#f5f5f5] uppercase whitespace-nowrap leading-[0.85] tracking-[-2px] sm:tracking-[-6px]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            CE QUE NOUS FAISONS
          </h2>
        </div>
        <div className="services-header relative w-full px-4 sm:px-8 bg-[#000000] flex justify-center z-10 will-change-transform" style={{ transform: 'translateX(-100%)' }}>
          <h2 
            className="text-[clamp(3.5rem,11vw,12rem)] font-bold text-[#f5f5f5] uppercase whitespace-nowrap leading-[0.85] tracking-[-2px] sm:tracking-[-6px]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            CE QUE NOUS FAISONS
          </h2>
        </div>
        <div className="services-header relative w-full px-4 sm:px-8 bg-[#000000] flex justify-center will-change-transform" style={{ transform: 'translateX(100%)' }}>
          <h2 
            className="text-[clamp(3.5rem,11vw,12rem)] font-bold text-[#f5f5f5] uppercase whitespace-nowrap leading-[0.85] tracking-[-2px] sm:tracking-[-6px]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            CE QUE NOUS FAISONS
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Welcome;