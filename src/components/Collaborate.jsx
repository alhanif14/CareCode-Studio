import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaComments,
  FaHandshake,
  FaLaptopCode,
  FaSyncAlt,
  FaCheckDouble,
  FaTools,
  FaMapMarkedAlt,
  FaCreditCard,
  FaLongArrowAltRight,
  FaEnvelope,
} from "react-icons/fa";

const SOFTWARE_STEPS = [
  {
    key: "sw1",
    Icon: FaComments,
    titleKey: "collaborate.sw.1.title",
    descKey: "collaborate.sw.1.desc",
  },
  {
    key: "sw2",
    Icon: FaHandshake,
    titleKey: "collaborate.sw.2.title",
    descKey: "collaborate.sw.2.desc",
  },
  {
    key: "sw3",
    Icon: FaLaptopCode,
    titleKey: "collaborate.sw.3.title",
    descKey: "collaborate.sw.3.desc",
  },
  {
    key: "sw4",
    Icon: FaSyncAlt,
    titleKey: "collaborate.sw.4.title",
    descKey: "collaborate.sw.4.desc",
  },
  {
    key: "sw5",
    Icon: FaCheckDouble,
    titleKey: "collaborate.sw.5.title",
    descKey: "collaborate.sw.5.desc",
  },
];

const HARDWARE_STEPS = [
  {
    key: "hw1",
    Icon: FaComments,
    titleKey: "collaborate.hw.1.title",
    descKey: "collaborate.hw.1.desc",
  },
  {
    key: "hw2",
    Icon: FaHandshake,
    titleKey: "collaborate.hw.2.title",
    descKey: "collaborate.hw.2.desc",
  },
  {
    key: "hw3",
    Icon: FaMapMarkedAlt,
    titleKey: "collaborate.hw.3.title",
    descKey: "collaborate.hw.3.desc",
  },
  {
    key: "hw4",
    Icon: FaCreditCard,
    titleKey: "collaborate.hw.4.title",
    descKey: "collaborate.hw.4.desc",
  },
];

const gridVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function Collaborate() {
  const { t } = useTranslation();
  const [activeFlow, setActiveFlow] = useState("software");

  const currentSteps =
    activeFlow === "software" ? SOFTWARE_STEPS : HARDWARE_STEPS;

  const getColSpan = (index) => {
    if (activeFlow === "software") {
      switch (index) {
        case 0: return "md:col-span-2";
        case 1: return "md:col-span-1";
        case 2: return "md:col-span-1";
        case 3: return "md:col-span-2";
        case 4: return "md:col-span-3";
        default: return "md:col-span-1";
      }
    } else {
      switch (index) {
        case 0: return "md:col-span-1";
        case 1: return "md:col-span-2";
        case 2: return "md:col-span-2";
        case 3: return "md:col-span-1";
        default: return "md:col-span-1";
      }
    }
  };

  return (
    <section
      id="collaborate"
      className="relative py-28 px-6 sm:px-8 overflow-hidden z-10"
    >
      <div className="container mx-auto">
        {/* Title */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-highlight)]">
            {t("collaborate.title")}
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            {t("collaborate.subtitle")}
          </p>
        </motion.div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white/5 p-1.5 rounded-full backdrop-blur-sm">
            <ToggleButton
              label={t("collaborate.toggle.software")}
              isActive={activeFlow === "software"}
              onClick={() => setActiveFlow("software")}
            />
            <ToggleButton
              label={t("collaborate.toggle.hardware")}
              isActive={activeFlow === "hardware"}
              onClick={() => setActiveFlow("hardware")}
            />
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFlow}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {currentSteps.map((step, index) => {
                return (
                  <motion.div
                    key={step.key}
                    className={`relative rounded-3xl ${getColSpan(index)}`}
                    variants={cardVariants}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div
                      className="relative w-full h-full rounded-3xl overflow-hidden
                                 border border-white/8 bg-gradient-to-b from-white/3 via-white/2 to-transparent
                                 backdrop-blur-md"
                    >
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-3xl pointer-events-none opacity-80"
                      >
                        <div
                          className="absolute -inset-1 rounded-3xl"
                          style={{
                            background:
                              "linear-gradient(120deg, rgba(0,198,255,0.10), rgba(91,166,123,0.10))",
                            filter: "blur(20px)",
                          }}
                        />
                        <div
                          className="absolute inset-0 rounded-3xl"
                          style={{
                            border: "1.5px solid transparent",
                            background:
                              "linear-gradient(135deg, var(--color-primary), var(--color-secondary)) border-box",
                            WebkitMask:
                              "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                          }}
                        />
                      </div>

                      <div className="relative z-10 p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
                                     bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-black shadow-lg"
                          >
                            <step.Icon className="text-2xl" />
                          </div>
                          <h3 className="text-xl font-semibold text-white">
                            {t(step.titleKey)}
                          </h3>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {t(step.descKey)}
                        </p>

                        {index === 0 && (
                          <a
                            href="mailto:carecodestudio@gmail.com"
                            className="inline-flex items-center gap-2 px-3.5 py-2 mt-4 text-xs font-semibold
                                       rounded-full bg-[var(--color-highlight)]/10 text-[var(--color-highlight)]
                                       hover:bg-[var(--color-highlight)]/20 transition-colors"
                          >
                            <FaEnvelope />
                            {t("collaborate.contact_us", "Hubungi Kami")}
                          </a>
                        )}

                        {/* Ikon Panah */}
                        {index < currentSteps.length - 1 && (
                          <FaLongArrowAltRight className="absolute bottom-6 right-7 text-2xl text-white/30" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ToggleButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition-colors
                  ${
                    isActive
                      ? "text-black"
                      : "text-white/60 hover:text-white"
                  }`}
    >
      {isActive && (
        <motion.div
          layoutId="toggle-highlight"
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-highlight)] to-[var(--color-accent)] rounded-full"
          style={{ zIndex: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}