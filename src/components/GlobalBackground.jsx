import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function GlobalBackground() {
  const [fade, setFade] = useState(true);
  const dotPatternRef = useRef(null);
  const targetMousePos = useRef({ x: -999, y: -999 });
  const currentSpotlightPos = useRef({ x: -999, y: -999 });
  const animationFrameId = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setFade((f) => !f), 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const easeFactor = 0.08;

    const animateSpotlight = () => {
      const { x: targetX, y: targetY } = targetMousePos.current;
      const { x: currentX, y: currentY } = currentSpotlightPos.current;

      const newX = currentX + (targetX - currentX) * easeFactor;
      const newY = currentY + (targetY - currentY) * easeFactor;
      currentSpotlightPos.current = { x: newX, y: newY };

      if (dotPatternRef.current) {
        dotPatternRef.current.style.setProperty("--mouse-x", `${newX}px`);
        dotPatternRef.current.style.setProperty("--mouse-y", `${newY}px`);
      }

      animationFrameId.current = requestAnimationFrame(animateSpotlight);
    };

    animationFrameId.current = requestAnimationFrame(animateSpotlight);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMousePos.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      ref={dotPatternRef}
      className="fixed inset-0 z-0 pointer-events-none"
      animate={{ opacity: fade ? 0.7 : 0.3 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, var(--color-highlight) 1px, transparent 0)",
        backgroundSize: "30px 30px",
        
        maskImage: `
          radial-gradient(circle at 15% 15%, black 0%, transparent 30%),
          radial-gradient(circle at 80% 20%, black 0%, transparent 35%),
          radial-gradient(circle at 50% 50%, black 0%, transparent 25%),
          radial-gradient(circle at 20% 85%, black 0%, transparent 35%),
          radial-gradient(circle at 75% 90%, black 0%, transparent 30%),
          
          /* Ganti 'black 100%, transparent 0%' 
            menjadi 'black 0%, transparent 100%' 
            Ini membuat gradien yang halus dari tengah ke luar
          */
          radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, transparent 100%)
        `,
        WebkitMaskImage: `
          radial-gradient(circle at 15% 15%, black 0%, transparent 30%),
          radial-gradient(circle at 80% 20%, black 0%, transparent 35%),
          radial-gradient(circle at 50% 50%, black 0%, transparent 25%),
          radial-gradient(circle at 20% 85%, black 0%, transparent 35%),
          radial-gradient(circle at 75% 90%, black 0%, transparent 30%),
          
          /* Perubahan yang sama di sini */
          radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, transparent 100%)
        `,
      }}
    >
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[var(--color-secondary)] opacity-25 blur-[180px] rounded-full" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-[var(--color-primary)] opacity-20 blur-[200px] rounded-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30 pointer-events-none" />
    </motion.div>
  );
}