import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Direct positioning without spring for zero latency
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isInteractable = target.closest('a, button, .magnetic-target, .interactive');
      setIsHovering(!!isInteractable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <style>{`
        body { cursor: none !important; }
        a, button, .magnetic-target { cursor: none !important; }
      `}</style>
      
      {/* Single Unified Cursor - Zero Latency, Larger Size */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicking ? 0.8 : (isHovering ? 2.0 : 1),
        }}
        transition={{
          scale: { type: 'spring', damping: 20, stiffness: 400 }
        }}
      />
    </>
  );
}
