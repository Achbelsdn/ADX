import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointerClick, Code2, Box, Rotate3D } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TransitionPills = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      // Tout caché au départ
      gsap.set(".tp-text-1", { opacity: 0, y: 60 });
      gsap.set(".tp-text-1-sub", { opacity: 0, y: 30 });
      gsap.set(".tp-text-2", { opacity: 0, scale: 0.8, y: 60 });
      gsap.set([".tp-pill-1", ".tp-pill-2", ".tp-pill-3", ".tp-pill-4"], { 
        opacity: 0, scale: 0, rotation: -10 
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: isMobile ? `+=${window.innerHeight * 3}` : `+=${window.innerHeight * 4}`,
          pin: true,
          scrub: 1,
          pinSpacing: true,
        }
      });

      // ── Phase 1: Texte 1 apparaît ──
      tl.to(".tp-text-1", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0)
        .to(".tp-text-1-sub", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.3);

      // ── Phase 2: Les pilules pop-in une par une, déjà en position finale dispersée ──
      tl.to(".tp-pill-1", { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)" }, 1.0)
        .to(".tp-pill-2", { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)" }, 1.2)
        .to(".tp-pill-3", { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)" }, 1.4)
        .to(".tp-pill-4", { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)" }, 1.6);

      // ── Pause ──
      tl.to({}, { duration: 0.8 }, 2.5);

      // ── Phase 3: Tout se disperse, texte 2 arrive ──
      const scatterTime = 3.5;

      // Texte 1 s'en va
      tl.to(".tp-text-1", { opacity: 0, x: -100, y: -80, duration: 1.5 }, scatterTime);
      tl.to(".tp-text-1-sub", { opacity: 0, x: -60, y: -40, duration: 1.5 }, scatterTime);

      // Pilules volent vers les coins
      tl.to(".tp-pill-1", { x: isMobile ? "-40vw" : "-35vw", y: "-30vh", scale: 0.7, opacity: 0, rotation: -15, duration: 2 }, scatterTime)
        .to(".tp-pill-2", { x: isMobile ? "40vw" : "35vw", y: "-25vh", scale: 0.7, opacity: 0, rotation: 12, duration: 2 }, scatterTime)
        .to(".tp-pill-3", { x: isMobile ? "-40vw" : "-30vw", y: "30vh", scale: 0.7, opacity: 0, rotation: -8, duration: 2 }, scatterTime)
        .to(".tp-pill-4", { x: isMobile ? "40vw" : "32vw", y: "28vh", scale: 0.7, opacity: 0, rotation: 10, duration: 2 }, scatterTime);

      // Texte 2 apparaît majestueusement
      tl.to(".tp-text-2", { opacity: 1, scale: 1, y: 0, duration: 2, ease: "power2.out" }, scatterTime + 0.3);

      // Pause finale
      tl.to({}, { duration: 1 });
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[100svh] z-30 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 30% 50%, #ffffff 0%, #f8f7f4 100%)' }}
    >

      {/* ═══ TEXTE 1 ═══ */}
      <div className="absolute inset-0 flex items-center z-40 pointer-events-none">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <h1 
            className="tp-text-1 text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 leading-[1.05] tracking-[-0.03em]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            with Intention.<br/>
            to Be <span className="font-semibold">Felt.</span>
          </h1>
          <p 
            className="tp-text-1-sub text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mt-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            From the way words breathe to how animations flow, every part should resonate.
          </p>
        </div>
      </div>

      {/* ═══ TEXTE 2 ═══ */}
      <div 
        className="tp-text-2 absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none px-6"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <h2 className="text-4xl md:text-7xl lg:text-8xl font-light text-gray-900 leading-[1.05] tracking-[-0.03em] mb-6">
          We Build <span className="font-semibold">Experiences</span><br/>
          That Breathe
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-xl leading-relaxed">
          Because lasting experiences aren't made by chance —<br/>
          they're shaped with purpose.
        </p>
      </div>

      {/* ═══ PILULES DISPERSÉES ═══ */}
      {/* Positionnées de manière organique, comme des éléments flottants sur la page */}

      {/* UI/UX — en haut à droite */}
      <div 
        className="tp-pill-1 absolute flex items-center gap-2.5 px-7 py-3.5 rounded-full text-gray-700 text-sm font-medium z-50"
        style={{ 
          top: '18%', right: '12%',
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)',
          backdropFilter: 'blur(12px)',
          animation: 'floatA 6s ease-in-out infinite',
        }}
      >
        <MousePointerClick className="w-4 h-4 text-gray-400" /> UI/UX
      </div>

      {/* Development — au milieu-droite */}
      <div 
        className="tp-pill-2 absolute flex items-center gap-2.5 px-7 py-3.5 rounded-full text-gray-700 text-sm font-medium z-50"
        style={{ 
          top: '42%', right: '8%',
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)',
          backdropFilter: 'blur(12px)',
          animation: 'floatB 7s ease-in-out infinite',
        }}
      >
        <Code2 className="w-4 h-4 text-gray-400" /> Development
      </div>

      {/* Branding — en bas au centre-gauche */}
      <div 
        className="tp-pill-3 absolute flex items-center gap-2.5 px-7 py-3.5 rounded-full text-gray-700 text-sm font-medium z-50"
        style={{ 
          bottom: '22%', left: '15%',
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)',
          backdropFilter: 'blur(12px)',
          animation: 'floatC 5.5s ease-in-out infinite',
        }}
      >
        <Box className="w-4 h-4 text-gray-400" /> Branding
      </div>

      {/* 3D Animation — en bas à droite */}
      <div 
        className="tp-pill-4 absolute flex items-center gap-2.5 px-7 py-3.5 rounded-full text-gray-700 text-sm font-medium z-50"
        style={{ 
          bottom: '15%', right: '18%',
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)',
          backdropFilter: 'blur(12px)',
          animation: 'floatD 6.5s ease-in-out infinite',
        }}
      >
        <Rotate3D className="w-4 h-4 text-gray-400" /> 3D Animation
      </div>

      {/* Keyframes pour le flottement organique */}
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(1.5deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(-1deg); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes floatD {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(-1.5deg); }
        }
      `}</style>
    </section>
  );
};

export default TransitionPills;
