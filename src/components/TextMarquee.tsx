import { motion } from 'motion/react';

export default function TextMarquee() {
  const marqueeText = "JOOHYUN'S PORTFOLIO";
  const items = Array(10).fill(marqueeText);

  return (
    <div className="w-full bg-black py-16 overflow-hidden border-t border-white/10 relative z-20">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 24,
          ease: "linear",
        }}
      >
        {items.map((text, idx) => (
          <span 
            key={idx} 
            className={`font-sekuya text-6xl md:text-8xl lg:text-9xl uppercase px-10 tracking-widest inline-block ${
              idx % 2 === 0 ? 'text-white' : 'text-transparent border-t-0'
            }`}
            style={idx % 2 !== 0 ? { WebkitTextStroke: '1px rgba(255,255,255,0.3)' } : {}}
          >
            {text}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((text, idx) => (
          <span 
            key={`dup-${idx}`} 
            className={`font-sekuya text-6xl md:text-8xl lg:text-9xl uppercase px-10 tracking-widest inline-block ${
              idx % 2 === 0 ? 'text-white' : 'text-transparent'
            }`}
            style={idx % 2 !== 0 ? { WebkitTextStroke: '1px rgba(255,255,255,0.3)' } : {}}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
