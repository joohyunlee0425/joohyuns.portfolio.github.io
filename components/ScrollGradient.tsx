import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollGradient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Floating background animation
    gsap.to(blob1Ref.current, {
      x: '15vw',
      y: '20vh',
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(blob2Ref.current, {
      x: '-10vw',
      y: '-15vh',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    });

    gsap.to(blob3Ref.current, {
      x: '10vw',
      y: '-10vh',
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 3
    });

    // Scroll-based parallax and color shifts
    const ctx = gsap.context(() => {
      // General parallax
      gsap.to([blob1Ref.current, blob2Ref.current, blob3Ref.current], {
        y: (i) => -400 * (i + 1),
        rotation: (i) => (i + 1) * 45,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        }
      });

      // Hue rotation based on scroll
      gsap.to(containerRef.current, {
        filter: "hue-rotate(90deg)",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });

      // Intensity shift at transition
      gsap.fromTo(containerRef.current, 
        { opacity: 0.25 },
        {
          opacity: 0, // Fade out on white
          scale: 1.1,
          scrollTrigger: {
            trigger: "#activities-section",
            start: "top center",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 transition-opacity duration-1000">
      {/* Dynamic Atmospheric Blobs */}
      <div 
        ref={blob1Ref}
        className="absolute top-[10%] left-[5%] w-[80vw] h-[80vw] rounded-full blur-[140px] mix-blend-screen will-change-transform"
        style={{ 
          background: 'radial-gradient(circle, rgba(210, 217, 4, 0.12) 0%, transparent 65%)' 
        }}
      />
      <div 
        ref={blob2Ref}
        className="absolute bottom-[10%] right-[-15%] w-[70vw] h-[70vw] rounded-full blur-[120px] mix-blend-screen will-change-transform"
        style={{ 
          background: 'radial-gradient(circle, rgba(22, 101, 52, 0.08) 0%, transparent 65%)' 
        }}
      />
      <div 
        ref={blob3Ref}
        className="absolute top-[50%] left-[40%] w-[60vw] h-[60vw] rounded-full blur-[160px] mix-blend-screen will-change-transform"
        style={{ 
          background: 'radial-gradient(circle, rgba(19, 78, 74, 0.08) 0%, transparent 65%)' 
        }}
      />
    </div>
  );
}
