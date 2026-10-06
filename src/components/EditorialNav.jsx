import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EditorialNav() {
  const [istTime, setIstTime] = useState('');
  const [showNav, setShowNav] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [onLight, setOnLight] = useState(false);

  // IST clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setIstTime(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(now) + ' IST'
      );
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  // Show after hero scroll + detect light sections
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > window.innerHeight * 0.75);

      const lightSections = document.querySelectorAll('.section-light');
      let isOverLight = false;
      lightSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 56 && rect.bottom >= 0) {
          isOverLight = true;
        }
      });
      setOnLight(isOverLight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'projects', label: 'WORK' },
    { id: 'architecture', label: 'SYSTEMS' },
    { id: 'identity', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Adaptive high-contrast colors
  const textColor = onLight ? '#0B0D0F' : '#F4F4F0';
  const mutedColor = onLight ? '#2D333F' : '#9BA1A6';
  const hoverColor = '#D97736';
  const bgColor = onLight
    ? 'rgba(244, 244, 240, 0.96)'
    : 'rgba(11, 13, 15, 0.92)';
  const borderColor = onLight
    ? 'rgba(11, 13, 15, 0.12)'
    : 'rgba(244, 244, 240, 0.08)';

  return (
    <>
      {/* ─── Main Navigation ─── */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{
          opacity: showNav ? 1 : 0,
          y: showNav ? 0 : -16,
          pointerEvents: showNav ? 'auto' : 'none',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{
          background: bgColor,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <div className="scene-pad flex items-center justify-between h-14">
          {/* Left: Name */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-xs font-semibold tracking-[0.22em] transition-colors duration-300"
            style={{ color: textColor }}
            onMouseEnter={(e) => e.target.style.color = hoverColor}
            onMouseLeave={(e) => e.target.style.color = textColor}
            data-cursor="EXPLORE"
          >
            TENZIN
          </button>

          {/* Center: Links (desktop) */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-mono text-[0.68rem] font-medium tracking-[0.2em] transition-colors duration-300"
                style={{ color: mutedColor }}
                onMouseEnter={(e) => e.target.style.color = textColor}
                onMouseLeave={(e) => e.target.style.color = mutedColor}
                data-cursor="EXPLORE"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: Time + Mobile */}
          <div className="flex items-center gap-6">
            <span
              className="font-mono text-[0.65rem] font-medium tracking-[0.15em] hidden sm:block"
              style={{ color: mutedColor }}
            >
              {istTime}
            </span>

            {/* Mobile toggle — minimal */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
              aria-label="Open navigation"
              data-cursor="OPEN"
            >
              <span
                className="block w-5 h-[1.5px] transition-colors"
                style={{ background: textColor }}
              />
              <span
                className="block w-3.5 h-[1.5px] transition-colors"
                style={{ background: textColor }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ─── Mobile Overlay ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="nav-overlay"
          >
            {/* Close */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 font-mono text-[0.6rem] tracking-[0.25em] text-[var(--text-secondary)] hover:text-[var(--ivory)] transition-colors"
              aria-label="Close navigation"
            >
              CLOSE
            </button>

            {/* Links */}
            <nav className="space-y-3 mt-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.id);
                    }}
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Bottom metadata */}
            <div className="absolute bottom-8 left-0 scene-pad space-y-2">
              <div className="font-mono text-[0.55rem] tracking-[0.15em] text-[var(--text-tertiary)]">
                {istTime}
              </div>
              <div className="font-mono text-[0.55rem] tracking-[0.15em] text-[var(--text-tertiary)]">
                CHENNAI / INDIA
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
