import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
  opacity: 1,
  y: 0,
  transition: {
  duration: 0.6,
  ease: "easeOut",
    },
  },
};

export default function Pricing() {
  const { t } = useTranslation();

  const FEATURES = [
    "pricing.card.f1",
    "pricing.card.f2",
    "pricing.card.f3",
  ];

  return (
    <section
      id="pricing"
      className="relative pb-28 px-6 sm:px-8 overflow-hidden z-10"
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
    {t("pricing.title")}
      </h2>
      <p className="text-white/70 max-w-xl mx-auto">
    {t("pricing.subtitle")}
      </p>
    </motion.div>

    {/* Pricing Card */}
    <motion.div
      className="relative max-w-5xl mx-auto rounded-3xl"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
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

    <div className="relative z-10 p-8 md:p-12">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
    <div className="flex-1 text-center md:text-left">
      <h3 className="text-2xl font-semibold text-white mb-4">
    {t("pricing.card.title")}
      </h3>
      <p className="text-white/70 mb-6">
    {t("pricing.card.desc")}
      </p>
      <ul className="space-y-3 mb-8">
    {FEATURES.map((featureKey) => (
      <li
        key={featureKey}
        className="flex items-center justify-start gap-3 text-white/80 text-left"
      >
    <FaCheckCircle className="text-[var(--color-highlight)]" />
    <span>{t(featureKey)}</span>
      </li>
    ))}
      </ul>
      <button
    className="px-6 py-3 rounded-full font-semibold text-white 
       bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] 
       shadow-lg hover:opacity-90 active:scale-95 transition cursor-pointer"
    onClick={() => {
      const el = document.querySelector("#collaborate");
      el?.scrollIntoView({ behavior: "smooth" });
    }}
      >
    {t("pricing.card.cta")}
      </button>
    </div>

    <div
      className="flex-shrink-0 text-center md:text-right p-8 rounded-2xl 
     border border-white/10 bg-black/20 w-full md:w-auto"
    >
      <span className="text-sm uppercase tracking-widest text-white/70">
    {t("pricing.card.start")}
      </span>
      <h2 className="text-5xl sm:text-6xl font-bold my-2 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-highlight)] to-[var(--color-accent)]">
    {t("pricing.card.price")}
      </h2>
      <p className="text-white/70">{t("pricing.card.unit")}</p>
    </div>
      </div>
    </div>
      </div>
    </motion.div>
      </div>
    </section>
  );
}