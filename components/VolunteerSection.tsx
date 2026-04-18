import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VolunteerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title Entrance
      gsap.fromTo(titleRef.current,
        { y: 100, opacity: 0, skewY: 5 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Content Entrance
      gsap.fromTo(".volunteer-detail",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
          }
        }
       );

       // Simple parallax for decorative photos
       gsap.to(".floating-photo", {
         y: -100,
         scrollTrigger: {
           trigger: sectionRef.current,
           start: "top bottom",
           end: "bottom top",
           scrub: 1.5
         }
       });

      // EXIT ANIMATION: Fade and Lift
      gsap.to(contentRef.current, {
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

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center py-20 px-6 overflow-hidden bg-transparent"
      id="volunteer"
    >
      <div ref={contentRef} className="max-w-7xl w-full">
        {/* Header Section */}
        <div className="relative mb-12 px-4 md:px-0">
          <div className="mb-4 overflow-hidden relative z-10 text-left">
            <p className="font-sans text-sm font-black uppercase tracking-[0.5em] text-black/40 volunteer-detail">
              Experience 03
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-start gap-6 md:gap-12 mb-6 relative z-10 volunteer-detail">
            <div className="flex items-end gap-6 md:gap-8">
              <h2 
                ref={titleRef}
                className="font-sekuya text-5xl md:text-7xl lg:text-8xl font-black text-[#003876] uppercase tracking-tighter leading-[0.8]"
              >
                VOLUNTEER
              </h2>
              <img 
                src="https://severance.healthcare/_res/yuhs/severance/img/gate-logo.png" 
                alt="Severance Logo" 
                className="h-10 md:h-16 lg:h-20 w-auto object-contain mb-1"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="volunteer-detail relative z-10 text-left">
            <h3 className="font-noto text-xl md:text-3xl font-bold text-black/80 mb-2">
              세브란스 약무국 자원봉사
            </h3>
            <p className="text-base font-noto font-bold text-black/40">2025.09 ~ 2025.12</p>
          </div>
        </div>

        {/* Images in a single row with original ratios - Now Centered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 volunteer-detail items-start mt-12 mb-8 max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-sm floating-photo">
            <img 
              src="https://i.ibb.co/W49dDL1N/Caches778393205-392534.jpg" 
              alt="Severance Pharmaceutical Helper 1" 
              className="w-full h-auto block"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="overflow-hidden rounded-sm floating-photo">
            <img 
              src="https://i.ibb.co/83gLpBD/Caches780214560-041895.jpg" 
              alt="Severance Pharmaceutical Helper 2" 
              className="w-full h-auto block"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="overflow-hidden rounded-sm floating-photo">
            <img 
              src="https://i.ibb.co/kVNSn1fC/IMG-4161.jpg" 
              alt="Severance Pharmaceutical Helper 3" 
              className="w-full h-auto block"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Volunteer Core Content - Now below images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-0">
          <div className="lg:col-span-12 space-y-8 volunteer-detail">
            <div className="border-l-4 border-[#003876] pl-8 py-2">
              <p className="text-lg md:text-xl leading-relaxed text-black/80 font-noto font-medium italic">
                약품 분류 및 정리, 포장 및 라벨링 등 약무국 전반의 운영 보조 업무를 수행하였습니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
