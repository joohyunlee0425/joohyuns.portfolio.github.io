import { motion, useScroll, useTransform } from 'motion/react';
import LiquidBackground from './LiquidBackground';

// Image array for easy replacement
const IMAGES = [
  "https://picsum.photos/seed/portfolio1/1920/1080",
  "https://picsum.photos/seed/portfolio2/1920/1080",
  "https://picsum.photos/seed/portfolio3/1920/1080"
];

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <motion.section 
      style={{ opacity, scale, y }}
      className="relative h-screen w-full overflow-hidden bg-[#402D16] flex items-center justify-center"
    >
      {/* Top Meta Info */}
      <div className="absolute top-10 left-10 right-10 flex justify-between text-[11px] uppercase tracking-[0.2em] text-[#D2D904] opacity-80 z-20">
        <span>Digital Interaction Specialist</span>
        <span>SEOUL, KR // 2024</span>
      </div>

      {/* Liquid WebGL Background */}
      <div className="absolute inset-0 z-0">
        <LiquidBackground imageUrl={IMAGES[0]} />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#D2D904] text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85]"
        >
          <span className="text-outline-lime block">Joohyun's</span>
          <span className="block">Portfolio</span>
        </motion.h1>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[#D2D904]/70"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll Down</span>
        <div className="relative w-[1px] h-10 bg-gradient-to-b from-[#D2D904] to-transparent">
          <motion.div
            animate={{ y: [0, 35, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute -bottom-1 -left-[2px] w-[5px] h-[5px] border-r border-b border-[#D2D904] rotate-45"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
