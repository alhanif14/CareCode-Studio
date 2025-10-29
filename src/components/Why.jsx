import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function WhyChooseUs() {
  const { t } = useTranslation();
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) controls.start("visible");
          else controls.start("hidden");
        });
      },
      { threshold: 0.25 }
    );

    const section = document.getElementById("why");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, [controls]);

  const fadeVariant = {
    hidden: (i) => ({
      opacity: 0,
      y: 40,
      transition: { delay: (3 - i) * 0.1, duration: 0.4, ease: "easeOut" },
    }),
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  const highlightColorRGB = "194, 242, 121";

  return (
    <section id="why" className="relative py-28 px-6 sm:px-8 md:px-0 overflow-hidden">
      {/* Title */}
      <h2 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-highlight)] mb-4">
        {t("why.title")}
      </h2>
      <p className="text-center text-gray-400 mb-20 max-w-2xl mx-auto px-4">
        {t("why.subtitle")}
      </p>

      <div className="relative max-w-5xl mx-auto px-4 md:px-0">
        <motion.div
          className="hidden md:block absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[var(--color-highlight)]/50 to-transparent"
          style={{
            boxShadow: `0 0 10px rgba(${highlightColorRGB}, 0.3)`,
          }}
          animate={{
            boxShadow: [
              `0 0 10px rgba(${highlightColorRGB}, 0.3)`,
              `0 0 25px rgba(${highlightColorRGB}, 0.6)`,
              `0 0 10px rgba(${highlightColorRGB}, 0.3)`,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {[1, 2, 3, 4].map((num, i) => (
          <motion.div
            key={num}
            className={`relative mb-24 md:mb-32 flex flex-col md:flex-row items-center ${
              i % 2 === 0 ? "md:justify-end" : "md:justify-start"
            }`}
            variants={fadeVariant}
            initial="hidden"
            animate={controls}
            custom={i}
          >
            <span
              className={`absolute font-bold leading-none select-none -z-10 top-1/2 -translate-y-1/2 
              text-[6rem] sm:text-[8rem] md:text-[10rem] 
              text-[var(--color-highlight)]/20
              md:blur-none blur-[3px] sm:blur-[4px]
              ${
                i % 2 === 0
                  ? "md:right-1/2 md:pr-20 md:text-right"
                  : "md:left-1/2 md:pl-20 md:text-left"
              }`}
            >
              {String(num).padStart(2, "0")}
            </span>

            {/* Text content */}
            <div
              className={`max-w-[90%] md:max-w-[45%] ${
                i % 2 === 0
                  ? "md:pr-16 md:text-right md:translate-x-4"
                  : "md:pl-16 md:translate-x-[-4px]"
              } text-center md:text-left`}
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {t(`why.${num}.title`)}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {t(`why.${num}.desc`)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
