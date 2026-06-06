import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import './gallery.css';

import proj1 from '../../assets/projet/imageprojet1.png';
import proj2 from '../../assets/projet/imageprojet2.png';
import proj3 from '../../assets/projet/imageprojet3.png';

// Exemple de données avec 5 projets, type 'image' ou 'video'.
const projectsData = [
    { id: 1, title: 'E-commerce Luxe', desc: 'Site 3D immersif pour une marque de luxe béninoise avec navigation en réalité augmentée.', link: '#', media: proj1, type: 'image' },
    { id: 2, title: 'Tourisme Bénin', desc: 'Visite virtuelle interactive des sites touristiques du Bénin en WebGL.', link: '#', media: proj2, type: 'image' },
    { id: 3, title: 'Dashboard Fintech', desc: 'Interface 3D innovante pour une plateforme de services financiers.', link: '#', media: proj3, type: 'image' },
    { id: 4, title: 'Portfolio Architecte', desc: 'Showcase immersif 360° pour un cabinet d\'architecture.', link: '#', media: proj1, type: 'image' },
    { id: 5, title: 'App Éducative', desc: 'Expérience d\'apprentissage gamifiée en 3D pour une école digitale.', link: '#', media: proj2, type: 'image' },
];

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
    const pageRef = useRef(null);
    const textContainerRef = useRef(null);
    const cardsContainerRef = useRef(null);
    const gridCanvasRef = useRef(null);
    const lettersCanvasRef = useRef(null);
    const showcaseRef = useRef(null);

    useEffect(() => {
        // --- UTILS ---
        const lerp = (start, end, t) => start + (end - start) * t;
        let localScrollProgress = 0; // Drives grid, text, and cards

        // --- GRID CANVAS INIT ---
        const gridCtx = gridCanvasRef.current.getContext('2d');
        const resizeGridCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const w = window.innerWidth;
            const h = window.innerHeight;
            gridCanvasRef.current.width = w * dpr;
            gridCanvasRef.current.height = h * dpr;
            gridCanvasRef.current.style.width = `${w}px`;
            gridCanvasRef.current.style.height = `${h}px`;
            gridCtx.scale(dpr, dpr);
        };
        resizeGridCanvas();

        const drawGrid = (scrollProgress = 0) => {
            const w = gridCanvasRef.current.width / (window.devicePixelRatio || 1);
            const h = gridCanvasRef.current.height / (window.devicePixelRatio || 1);
            gridCtx.fillStyle = '#000000'; 
            gridCtx.fillRect(0, 0, w, h);
            gridCtx.fillStyle = '#6D001A'; 
            const dotSize = 1, spacing = 30;
            const rows = Math.ceil(h / spacing);
            const cols = Math.ceil(w / spacing) + 15;
            const offset = (scrollProgress * spacing * 10) % spacing;
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    gridCtx.beginPath();
                    gridCtx.arc(x * spacing - offset, y * spacing, dotSize, 0, Math.PI * 2);
                    gridCtx.fill();
                }
            }
        };

        // --- THREE.JS INIT ---
        const lettersScene = new THREE.Scene();
        const lettersCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        lettersCamera.position.z = 20;

        const lettersRenderer = new THREE.WebGLRenderer({
            canvas: lettersCanvasRef.current,
            antialias: true,
            alpha: true,
        });
        lettersRenderer.setSize(window.innerWidth, window.innerHeight);
        lettersRenderer.setClearColor(0x000000, 0);
        lettersRenderer.setPixelRatio(window.devicePixelRatio);

        const createTextAnimationPath = (yPos, amplitude) => {
            const points = [];
            for (let i = 0; i <= 20; i++) {
                const t = i / 20;
                points.push(
                    new THREE.Vector3(
                        -25 + 50 * t,
                        yPos + Math.sin(t * Math.PI) * -amplitude,
                        (1 - Math.pow(Math.abs(t - 0.5) * 2, 2)) * -5
                    )
                );
            }
            const curve = new THREE.CatmullRomCurve3(points);
            const line = new THREE.Line(
                new THREE.BufferGeometry().setFromPoints(curve.getPoints(100)),
                new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1, transparent: true, opacity: 0 })
            );
            line.curve = curve;
            return line;
        };

        const path = [
            createTextAnimationPath(12, 2.5),
            createTextAnimationPath(8, 1.5),
            createTextAnimationPath(4, 0.5),
            createTextAnimationPath(0, -0.5),
            createTextAnimationPath(-4, -1.5),
            createTextAnimationPath(-8, -2.5),
            createTextAnimationPath(-12, -3.5),
        ];
        path.forEach(line => lettersScene.add(line));

        const letterPositions = new Map();
        const lettersString = ['P', 'R', 'O', 'J', 'E', 'T', 'S'];

        textContainerRef.current.innerHTML = ''; // Clean on HMR
        path.forEach((line, i) => {
            line.letterElements = Array.from({ length: 15 }, () => {
                const el = document.createElement('div');
                el.className = 'letter';
                el.textContent = lettersString[i];
                textContainerRef.current.appendChild(el);
                letterPositions.set(el, {
                    current: { x: 0, y: 0 },
                    target: { x: 0, y: 0 },
                });
                return el;
            });
        });

        const lineSpeedMultipliers = [0.8, 1, 0.7, 0.9, 1.1, 0.85, 0.95];

        const updateTargetPositions = (scrollProgress = 0) => {
            path.forEach((line, lineIndex) => {
                line.letterElements.forEach((element, i) => {
                    const point = line.curve.getPoint((i / 14 + scrollProgress * lineSpeedMultipliers[lineIndex]) % 1);
                    const vector = point.clone().project(lettersCamera);
                    const positions = letterPositions.get(element);
                    positions.target = {
                        x: (-vector.x * 0.5 + 0.5) * window.innerWidth,
                        y: (-vector.y * 0.5 + 0.5) * window.innerHeight,
                    };
                });
            });
        };

        const updateLetterPositions = () => {
            letterPositions.forEach((positions, element) => {
                const distX = positions.target.x - positions.current.x;
                if (Math.abs(distX) > window.innerWidth * 0.7) {
                    positions.current.x = positions.target.x;
                    positions.current.y = positions.target.y;
                } else {
                    positions.current.x = lerp(positions.current.x, positions.target.x, 0.07);
                    positions.current.y = lerp(positions.current.y, positions.target.y, 0.07);
                }
                element.style.transform = `translate(-50%, -50%) translate3d(${positions.current.x}px, ${positions.current.y}px, 0px)`;
            });
        };

        let currentXPosition = 0;
        const updateCardsPosition = () => {
            // Dynamic distance based on number of projects
            const moveDistance = window.innerWidth * (projectsData.length * 0.5); 
            const targetX = -moveDistance * localScrollProgress;
            currentXPosition = lerp(currentXPosition, targetX, 0.07);
            gsap.set(cardsContainerRef.current, { x: currentXPosition });
        };

        let animationFrameId;
        const animate = () => {
            updateLetterPositions();
            updateCardsPosition();
            lettersRenderer.render(lettersScene, lettersCamera);
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            resizeGridCanvas();
            drawGrid(localScrollProgress);
            lettersCamera.aspect = window.innerWidth / window.innerHeight;
            lettersCamera.updateProjectionMatrix();
            lettersRenderer.setSize(window.innerWidth, window.innerHeight);
            updateTargetPositions(localScrollProgress);
        };
        window.addEventListener('resize', handleResize);

        // Initialization
        drawGrid(0);
        updateTargetPositions(0);
        animate();

        // --- GSAP TIMELINE ---
        const tl4 = gsap.timeline({
            scrollTrigger: {
                trigger: ".gallery-page4",
                start: "center center",
                // Extra height allows a smooth long scroll
                end: () => `+=${window.innerHeight * (projectsData.length + 3)}`, 
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true,
            }
        });

        tl4.to(".gallery-page4", { backgroundColor: "#000000" }, 'start');

        // EXPANSION
        tl4.to(".gallery-box h3", { opacity: 0 }, 'expand')
        .to(".gallery-page4 .gallery-background", {
            width: "calc(100vw - 1rem)",
            height: "calc(100vh - 1rem)",
            borderRadius: "3.5rem",
            y: 0,
            x: 0,
        }, 'expand')
        .to(".gallery-projets-text", { opacity: 0 }, 'expand');

        // REVEAL SHOWCASE
        tl4.fromTo("#showcase-container", {
            opacity: 0,
            pointerEvents: "none"
        }, {
            opacity: 1,
            pointerEvents: "auto",
        }, 'reveal');

        // SCROLL SHOWCASE (Drives localScrollProgress 0 to 1)
        const progressProxy = { val: 0 };
        tl4.to(progressProxy, {
            val: 1,
            ease: "none",
            duration: projectsData.length * 0.5, // More time mapping
            onUpdate: () => {
                localScrollProgress = progressProxy.val;
                updateTargetPositions(localScrollProgress);
                drawGrid(localScrollProgress);
            }
        }, 'scroll');

        // HIDE SHOWCASE
        tl4.to("#showcase-container", {
            opacity: 0,
            pointerEvents: "none",
        }, 'hide');

        // CONTRACTION
        tl4.to(".gallery-page4 .gallery-background", {
            width: "40rem",
            height: "18rem",
            borderRadius: "90px",
            y: 0,
            x: 0,
        }, 'contract')
        .to(".gallery-projets-text", { opacity: 1 }, 'contract')
        .to(".gallery-box h3", { opacity: 1 }, 'contract');

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            lettersRenderer.dispose();
            lettersScene.clear();
        };
    }, []);

    const generateADX = (quantity = 6) => {
        const ADX = [];
        for (let i = 1; i <= quantity; i++) {
            ADX.push(
                <h3 key={i} style={{ "--index": i }} className='tracking-tighter'>
                    ADX®
                </h3>
            );
        }
        return ADX;
    };

    return (
        <section className="gallery-page4" ref={pageRef}>
            <div className="gallery-slider">
                <div
                    className="gallery-box"
                    style={{ "--time": "40s", "--quantity": 6 }}
                >
                    {generateADX(6)}
                </div>
            </div>

            <div className="gallery-background flex items-center justify-center relative bg-[#555555]">
                
                {/* Texte Projets visible avant/après l'expansion */}
                <h2 className="gallery-projets-text relative z-10 text-6xl md:text-8xl font-bold text-[#FFFFFF] bg-[#555555]">
                    Projets
                </h2>

                {/* SHOWCASE 3D EFFECT */}
                <div id="showcase-container" ref={showcaseRef} className="absolute inset-0 w-full h-full opacity-0 pointer-events-none">
                    <div className="work">
                        <canvas id="grid-canvas" ref={gridCanvasRef}></canvas>
                        <canvas id="letters-canvas" ref={lettersCanvasRef}></canvas>
                        <div className="text-container" ref={textContainerRef}></div>
                        
                        <div className="cards" ref={cardsContainerRef} style={{ width: `calc(100vw + ${projectsData.length * 40}vw)` }}>
                            {projectsData.map((proj, index) => (
                                <div className="card" key={proj.id}>
                                    <div className="card-img relative">
                                        {proj.type === 'video' ? (
                                            <video 
                                                src={proj.media} 
                                                autoPlay 
                                                loop 
                                                muted 
                                                playsInline 
                                                className="w-full h-full object-cover" 
                                            />
                                        ) : (
                                            <img src={proj.media} alt={proj.title} className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                    <div className="card-copy flex flex-col gap-3">
                                        <div className="w-full flex justify-between items-start">
                                            <h4 className="text-xl font-bold tracking-wide text-white">{proj.title}</h4>
                                            <span className="text-xs font-semibold text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                        <p className="text-[0.75rem] text-gray-400 leading-relaxed font-sans max-w-[95%]">
                                            {proj.desc}
                                        </p>
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-1 text-xs font-semibold text-white group w-fit">
                                                <span className="border-b border-transparent group-hover:border-[#F26522] transition-colors duration-300">Explorer le projet</span>
                                                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F26522] group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                                </span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;