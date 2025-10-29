import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function GlobalBackground() {
  const [fade, setFade] = useState(true);
  const dotPatternRef = useRef(null);
  const targetMousePos = useRef({ x: -999, y: -999 });
  const currentSpotlightPos = useRef({ x: -999, y: -999 });
  const animationFrameId = useRef(null);

  // Scroll & wave states
  const scrollY = useRef(0);
  const smoothScrollY = useRef(0);
  const maskPos = useRef({ m1: 0, m2: 30, m3: 60, m4: 90 });
  const t = useRef(0);

  // Fade loop
  useEffect(() => {
    const interval = setInterval(() => setFade((f) => !f), 4000);
    return () => clearInterval(interval);
  }, []);

  // Smooth spotlight follow
  useEffect(() => {
    const ease = 0.15;
    const animateSpotlight = () => {
      const { x: tx, y: ty } = targetMousePos.current;
      const { x: cx, y: cy } = currentSpotlightPos.current;
      const newX = cx + (tx - cx) * ease;
      const newY = cy + (ty - cy) * ease;
      currentSpotlightPos.current = { x: newX, y: newY };
      if (dotPatternRef.current) {
        dotPatternRef.current.style.setProperty("--mouse-x", `${newX}px`);
        dotPatternRef.current.style.setProperty("--mouse-y", `${newY}px`);
      }
      animationFrameId.current = requestAnimationFrame(animateSpotlight);
    };
    animationFrameId.current = requestAnimationFrame(animateSpotlight);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  // Track mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll + wave motion
  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    const animate = () => {
      t.current += 0.01; // wave time
      smoothScrollY.current += (scrollY.current - smoothScrollY.current) * 0.1;
      const s = smoothScrollY.current;

      if (dotPatternRef.current) {
        // subtle parallax scroll
        dotPatternRef.current.style.backgroundPosition = `0px ${-s * 0.2}px`;

        // base target positions
        const target = {
          m1: (s * 0.05) % 100,
          m2: (s * 0.07 + 30) % 100,
          m3: (s * 0.04 + 60) % 100,
          m4: (s * 0.09 + 90) % 100,
        };

        // sinusoidal waves for natural drift
        const wave = {
          m1: Math.sin(t.current * 0.7) * 8,
          m2: Math.cos(t.current * 0.9) * 10,
          m3: Math.sin(t.current * 0.6 + 2) * 6,
          m4: Math.cos(t.current * 0.8 + 1) * 9,
        };

        // smooth ease
        const ease = 0.05;
        for (let key in maskPos.current) {
          maskPos.current[key] +=
            (target[key] + wave[key] - maskPos.current[key]) * ease;
        }

        // apply mask positions
        for (let i = 1; i <= 4; i++) {
          dotPatternRef.current.style.setProperty(
            `--mask${i}-x`,
            `${maskPos.current[`m${i}`]}%`
          );
        }
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll);
    requestAnimationFrame(animate);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      ref={dotPatternRef}
      className="fixed inset-0 z-0 pointer-events-none"
      animate={{ opacity: fade ? 0.7 : 0.3 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, var(--color-highlight) 1px, transparent 0)",
        backgroundSize: "30px 30px",
        backgroundRepeat: "repeat",
        maskImage: `
          radial-gradient(circle at var(--mask1-x, 15%) 15%, black 0%, transparent 35%),
          radial-gradient(circle at var(--mask2-x, 75%) 20%, black 0%, transparent 40%),
          radial-gradient(circle at var(--mask3-x, 50%) 60%, black 0%, transparent 30%),
          radial-gradient(circle at var(--mask4-x, 25%) 85%, black 0%, transparent 35%),
          radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, transparent 100%)
        `,
        WebkitMaskImage: `
          radial-gradient(circle at var(--mask1-x, 15%) 15%, black 0%, transparent 35%),
          radial-gradient(circle at var(--mask2-x, 75%) 20%, black 0%, transparent 40%),
          radial-gradient(circle at var(--mask3-x, 50%) 60%, black 0%, transparent 30%),
          radial-gradient(circle at var(--mask4-x, 25%) 85%, black 0%, transparent 35%),
          radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, transparent 100%)
        `,
      }}
    >
      {/* glowing blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[var(--color-secondary)] opacity-25 blur-[180px] rounded-full" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-[var(--color-primary)] opacity-20 blur-[200px] rounded-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30 pointer-events-none" />
    </motion.div>
  );
}
