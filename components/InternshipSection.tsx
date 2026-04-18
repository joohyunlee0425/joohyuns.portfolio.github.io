import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export default function InternshipSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title Entrance Animation
      gsap.fromTo(titleRef.current,
        { 
          y: 100, 
          opacity: 0,
          skewY: 5
        },
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

      // Simple parallax for decorative photos
      gsap.to(".floating-photo", {
        y: -80, // Increased parallax depth
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });

      // Content Entrance Animation
      gsap.fromTo(".intern-detail",
        { 
          y: 50, 
          opacity: 0 
        },
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

      // Scale in for experiment cards
      gsap.fromTo(".experiment-card", 
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".experiments-grid",
            start: "top 70%",
          }
        }
      );

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
      className="relative min-h-screen w-full flex flex-col items-center py-20 px-6 overflow-hidden bg-white"
      id="internship"
    >
      <div ref={contentRef} className="max-w-7xl w-full">
        {/* Header Section - Left Aligned */}
        <div className="relative mb-20 px-4 md:px-0">
          <div className="mb-4 overflow-hidden relative z-10 text-left">
            <p className="font-noto text-sm font-black uppercase tracking-[0.5em] text-black/40 intern-detail">
              Experience 02
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-start gap-6 md:gap-12 mb-6 relative z-10 intern-detail">
            {/* Title & Research Site Image - Left Aligned */}
            <div className="flex items-end gap-6 md:gap-8">
              <h2 
                ref={titleRef}
                className="font-sekuya text-6xl md:text-8xl lg:text-9xl font-black text-[#C25006] uppercase tracking-tighter leading-[0.8]"
              >
                INTERN
              </h2>
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa-Jlutr9QDy8TUpn6nDrbc9zyLWuD2P0rmQ&s" 
                alt="Research site" 
                className="h-16 md:h-24 lg:h-32 w-auto object-cover rounded-sm"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Role & Period - Vertical Stack to the right of title/image */}
            <div className="flex flex-col gap-4 pb-1">
              <div className="text-left border-l border-black/10 pl-6">
                <span className="block text-[8px] font-noto font-black uppercase tracking-widest text-black/40">Role</span>
                <p className="text-base font-noto font-bold text-black/70">Research Intern</p>
              </div>
              <div className="text-left border-l border-black/10 pl-6">
                <span className="block text-[8px] font-noto font-black uppercase tracking-widest text-black/40">Period</span>
                <p className="text-base font-noto font-bold text-black/70">2025.07 - 2025.08</p>
              </div>
            </div>
          </div>

          <div className="intern-detail relative z-10 text-left">
            <h3 className="font-noto text-xl md:text-3xl font-bold text-black/80 max-w-2xl">
              2025 UST 하계인턴- 한국식품연구원(KFRI)
            </h3>
          </div>
        </div>

        {/* Research Core Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-center">
          <div className="lg:col-span-6 space-y-8 intern-detail">
            <div>
              <h4 className="font-noto text-2xl md:text-3xl font-black text-[#C25006] mb-4">
                기능성 소재의 기억력 개선 연구
              </h4>
              <p className="text-lg leading-relaxed text-black/70 font-noto font-medium mb-8">
                치매 유병률 증가에 따른 사회·경제적 부담 완화를 목표로, 기능성 식품 소재의 인지기능 개선 효과를 탐색하였습니다. 특히 신경세포에서 유도되는 mitophagy 기전을 중심으로 기억력 개선 가능성을 검토하고, 관련 기능성 검증의 필요성을 도출하였습니다.
              </p>
              <div className="mt-8 overflow-hidden max-w-[85%]">
                <img 
                  src="https://i.ibb.co/xqvZMGB6/2026-04-18-21-54-31.png" 
                  alt="Research Illustration" 
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 intern-detail">
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden floating-photo">
                <img 
                  src="https://i.ibb.co/xq3HGvmv/Caches773541811-935662.jpg" 
                  alt="Research 1" 
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="overflow-hidden floating-photo">
                <img 
                  src="https://i.ibb.co/Q3TD1sYk/IMG-2338.jpg" 
                  alt="Research 2" 
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="overflow-hidden floating-photo">
                <img 
                  src="https://i.ibb.co/Lh6h0pnB/IMG-2785.jpg" 
                  alt="Research 3" 
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="overflow-hidden floating-photo">
                <img 
                  src="https://i.ibb.co/F1xqsZm/IMG-2305.jpg" 
                  alt="Research 4" 
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Experimental Content Section - New Listed Layout */}
        <div className="mb-24">
          <div className="text-left mb-16 border-b border-black/10 pb-4">
            <h4 className="font-sekuya text-4xl md:text-6xl text-[#273E20] mb-2 intern-detail italic leading-tight">
              Experiments
            </h4>
          </div>

          <div className="space-y-32 max-w-6xl mx-auto">
            {/* 1. MTT Assay */}
            <div className="intern-detail w-full">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
                <div className="flex items-center gap-6 shrink-0">
                  <span className="font-sekuya text-6xl text-[#C25006]">01.</span>
                  <h5 className="font-sekuya text-4xl font-black text-[#273E20] uppercase tracking-tighter">MTT Assay</h5>
                </div>
                <div className="flex-1 w-full max-w-4xl overflow-hidden rounded-sm">
                  <img 
                    src="https://i.ibb.co/cStGrrKC/2026-04-17-22-57-35.png" 
                    alt="MTT Assay" 
                    className="w-full h-auto block object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="border-b border-black/10 pb-8">
                <p className="text-base md:text-lg text-black/70 font-bold whitespace-nowrap tracking-tight">
                  세포 수준에서 소재의 안전성과 효능을 확인하였으며, 특정 소재가 독성을 나타내지 않는 적정 농도를 정밀하게 도출했습니다.
                </p>
              </div>
            </div>

            {/* 2. Western Blot */}
            <div className="intern-detail w-full">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
                <div className="flex items-center gap-6 shrink-0">
                  <span className="font-sekuya text-6xl text-[#C25006]">02.</span>
                  <h5 className="font-sekuya text-4xl font-black text-[#273E20] uppercase tracking-tighter">Western Blot</h5>
                </div>
                <div className="flex-1 w-full max-w-4xl overflow-hidden rounded-sm">
                  <img 
                    src="https://i.ibb.co/VYbrc58k/2026-04-17-22-58-15.png" 
                    alt="Western Blot" 
                    className="w-full h-auto block object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="border-b border-black/10 pb-8">
                <p className="text-base md:text-lg text-black/70 font-bold whitespace-nowrap tracking-tight">
                  단백질 발현 분석을 통해 인지 기능 개선 및 퇴행성 뇌 질환 관련 지표의 변화를 수치화하고 시각화하여 확인했습니다.
                </p>
              </div>
            </div>

            {/* 3. Mitophagy Detection */}
            <div className="intern-detail w-full">
              <div className="flex items-center gap-6 mb-10">
                <span className="font-sekuya text-6xl text-[#C25006]">03.</span>
                <h5 className="font-sekuya text-4xl font-black text-[#273E20] uppercase tracking-tighter">Mitophagy Detection</h5>
              </div>
              <div className="border-b border-black/10 pb-8">
                <p className="text-base md:text-lg text-black/70 font-bold whitespace-nowrap tracking-tight">
                  세포 내 손상된 미토콘드리아를 제거하는 '미토파지' 활성 여부를 관찰하여 세포 보호 기전을 심도 있게 연구했습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
