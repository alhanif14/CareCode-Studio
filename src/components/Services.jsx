import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaMobileAlt,
  FaPenNib,
  FaMicrochip,
  FaTools,
  FaCogs,
  FaInfinity,
} from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SERVICES = [
  {
    key: "web",
    Icon: FaGlobe,
    features: ["services.web.f1", "services.web.f2", "services.web.f3"],
  },
  {
    key: "application",
    Icon: FaMobileAlt,
    features: ["services.app.f1", "services.app.f2", "services.app.f3"],
  },
  {
    key: "uiux",
    Icon: FaPenNib,
    features: ["services.uiux.f1", "services.uiux.f2", "services.uiux.f3"],
  },
  {
    key: "iot",
    Icon: FaMicrochip,
    features: ["services.iot.f1", "services.iot.f2", "services.iot.f3"],
  },
  {
    key: "hardware",
    Icon: FaTools,
    features: ["services.hw.f1", "services.hw.f2", "services.hw.f3"],
  },
  {
    key: "automation",
    Icon: FaCogs,
    features: ["services.auto.f1", "services.auto.f2", "services.auto.f3"],
  },
  {
    key: "more",
    Icon: FaInfinity,
    features: ["services.more.f1"],
    special: true,
  },
];

export default function Services() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section
      id="services"
      className="relative py-20 px-6 text-white overflow-hidden z-10"
    >
      <div className="container mx-auto">
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-highlight)]">
            {t("services.title")}
          </h2>
          {t("services.subtitle") && (
            <p className="mt-3 text-white/70">{t("services.subtitle")}</p>
          )}
        </div>

        {/* Swiper */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={28}
            centeredSlides
            slidesPerView={1.05}
            breakpoints={{
              640: { slidesPerView: 1.1 },
              768: { slidesPerView: 2.0 },
              1024: { slidesPerView: 2.4 },
              1280: { slidesPerView: 3.0 },
            }}
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet !bg-white/20 rounded-full transition-all duration-300",
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-gradient-to-r !from-[var(--color-primary)] !to-[var(--color-secondary)] !w-3 !h-3",
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {SERVICES.map((s, idx) => {
              const isActive = idx === activeIndex;
              return (
                <SwiperSlide key={s.key} className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0.9 }}
                    animate={{
                      scale: isActive ? 1.02 : 0.9,
                      filter: isActive ? "none" : "blur(2px) saturate(.7)",
                      opacity: isActive ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full max-w-[360px] md:max-w-[420px] lg:max-w-[440px]"
                    style={{
                      marginTop: isActive ? "10px" : "30px",
                      marginBottom: isActive ? "10px" : "30px",
                    }}
                  >
                    {/* Card */}
                    <div
                      className={`relative rounded-3xl overflow-hidden p-8 md:p-10
                        border border-white/8 bg-gradient-to-b from-white/3 via-white/2 to-transparent
                        backdrop-blur-md transition-all duration-500`}
                      style={{ minHeight: 520 }}
                    >
                      {/* Glow highlight */}
                      <div
                        aria-hidden
                        className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div
                          className="absolute -inset-1 rounded-3xl"
                          style={{
                            background:
                              "linear-gradient(120deg, rgba(0,198,255,0.14), rgba(91,166,123,0.12))",
                            filter: "blur(24px)",
                          }}
                        />
                        {/* Tambahkan stroke di atas glow */}
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

                      {/* Content */}
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center justify-center mb-6">
                          <div
                            className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl ${
                              s.special
                                ? "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-black shadow-2xl"
                                : "bg-white/6 text-[var(--color-highlight)]"
                            }`}
                          >
                            <s.Icon />
                          </div>
                        </div>

                        <h3 className="text-xl md:text-2xl font-semibold text-center mb-2">
                          {t(`services.${s.key}`)}
                        </h3>
                        <p className="text-sm text-white/70 text-center max-w-[36ch] mx-auto mb-6">
                          {t(`services.${s.key}.desc`)}
                        </p>

                        <ul className="mt-2 space-y-3 flex-1 px-2">
                          {(s.features || []).map((featureKey, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-white/70"
                            >
                              <span className="min-w-[18px] mt-1 text-[var(--color-highlight)]">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                              </span>
                              <span>{t(featureKey)}</span>
                            </li>
                          ))}
                        </ul>

                        {s.special && (
                          <div className="mt-6 flex justify-center relative z-20">
                            <button
                              className="px-6 py-3 rounded-full font-semibold text-black bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] shadow-lg hover:opacity-90 active:scale-95 transition cursor-pointer"
                              onClick={() => {
                                const el =
                                  document.querySelector("#collaborate");
                                el?.scrollIntoView({ behavior: "smooth" });
                              }}
                            >
                              {t("services.more.cta", "Let's talk")}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            ref={prevRef}
            className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-4 z-20 bg-white/10 hover:bg-white/20 active:bg-gradient-to-r active:from-[var(--color-primary)] active:to-[var(--color-secondary)] active:scale-90 text-white rounded-full p-3 backdrop-blur-md transition-all duration-300 cursor-pointer"
          >
            <IoChevronBack size={22} />
          </button>
          <button
            ref={nextRef}
            className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-4 z-20 bg-white/10 hover:bg-white/20 active:bg-gradient-to-r active:from-[var(--color-primary)] active:to-[var(--color-secondary)] active:scale-90 text-white rounded-full p-3 backdrop-blur-md transition-all duration-300 cursor-pointer"
          >
            <IoChevronForward size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
