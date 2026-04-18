import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OthersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title & Subtitle Animation
      gsap.fromTo([titleRef.current, ".photographic-subtitle"],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Photo Grid Animation (Line by Line)
      gsap.fromTo(".photo-record-item", 
        { 
          y: 150,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          stagger: {
            amount: 1.5,
            grid: [4, 5],
            from: "start"
          },
          scrollTrigger: {
            trigger: ".photo-records-grid",
            start: "top 80%",
          }
        }
      );

      // EXIT ANIMATION: Fade and Lift
      gsap.to(".others-content-wrapper", {
        opacity: 0,
        y: -150,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 90%",
          end: "bottom 0%",
          scrub: 2,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const photoRecords = [
    "https://i.ibb.co/7xLQt09Z/IMG-5370.jpg",
    "https://i.ibb.co/GQQ8Jj87/7-FCD54-EB-16-CC-4003-BA06-19-B5790-E4978.jpg",
    "https://i.ibb.co/3mXXSYss/IMG-0570.jpg",
    "https://i.ibb.co/x8M0c5Jw/693065468-449273.jpg",
    "https://i.ibb.co/RTq2Cbzg/IMG-3897.jpg",
    "https://i.ibb.co/Wvj1Gytw/IMG-6288.jpg",
    "https://i.ibb.co/WvtF8bMJ/IMG-7400.jpg",
    "https://i.ibb.co/9khhZfbQ/C9359583-7230-42-EA-A93-E-AEE81-A83-BB92.jpg",
    "https://i.ibb.co/d07Z0J09/767245443-834856.jpg",
    "https://i.ibb.co/MDB8ZF0z/IMG-1251.jpg",
    "https://i.ibb.co/KcrprJck/773372026-538252.jpg",
    "https://i.ibb.co/pj6W8dSr/IMG-3038.jpg",
    "https://i.ibb.co/1YJDjFnD/IMG-4668.jpg",
    "https://i.ibb.co/nqpffzRp/IMG-4856.jpg",
    "https://i.ibb.co/NgHLHS8Y/IMG-5403.jpg",
    "https://i.ibb.co/84DwJQmR/IMG-6382.jpg",
    "https://i.ibb.co/kW09wnN/IMG-6427.jpg",
    "https://i.ibb.co/3mR5LzRt/IMG-6484.jpg",
    "https://i.ibb.co/hJ8ctHbb/792579835-307027.jpg",
    "https://i.ibb.co/21Kt2y3Q/IMG-7690.jpg"
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center pt-20 overflow-hidden bg-transparent"
      id="others"
    >
      <div className="others-content-wrapper w-full flex flex-col">
        {/* Header Section - Always Left Aligned */}
        <div className="w-full mb-32 px-6 md:px-20 text-left">
          <p className="font-noto text-sm font-black uppercase tracking-[0.5em] text-black/20 mb-4">
            Experience 04
          </p>
          <h2 
            ref={titleRef}
            className="font-sekuya text-5xl md:text-7xl lg:text-8xl font-black text-[#166534] uppercase tracking-tighter mb-4"
          >
            Photographic Records
          </h2>
          <p className="font-noto text-base md:text-xl text-black/40 font-bold photographic-subtitle">
            일상의 시선을 기록합니다
          </p>
        </div>

        {/* Full-width 5-column Photo Grid */}
        <div className="photo-records-grid grid grid-cols-2 md:grid-cols-5 gap-0 w-full mb-32">
          {photoRecords.map((src, idx) => (
            <div key={idx} className="photo-record-item relative overflow-hidden aspect-[3/4] bg-neutral-200">
              <img 
                src={src} 
                alt={`Photo Record ${idx + 1}`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 border-[0.5px] border-black/5 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
