import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Shader, ChromaFlow, FilmGrain, FlutedGlass, Swirl } from 'shaders/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href === '#' ? '#accueil' : href;
    const smoother = ScrollSmoother.get();
    
    if (smoother) {
      smoother.scrollTo(targetId, true, "top top");
    } else {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      animation: gsap.to(".hero-inner", {
        scale: 0.92,
        ease: "none"
      }),
      scrub: true,
    });
  }, { scope: heroRef });



  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <div id="accueil" ref={heroRef} className="min-h-screen bg-[#000000] relative overflow-hidden flex flex-col">
        <div className="hero-inner bg-[#EFEFEF] w-full h-full flex flex-col origin-top absolute inset-0 overflow-hidden">
        {/* SHADER BACKGROUND - Z-10 */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Shader>
            <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
            <ChromaFlow
              baseColor="#ffffff"
              downColor="#ff5f03"
              leftColor="#ff5f03"
              rightColor="#ff5f03"
              upColor="#ff5f03"
              momentum={13}
              radius={3.5}
            />
            <FlutedGlass
              aberration={0.61}
              angle={31}
              frequency={8}
              highlight={0.12}
              highlightSoftness={0}
              lightAngle={-90}
              refraction={4}
              shape="rounded"
              softness={1}
              speed={0.15}
            />
            <FilmGrain strength={0.05} />
          </Shader>
        </div>

        {/* NAVIGATION BAR - Z-20 / Z-60 */}
        <header
          className={`relative p-2 sm:p-3 max-w-[1440px] mx-auto w-full transition-all duration-300 ${mobileMenuOpen ? 'z-[60]' : 'z-20'}`}
        >
          <nav className="flex items-center justify-between px-[5px] py-[5px] bg-white rounded-full">
            <div className="flex items-center gap-8 pl-1">
              <a href="#" onClick={(e) => handleNavClick(e, '#')} className="flex items-center justify-center shrink-0">
                <svg 
                  className="h-7 sm:h-8 w-auto block" 
                  viewBox="0 0 420 120" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* 1. Lettre A (remplace le M) */}
                  <rect x="40" y="60" width="40" height="20" fill="#000000" />
                  <polygon points="50,20 70,20 40,100 20,100" fill="#000000" />
                  <polygon points="50,20 70,20 100,100 80,100" fill="#000000" />

                  {/* 2. Forme géométrique (style D inversé) */}
                  <path 
                    d="M 200,20 L 160,20 A 40 40 0 0 0 160,100 L 200,100 Z M 180,40 L 180,80 L 160,80 A 20 20 0 0 1 160,40 Z" 
                    fill="#000000" 
                    fillRule="evenodd"
                  />

                  {/* 3. Lettre X */}
                  <polygon points="220,20 248,20 300,100 272,100" fill="#000000" />
                  <polygon points="272,20 300,20 248,100 220,100" fill="#000000" />

                  {/* 4. La barre horizontale à la fin */}
                  <rect x="320" y="50" width="80" height="20" fill="#000000" />
                </svg>
              </a>
              <div className="hidden md:flex items-center gap-6">
                {[{label: 'À propos', href: '#a-propos'}, {label: 'Services', href: '#services'}, {label: 'Pourquoi ADX®', href: '#pourquoi-adx'}, {label: 'Nos formules', href: '#nos-formules'}, {label: 'Témoignages', href: '#temoignages'}].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-[14px] text-gray-900 hover:text-gray-500 transition-colors duration-300 font-medium"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 pr-1">
              <button className="group flex items-center bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-medium pl-5 pr-2 py-2 rounded-full gap-4 transition-colors duration-300">
                <span className="overflow-hidden h-[20px]">
                  <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                    <span className="h-[20px] flex items-center">Collaborer</span>
                    <span className="h-[20px] flex items-center">Collaborer</span>
                  </span>
                </span>
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
                  <ArrowRight size={12} strokeWidth={2.5} />
                </div>
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center gap-2 bg-gray-900 text-white text-[13px] font-medium pl-4 pr-3 py-2 sm:py-2.5 rounded-full z-50"
            >
              <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
              {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </nav>
        </header>

        {/* HERO CONTENT - Z-20 */}
        <main className="relative z-20 px-5 sm:px-8 lg:px-12 flex flex-col flex-1 pb-14 sm:pb-16 lg:pb-20 max-w-[1440px] mx-auto w-full pointer-events-none">
          <div className="absolute left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-[-80px] top-[15%] lg:top-[10%] w-[130%] sm:w-[80%] lg:w-[50%] h-[65%] lg:h-[90%] z-0 pointer-events-auto overflow-hidden flex items-center justify-center">
            
            <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none select-none">
  <span className="font-ttnorms font-bold text-[25vw] sm:text-[17.5vw] lg:text-[12.5vw] leading-none tracking-tighter text-black">
    X
  </span>
</div>

            {/* Inner wrapper using clip-path cheat code to push logo out of bounds and mask it completely */}
            <div className="absolute w-[calc(100%+200px)] h-[calc(100%+150px)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <iframe 
                src="https://my.spline.design/diamond3dcopycopy-dR24hXV7Ep1LReJe3S6Lb8Ki-13R/" 
                frameBorder="0" 
                width="100%" 
                height="100%"
                className="w-full h-full"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% calc(100% - 80px), calc(100% - 250px) calc(100% - 80px), calc(100% - 250px) 100%, 0% 100%)' }}
              ></iframe>
            </div>
          </div>

          <div className="flex-1" />
          <div className="pointer-events-auto relative z-10">
            <p className="text-[13px] sm:text-[14px] text-gray-900 mb-5 sm:mb-8 tracking-wide font-medium">
              ADX Studio
            </p>

            <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 w-full lg:w-3/4">
              We craft digital experiences
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              for brands ready to dominate
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              their category online.
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mt-8 sm:mt-12">
              <button className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium pl-5 sm:pl-6 pr-2 py-2 rounded-full gap-4 transition-colors duration-300">
                <span className="overflow-hidden h-[20px]">
                  <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                    <span className="h-[20px] flex items-center">Soumettre un projet</span>
                    <span className="h-[20px] flex items-center">Soumettre un projet</span>
                  </span>
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
                  <ArrowRight size={14} strokeWidth={2.5} />
                </div>
              </button>

              <div className="group flex items-center bg-white rounded-[4px] px-3 sm:px-4 py-2.5 sm:py-3 gap-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-500 cursor-pointer">
                <svg
                  viewBox="0 0 100 100"
                  className="fill-current text-[#E8704E] w-5 h-5 sm:w-6 sm:h-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M50 0C50 25.5 56.5 43.5 82 50C56.5 56.5 50 74.5 50 100C50 74.5 43.5 56.5 18 50C43.5 43.5 50 25.5 50 0ZM85.5 14.5C73.5 26.5 70 38 78.5 46.5C87 38 98.5 34.5 85.5 14.5ZM14.5 85.5C26.5 73.5 30 62 21.5 53.5C13 62 1.5 65.5 14.5 85.5ZM14.5 14.5C26.5 26.5 38 30 46.5 21.5C38 13 34.5 1.5 14.5 14.5ZM85.5 85.5C73.5 73.5 62 70 53.5 78.5C62 87 65.5 98.5 85.5 85.5Z" />
                </svg>
                <span className="text-[13px] sm:text-[14px] font-medium text-gray-900">
                  Certified Partner
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium bg-gray-900 text-white px-1.5 sm:px-2 py-0.5 rounded">
                  Featured
                </span>
              </div>
            </div>
          </div>
        </main>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY - Z-50 */}
      <div
        className={`fixed inset-0 z-50 flex flex-col justify-end transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`relative bg-white rounded-2xl mx-3 mb-3 px-6 pt-6 pb-8 flex flex-col gap-8 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
        >
          <div className="flex flex-col gap-4">
            {[{label: 'Accueil', href: '#accueil'}, {label: 'À propos', href: '#a-propos'}, {label: 'Services', href: '#services'}, {label: 'Pourquoi ADX®', href: '#pourquoi-adx'}, {label: 'Nos formules', href: '#nos-formules'}, {label: 'Témoignages', href: '#temoignages'}].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[28px] sm:text-[32px] font-medium text-gray-900"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button className="group flex items-center justify-between bg-gray-900 hover:bg-gray-800 text-white text-[15px] font-medium pl-6 pr-2 py-2 rounded-full w-full transition-colors duration-300 mt-4">
            <span className="overflow-hidden h-[24px]">
              <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                <span className="h-[24px] flex items-center">Soumettre un projet</span>
                <span className="h-[24px] flex items-center">Soumettre un projet</span>
              </span>
            </span>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
              <ArrowRight size={18} strokeWidth={2.5} />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
