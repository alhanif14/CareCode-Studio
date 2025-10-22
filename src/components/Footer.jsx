import { useTranslation } from "react-i18next";
import logoFull from "../assets/logo-full.png";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-black text-white py-14 md:py-16 border-t border-white/10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] opacity-60 shimmer-line" />

      <div className="relative container mx-auto px-6 
        grid grid-cols-1 justify-items-center gap-8 
        md:grid-cols-3 md:justify-items-stretch md:gap-8 items-center">
        
        <p className="text-sm text-white/60 text-center md:text-left md:justify-self-start">
          © {new Date().getFullYear()} CareCode Studio. {t("footer.rights")}
        </p>

        <div className="relative flex flex-col items-center select-none md:justify-self-center">
          <div className="footer-glow" />
          <img
            src={logoFull}
            alt="CareCode Studio"
            className="h-10 opacity-90 hover:opacity-100 transition-opacity duration-300 relative z-10"
          />
        </div>

        <div className="flex gap-6 text-xl md:justify-self-end">
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