import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EditorialNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'HOME' },
    { id: 'editions', label: 'DEGREES' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'identity', label: 'ABOUT' },
    { id: 'lab', label: 'SKILLS' },
    { id: 'newswire', label: 'NEWSWIRE' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ─── GTA VI TOP NAVIGATION BAR ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none"
        style={{
          background: scrolled
            ? 'rgba(11, 14, 20, 0.88)'
            : 'linear-gradient(180deg, rgba(8, 10, 15, 0.7) 0%, rgba(8, 10, 15, 0.3) 60%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        }}
      >
        <div
          className="max-w-[1520px] mx-auto flex items-center justify-between"
          style={{ height: '64px', padding: '0 clamp(1.25rem, 4vw, 3.5rem)' }}
        >
          {/* LEFT: TWK LOGO MARK (Faithful replica of GTA VI left mark) */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            aria-label="Home"
          >
            <img
              src="/twk_monogram_alpha.png"
              alt="TWK"
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              style={{
                filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.8))',
              }}
            />
          </button>

          {/* CENTER: MINIMAL DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.slice(1).map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-mono text-[11px] font-semibold tracking-[0.26em] text-white/55 hover:text-white transition-colors duration-200 uppercase cursor-pointer relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#F8B1C6] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* RIGHT: HIRE NOW PILL (EXACT GTA VI #F8B1C6) + 2-BAR HAMBURGER */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* HIRE NOW BUTTON — Exact replica of GTA VI 'Pre-Order Now' */}
            <a
              href="mailto:shritenzin@gmail.com"
              data-cursor="HIRE"
              data-cursor-tone="pink"
              className="inline-flex items-center justify-center font-bold text-xs sm:text-[13px] tracking-[0.06em] rounded-full transition-all duration-200 hover:brightness-105 hover:shadow-lg active:scale-95"
              style={{
                background: '#F8B1C6',
                color: '#111111',
                padding: '0.48rem 1.35rem',
                boxShadow: '0 2px 14px rgba(248, 177, 198, 0.3)',
              }}
            >
              HIRE NOW
            </a>

            {/* GTA VI 2-BAR HAMBURGER MENU BUTTON (EXACT MATCH TO REFERENCE) */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex flex-col justify-center items-center gap-[6px] p-2 text-white hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
              aria-label="Open menu"
            >
              <span className="block w-6 h-[2px] bg-white rounded-full" />
              <span className="block w-6 h-[2px] bg-white rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* ─── FULL-SCREEN GTA VI EXPANDED NAVIGATION DRAWER ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden"
            style={{
              background: 'radial-gradient(ellipse at 50% 20%, #151824 0%, #080A0F 100%)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Top Bar inside Overlay */}
            <div
              className="max-w-[1520px] w-full mx-auto flex items-center justify-between"
              style={{ height: '64px', padding: '0 clamp(1.25rem, 4vw, 3.5rem)' }}
            >
              <span
                className="font-black text-2xl tracking-[0.18em] text-white"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                TWK
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="font-mono text-xs tracking-[0.25em] text-white/60 hover:text-white uppercase cursor-pointer flex items-center gap-2 p-2"
                aria-label="Close menu"
              >
                <span>CLOSE</span>
                <span className="text-base leading-none">✕</span>
              </button>
            </div>

            {/* Background subtle palm silhouettes */}
            <img
              src="/gta/art-left.0vk970u0aa4z3.svg"
              alt=""
              className="absolute bottom-0 left-0 w-64 md:w-96 opacity-10 pointer-events-none select-none"
            />
            <img
              src="/gta/art-right.0829t2opnft4.svg"
              alt=""
              className="absolute top-10 right-0 w-64 md:w-96 opacity-10 pointer-events-none select-none"
            />

            {/* Giant Navigation Links in Center */}
            <div className="relative z-10 max-w-[1520px] w-full mx-auto px-6 sm:px-12 py-8 flex flex-col justify-center flex-1">
              <nav className="flex flex-col gap-2 sm:gap-4">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => scrollTo(link.id)}
                    className="text-left font-black tracking-tight text-white/80 hover:text-[#F8B1C6] hover:translate-x-3 transition-all duration-200 select-none cursor-pointer flex items-baseline gap-4"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                      lineHeight: 0.95,
                    }}
                  >
                    <span className="font-mono text-xs sm:text-sm font-normal text-white/30 tracking-[0.2em]">
                      0{i + 1}
                    </span>
                    <span>{link.label}</span>
                  </motion.button>
                ))}
              </nav>

              {/* Direct HIRE NOW CTA inside menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="mailto:shritenzin@gmail.com"
                  className="inline-flex items-center justify-center font-bold text-sm uppercase tracking-wider rounded-full"
                  style={{
                    background: '#F8B1C6',
                    color: '#0B0E14',
                    padding: '0.75rem 2rem',
                    boxShadow: '0 4px 20px rgba(248, 177, 198, 0.3)',
                  }}
                >
                  HIRE NOW →
                </a>
                <a
                  href="https://github.com/TenzinWangchuKhongsai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs tracking-[0.2em] text-white/60 hover:text-white uppercase px-4 py-2"
                >
                  GITHUB ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/tenzin-wangchu-khongsai-b31546399"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs tracking-[0.2em] text-white/60 hover:text-white uppercase px-4 py-2"
                >
                  LINKEDIN ↗
                </a>
              </motion.div>
            </div>

            {/* Bottom Info Strip inside Drawer */}
            <div
              className="relative z-10 max-w-[1520px] w-full mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-white/10"
              style={{ padding: '1rem clamp(1.25rem, 4vw, 3.5rem)' }}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
                TENZIN WANGCHU KHONGSAI · CHENNAI, INDIA
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#FBC086] uppercase">
                AVAILABLE FOR RELOCATION &amp; ROLES
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
