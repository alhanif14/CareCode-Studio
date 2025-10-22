import { useTranslation } from "react-i18next";
import logoFull from "../assets/logo-full.png";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-black text-white py-14 md:py-16 border-t border-white/10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] opacity-60 shimmer-line" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none select-none">
        <div className="footer-glow" />
        <img
          src={logoFull}
          alt="CareCode Studio"
          className="h-10 opacity-90 hover:opacity-100 transition-opacity duration-300 relative z-10"
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left - Copyright */}
        <p className="text-sm text-white/60 text-center md:text-left w-full md:w-auto">
          © {new Date().getFullYear()} CareCode Studio. {t("footer.rights")}
        </p>

        {/* Right - Social Links */}
        <div className="flex gap-6 text-xl justify-center md:justify-end w-full md:w-auto">
          <a
            href="https://www.instagram.com/carecode.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-highlight)] transition-colors duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="mailto:carecodestudio@gmail.com"
            className="hover:text-[var(--color-highlight)] transition-colors duration-300"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}
