import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import LiquidBackground from './LiquidBackground';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { id: 1, title: "대외활동", img: "https://i.ibb.co/XZX6KKDW/IMG-3460.jpg", rotation: -15, x: -250, z: 100 },
  { id: 2, title: "인턴", img: "https://i.ibb.co/G398RvLX/IMG-2178.jpg", rotation: 10, x: 300, z: 200 },
  { id: 3, title: "봉사", img: "https://i.ibb.co/83gLpBD/Caches780214560-041895.jpg", rotation: -5, x: -400, z: 300 },
  { id: 4, title: "사진 기록", img: "https://i.ibb.co/xSP2sDhj/IMG-5370.jpg", rotation: 15, x: 450, z: 400 },
];

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Initial animation for title only
      gsap.from(".main-title span", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out"
      });

      // Scroll Animation: Zoom-in effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // Increased scroll distance for multi-phase animation
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Cards animation sequence: Line up -> Hold -> Fade Out
      CARDS.forEach((_, i) => {
        // Phase 1: Line up in a row (0 to 0.4)
        tl.to(cardsRef.current[i], {
          x: (i - (CARDS.length - 1) / 2) * 260, // Reduced spacing from 320 to 260
          y: 0,
          z: 0,
          rotate: 0,
          duration: 0.4,
          ease: "power2.inOut"
        }, 0);

        // Show labels immediately when scroll starts
        tl.to(`.card-label-${i}`, {
          opacity: 1,
          duration: 0.1,
          ease: "power2.out"
        }, 0.05);

        // Phase 2: Fade Out (0.6 to 1.0)
        tl.to(cardsRef.current[i], {
          autoAlpha: 0, 
          duration: 0.4,
          ease: "power2.in",
          immediateRender: false
        }, 0.6);
      });

      // Ensure all cards are pointer-events-none at the end
      tl.to(".card-item", { pointerEvents: "none" }, 0.8);

      // Title zooms in
      tl.to(titleRef.current, {
        scale: 1.5,
        z: 500,
        opacity: 0,
        duration: 0.8
      }, 0.2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden perspective-1000 z-10">
      {/* Abstract Liquid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
        <LiquidBackground imageUrl="https://i.ibb.co/6c801fkH/IMG-0834.jpg" />
      </div>

      {/* Main Title Layer */}
      <div 
        ref={titleRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="main-title text-center">
          <h1 className="font-serif text-7xl md:text-9xl font-black text-white leading-[0.8] tracking-tighter uppercase">
            <span className="block">Joohyun's</span>
            <span className="block italic text-outline-lime">Portfolio</span>
          </h1>
        </div>
      </div>

      {/* Card Stack Layer */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="card-item absolute w-40 md:w-60 aspect-[3/4] bg-transparent rounded-lg overflow-hidden shadow-2xl select-none"
            style={{
              x: card.x,
              z: -card.z,
              rotate: card.rotation,
              transformStyle: 'preserve-3d'
            }}
          >
            <img 
              src={card.img} 
              alt={card.title} 
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
            />
            <div className={`card-label-${i} absolute bottom-4 left-4 right-4 opacity-0 transition-opacity duration-500`}>
              <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">0{i + 1}</span>
              <h3 className="text-white font-bold text-sm uppercase">{card.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[#D2D904]/50 z-30">
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#D2D904] to-transparent" />
      </div>
    </div>
  );
}
