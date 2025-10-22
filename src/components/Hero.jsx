import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const { t } = useTranslation();
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
      const targetX = targetMousePos.current.x;
      const targetY = targetMousePos.current.y;

      const currentX = currentSpotlightPos.current.x;
      const currentY = currentSpotlightPos.current.y;

      const newX = currentX + (targetX - currentX) * easeFactor;
      const newY = currentY + (targetY - currentY) * easeFactor;

      currentSpotlightPos.current = { x: newX, y: newY };

      if (dotPatternRef.current) {
        dotPatternRef.current.style.setProperty('--mouse-x', `${newX}px`);
        dotPatternRef.current.style.setProperty('--mouse-y', `${newY}px`);
      }

      animationFrameId.current = requestAnimationFrame(animateSpotlight);
    };

    animationFrameId.current = requestAnimationFrame(animateSpotlight);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    targetMousePos.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-6 md:px-16 pt-36 md:pt-20 text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          ref={dotPatternRef}
          animate={{ opacity: fade ? 0.7 : 0.3 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
          
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-highlight) 1px, transparent 0)',
            backgroundSize: '30px 30px',
            maskImage: `
              radial-gradient(circle at 15% 15%, black 0%, transparent 40%),
              radial-gradient(circle at 85% 85%, black 0%, transparent 40%),
              radial-gradient(circle at 60% 50%, black 0%, transparent 25%),
              radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 100%, transparent 0%)
            `,
            WebkitMaskImage: `
              radial-gradient(circle at 15% 15%, black 0%, transparent 40%),
              radial-gradient(circle at 85% 85%, black 0%, transparent 40%),
              radial-gradient(circle at 60% 50%, black 0%, transparent 25%),
              radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 100%, transparent 0%)
            `,
          }}
        />

        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[var(--color-secondary)] opacity-25 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-[var(--color-primary)] opacity-20 blur-[200px] rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-40 pointer-events-none" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
        <motion.span
          className="text-[var(--color-highlight)] font-medium tracking-wide uppercase text-sm md:text-base bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("hero.promo")}
        </motion.span>
        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t("hero.title")}
        </motion.h1>
        <motion.p
          className="text-white/70 max-w-xl text-base md:text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {t("hero.subtitle")}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="#contact"
            className="px-6 py-3 bg-[var(--color-secondary)] text-black font-semibold rounded-xl shadow-lg hover:bg-[var(--color-highlight)] transition-all"
          >
            {t("hero.start")}
          </a>
          <a
            href="#faq"
            className="px-6 py-3 border border-white/30 rounded-xl hover:bg-white/10 transition-all"
          >
            {t("hero.faq")}
          </a>
        </motion.div>
      </div>
      <motion.div
        className="relative z-10 flex-1 mb-10 md:mb-0 flex justify-center md:justify-end"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.img
          src="/assets/hero-illustration.png"
          alt="CareCode illustration"
          className="max-w-[380px] md:max-w-[520px] object-contain drop-shadow-2xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}