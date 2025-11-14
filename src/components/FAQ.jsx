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
  const { t, i18n } = useTranslation();
  const [selectedKey, setSelectedKey] = useState(null);

  const bubbleVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  return (
    <section id="faq" className="relative py-24 px-6 text-white overflow-hidden z-10">
      <div className="container mx-auto">

        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-highlight)]
          drop-shadow-[0_0_18px_var(--color-primary)]">
            {t("faq.title")}
          </h2>
          <p className="mt-3 text-white/70">{t("faq.subtitle")}</p>
        </div>

        {/* Bubble List */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-14 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {FAQ_DATA.map((faq) => {
            const isActive = selectedKey === faq.key;

            return (
              <motion.button
                key={faq.key}
                variants={bubbleVariants}
                onClick={() => setSelectedKey(faq.key)}
                whileHover={{
                  scale: 1.08,
                  transition: { duration: 0.15, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.95 }}
                className={`
                  group relative px-5 py-3 rounded-full text-sm md:text-base font-semibold
                  transition-all duration-150 ease-out backdrop-blur-xl border shadow-lg
                  ${isActive
                    ? "text-white border-transparent bg-white/5"
                    : "text-white/80 bg-white/10 border-white/20"
                  }
                `}
              >

                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full opacity-30 blur-lg pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-primary), var(--color-highlight))",
                    }}
                  />
                )}

                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      border: "2px solid transparent",
                      background:
                        "linear-gradient(135deg, var(--color-primary), var(--color-highlight)) border-box",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                )}

                <span
                  className="
                    absolute inset-0 rounded-full opacity-0 
                    group-hover:opacity-100 transition-opacity duration-150 pointer-events-none
                  "
                  style={{
                    border: "2px solid transparent",
                    background:
                      "linear-gradient(135deg, var(--color-primary), var(--color-highlight)) border-box",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                <span className="relative z-10">
                  {t(`faq.${faq.key}.q`)}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Answer Card */}
        <div className="max-w-3xl mx-auto">
          <div
            className="relative p-6 md:p-8 rounded-3xl overflow-hidden backdrop-blur-2xl 
                       bg-white/5 border border-white/20 shadow-lg 
                       bg-gradient-to-b from-white/5 via-white/2 to-transparent"
            style={{ minHeight: "180px" }}
          >
            {/* Outer Glow */}
            <div aria-hidden className="absolute inset-0 rounded-3xl opacity-60 pointer-events-none">
              <div
                className="absolute -inset-1 rounded-3xl blur-2xl"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(0,198,255,0.15), rgba(91,166,123,0.15))",
                }}
              />
            </div>

            {/* Gradient Stroke */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                border: "1.5px solid transparent",
                background:
                  "linear-gradient(135deg, var(--color-primary), var(--color-highlight)) border-box",
                WebkitMask:
                  "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            <div className="relative z-10">
              {selectedKey ? (
                <TypeAnimation
                  key={`${selectedKey}-${i18n.language}`}
                  sequence={[t(`faq.${selectedKey}.a`), 700]}
                  wrapper="p"
                  speed={60}
                  cursor={true}
                  className="text-white/90 leading-relaxed text-[15px] md:text-base"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-white/50 italic">
                  <FaQuestion className="mb-2 text-2xl opacity-60" />
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
