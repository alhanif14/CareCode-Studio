import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import HeroIllustration from "../assets/hero-illustration.png";

export default function Hero() {
  const { t } = useTranslation();
  const [fade, setFade] = useState(true);

  useEffect(() => {
const interval = setInterval(() => setFade((f) => !f), 4000);
return () => clearInterval(interval);
  }, []);

  return (
<section
      id="hero"
      className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-6 md:px-16 pt-36 md:pt-20 text-white overflow-hidden z-10"
>
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
          className="text-4xl md:text-6xl font-bold leading-tight text-white bg-clip-text"
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
        href="#collaborate"
        className="px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
          >
        {t("hero.start")}
          </a>
          <a
        href="#faq"
        className="relative px-6 py-3 rounded-xl border border-white/8 bg-gradient-to-b from-white/3 via-white/2 to-transparent backdrop-blur-md hover:border-white/20 transition-all"
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
          src={HeroIllustration}
          alt="CareCode illustration"
          className="max-w-[300px] md:max-w-[400px] object-contain drop-shadow-2xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
</section>
  );
}