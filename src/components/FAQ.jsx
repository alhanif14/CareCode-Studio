// src/components/FAQ.jsx

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaQuestion } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const FAQ_DATA = [
  { key: "q1" },
  { key: "q2" },
  { key: "q3" },
  { key: "q4" },
  { key: "q5" },
];

export default function FAQ() {
  // 1. Dapatkan 'i18n' dari useTranslation
  const { t, i18n } = useTranslation();
  const [selectedKey, setSelectedKey] = useState(null);

  const activeFaq = FAQ_DATA.find((f) => f.key === selectedKey);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const bubbleVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <section
      id="faq"
      className="relative py-20 px-6 text-white overflow-hidden z-10"
    >
      <div className="container mx-auto">
        {/* Judul */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-highlight)]">
            {t("faq.title")}
          </h2>
          <p className="mt-3 text-white/70">{t("faq.subtitle")}</p>
        </div>

        {/* 1. Kontainer untuk Bola Pertanyaan */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-12 px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {FAQ_DATA.map((faq) => (
            <motion.button
              key={faq.key}
              className={`relative p-4 md:p-5 rounded-full backdrop-blur-md border
                          text-white text-xs md:text-sm font-medium transition-all duration-300
                          hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)] hover:scale-105
                          active:scale-95
                          ${
                            selectedKey === faq.key
                              ? "border-[var(--color-primary)] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
                              : "border-white/20 bg-white/10"
                          }`}
              onClick={() => setSelectedKey(faq.key)}
              variants={bubbleVariants}
            >
              {t(`faq.${faq.key}.q`)}
              {selectedKey === faq.key && (
                <span className="absolute -inset-1 rounded-full border border-[var(--color-highlight)] opacity-70 animate-pulse" />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* 2. Box Jawaban Futuristik */}
        <div className="max-w-3xl mx-auto">
          <div
            className="glass-card relative p-6 md:p-8 overflow-hidden"
            style={{ minHeight: "150px" }}
          >
            <div className="text-white/90 leading-relaxed">
              {activeFaq ? (
                <TypeAnimation
                  // 2. Ganti 'key' untuk menyertakan bahasa yang sedang aktif
                  key={`${selectedKey}-${i18n.language}`}
                  sequence={[
                    t(`faq.${activeFaq.key}.a`),
                    1000,
                  ]}
                  wrapper="p"
                  speed={70}
                  cursor={true}
                />
              ) : (
                // Tampilkan Placeholder
                <div className="flex flex-col items-center justify-center text-center text-white/50 italic">
                  <FaQuestion className="mb-2 text-2xl" />
                  <p>{t("faq.placeholder")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}