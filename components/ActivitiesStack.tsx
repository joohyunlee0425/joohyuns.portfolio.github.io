import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACTIVITIES = [
  {
    name: "미디어유스 기자단",
    period: "2023.03-2023.09",
    color: "var(--primary-lime)",
    textColor: "#000",
    popupImage: "https://i.ibb.co/N2rmwHQY/2026-04-18-23-20-00.png"
  },
  {
    name: "식품의약품안전처 모니터링단",
    period: "2025.03-2025.12",
    color: "var(--bright-yellow)",
    textColor: "#000",
    popupImage: "https://i.ibb.co/p61s04Dt/IMG-1241.jpg"
  },
  {
    name: "서울시 식품정책과 덜 달달 9988 대학생 서포터즈",
    period: "2025.04-2025.12",
    color: "var(--olive-green)",
    textColor: "#fff",
    popupImage: "https://i.ibb.co/Fbn0kxKy/IMG-5952.jpg"
  },
  {
    name: "BCSC 대학생 연합 뇌인지과학학회",
    period: "2025.02-2025.09",
    color: "var(--muted-gold)",
    textColor: "#fff",
    popupImage: "https://i.ibb.co/tTdHRfKS/Caches779418475-948869.jpg"
  },
  {
    name: "여성과총 청년기자단 6기-최우수기자",
    period: "2025.05-2025.12",
    color: "#BFB48F",
    textColor: "#000",
    popupImage: "https://i.ibb.co/BHDbNkTR/IMG-5706.jpg"
  },
  {
    name: "오송첨단의료산업진흥재단 한국청년바이오홍보단 1기",
    period: "2025.04-2025.11",
    color: "#8C7A41",
    textColor: "#fff",
    popupImage: "https://i.ibb.co/spNFsQbM/IMG-3301.jpg"
  }
];

export default function ActivitiesStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !stackRef.current) return;

    const ctx = gsap.context(() => {
      // Intro Animation: Horizontal Row with 45-degree rotation
      gsap.fromTo(cardsRef.current, 
        {
          x: (i) => (i - (ACTIVITIES.length - 1) / 2) * 60 - 80,
          rotateY: 45,
          opacity: 0,
          scale: 0.8,
          filter: "blur(10px)"
        },
        {
          x: (i) => (i - (ACTIVITIES.length - 1) / 2) * 150 - 80, 
          y: 0,
          rotateY: 45,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stack Hover Animation: Maintain uniform spacing
      const handleStackEnter = () => {};

      const handleStackLeave = () => {
        cardsRef.current.forEach((card, i) => {
          gsap.to(card, {
            x: (i - (ACTIVITIES.length - 1) / 2) * 150 - 80,
            duration: 0.7,
            ease: "power2.out"
          });
        });
      };

      stackRef.current?.addEventListener('mouseenter', handleStackEnter);
      stackRef.current?.addEventListener('mouseleave', handleStackLeave);

      // Individual Card Hover: Simple rise
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const onCardEnter = () => {
          gsap.to(card, {
            y: -60,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out"
          });

          const popup = card.querySelector('.card-popup-image');
          if (popup) {
            gsap.set(popup, { display: 'block' });
            gsap.to(popup, {
              y: -20,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(1.7)"
            });
          }
        };

        const onCardLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });

          const popup = card.querySelector('.card-popup-image');
          if (popup) {
            gsap.to(popup, {
              y: 0,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
              onComplete: () => {
                gsap.set(popup, { display: 'none' });
              }
            });
          }
        };

        card.addEventListener('mouseenter', onCardEnter);
        card.addEventListener('mouseleave', onCardLeave);
      });

      // Fade out content on scroll - Slowed down
      gsap.to([".activities-title", stackRef.current], {
        opacity: 0,
        y: -150,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 90%",
          end: "bottom 10%",
          scrub: 2,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 overflow-hidden bg-white"
    >
      {/* Background Images Layer - Zero gaps, no rounded corners */}
      <div className="absolute inset-0 z-0 grid grid-cols-1 md:grid-cols-4 gap-0 opacity-30 pointer-events-none">
        <div className="w-full h-full">
          <img 
            src="https://i.ibb.co/nNjTpkyx/IMG-1224.jpg" 
            alt="BG 1" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="w-full h-full">
          <img 
            src="https://i.ibb.co/PsD6wp28/IMG-1367.jpg" 
            alt="BG 2" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="w-full h-full">
          <img 
            src="https://i.ibb.co/BVhDj79r/IMG-3438.jpg" 
            alt="BG 3" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="w-full h-full">
          <img 
            src="https://i.ibb.co/rGZTVPd7/IMG-5134.jpg" 
            alt="BG 4" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="activities-title mb-20 text-center z-10">
        <h2 className="font-sans text-5xl md:text-7xl font-black text-black uppercase tracking-tighter">
          Extracurricular <span className="italic text-[#576954]">Activities</span>
        </h2>
      </div>

      <div 
        ref={stackRef}
        className="relative w-full h-[300px] flex items-center justify-center perspective-2000 mb-20 z-20"
      >
        {ACTIVITIES.map((activity, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[160px] md:w-[300px] md:h-[180px] rounded-xl p-6 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.15)] border border-black/5 select-none"
            style={{
              backgroundColor: activity.color,
              color: activity.textColor,
              zIndex: i,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* MacBook Folder Tab Effect */}
            <div 
              className="absolute -top-3 left-0 w-1/4 h-4 rounded-t-lg"
              style={{ backgroundColor: activity.color }}
            />
            
            <div className="flex justify-between items-start relative z-10">
              <span className="text-sm font-black opacity-60 uppercase tracking-tighter">0{i + 1}</span>
              <div className="w-5 h-5 rounded-full border border-current opacity-10" />
            </div>

            <div className="flex-1 flex items-center justify-center text-center relative z-10 px-4">
              <h3 className="font-noto text-base md:text-lg font-bold leading-tight">
                {activity.name}
              </h3>
            </div>

            <div className="pt-3 border-t border-current/10 relative z-10 flex justify-between items-center">
              <p className="font-noto text-[10px] font-bold uppercase tracking-widest opacity-70">
                {activity.period}
              </p>
              <div className="w-2 h-2 rounded-full bg-current opacity-20" />
            </div>

            {/* Popup Image on Hover */}
            {activity.popupImage && (
              <div 
                className="absolute -top-32 left-1/2 -translate-x-1/2 w-[220px] pointer-events-none opacity-0 card-popup-image hidden"
                style={{ transform: 'translateY(20px)' }}
              >
                <img 
                  src={activity.popupImage} 
                  alt="Preview" 
                  className="w-full h-auto rounded-lg shadow-2xl border-2 border-white/20"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>
        ))}
      </div>

    </section>
  );
}
