import { useState } from "react";
import { useTranslation } from "react-i18next";
import logoFull from "../assets/logo-full.png";

import flagEN from "../assets/flag-en.png";
import flagID from "../assets/flag-id.png";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = [
    { code: "en", name: "English", short: "EN", flag: flagEN },
    { code: "id", name: "Bahasa Indonesia", short: "ID", flag: flagID },
  ];

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguageDesktop = (lang) => {
    i18n.changeLanguage(lang);
    setIsLangOpen(false);
  };

  const changeLanguageMobile = (lang) => {
    i18n.changeLanguage(lang);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="navbar flex justify-between items-center px-8 py-4 fixed w-full top-0 backdrop-blur-md bg-black/50 border-b border-white/10 z-50">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logoFull} alt="Carecode Studio" className="h-10 w-auto" />
        </div>

        {/* Menu (Desktop) */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ul className="flex gap-6 text-white font-medium">
            <li><a href="#services">{t("navbar.services")}</a></li>
            <li><a href="#why">{t("navbar.why")}</a></li>
            <li><a href="#collaborate">{t("navbar.collaborate")}</a></li>
            <li><a href="#faq">{t("navbar.faq")}</a></li>
            <li><a href="#pricing">{t("navbar.pricing")}</a></li>
          </ul>
        </nav>

        {/* Right Side */}
        <div className="flex items-center">
          {/* Language Dropdown (Desktop) */}
          <div className="hidden md:flex relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-white border border-white/20 px-3 py-2 rounded-md hover:bg-white/10 transition"
            >
              <img
                src={currentLang.flag}
                alt={currentLang.short}
                className="w-5 h-5 rounded-sm"
              />
              <span className="font-medium">{currentLang.short}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4 h-4 transition-transform ${
                  isLangOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-neutral-900 border border-white/10 rounded-md shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguageDesktop(lang.code)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 ${
                      i18n.language === lang.code ? "bg-white/10" : ""
                    }`}
                  >
                    <img
                      src={lang.flag}
                      alt={lang.short}
                      className="w-5 h-5 rounded-sm"
                    />
                    <span className="flex-1">{lang.name}</span>
                    <span className="text-white/70 text-xs">
                      ({lang.short})
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="relative w-8 h-8 flex flex-col justify-between items-center p-2 focus:outline-none group"
            >
              <span
                className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-[7px]"
                    : "rotate-0 translate-y-0"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen
                    ? "-rotate-45 -translate-y-[7px]"
                    : "rotate-0 translate-y-0"
                }`}
              ></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed top-[72px] left-0 right-0 md:hidden z-40 backdrop-blur-md bg-[var(--glass-bg)] border-b border-[var(--glass-border)] shadow-lg transform transition-all duration-300 ease-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-8 p-8">
          <nav>
            <ul className="flex flex-col gap-6 text-2xl font-medium">
              <li>
                <a href="#services" onClick={handleMobileLinkClick}>
                  {t("navbar.services")}
                </a>
              </li>
              <li>
                <a href="#why" onClick={handleMobileLinkClick}>
                  {t("navbar.why")}
                </a>
              </li>
              <li>
                <a href="#collaborate" onClick={handleMobileLinkClick}>
                  {t("navbar.collaborate")}
                </a>
              </li>
              <li>
                <a href="#faq" onClick={handleMobileLinkClick}>
                  {t("navbar.faq")}
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={handleMobileLinkClick}>
                  {t("navbar.pricing")}
                </a>
              </li>
            </ul>
          </nav>

          {/* Language Selector (Mobile) */}
          <div>
            <h3 className="text-white/50 text-sm font-medium mb-4">
              {t("navbar.language", "Choose Language")}
            </h3>
            <div className="flex flex-col gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguageMobile(lang.code)}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 text-lg text-white rounded-lg hover:bg-white/10 ${
                    i18n.language === lang.code ? "bg-white/10" : ""
                  }`}
                >
                  <img
                    src={lang.flag}
                    alt={lang.short}
                    className="w-6 h-6 rounded-sm"
                  />
                  <span className="flex-1">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
