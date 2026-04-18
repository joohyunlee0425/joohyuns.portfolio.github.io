import { motion } from 'motion/react';

export default function ArchiveSection() {
  return (
    <section className="w-full pt-10 pb-20 flex flex-col items-center justify-center bg-transparent relative z-20">
      <div className="max-w-xl w-full px-6 text-center space-y-8">
        <p className="font-noto text-lg md:text-xl text-black/60 leading-relaxed font-medium">
          활동 과정과 결과물을 지속적으로 기록한 개인 블로그
        </p>
        
        <motion.a
          href="https://blog.naver.com/joohyunbio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block group relative"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative px-12 py-5 bg-black text-white overflow-hidden rounded-full">
            <span className="relative z-10 font-sekuya text-xl tracking-widest uppercase">
              Additional Archive
            </span>
            <motion.div 
              className="absolute inset-0 bg-[#636B2F]"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ type: 'tween', ease: 'circOut', duration: 0.4 }}
            />
          </div>
          
          {/* Subtle glow effect */}
          <div className="absolute -inset-1 bg-black/5 blur-xl group-hover:bg-[#636B2F]/20 transition-colors rounded-full" />
        </motion.a>
      </div>
    </section>
  );
}
