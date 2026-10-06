import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Section3DModel from './Section3DModel';

export default function CinematicHero() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Portrait cinematic reveal: starts as a centered strip, expands to fill
  const portraitClip = useTransform(
    scrollYProgress,
    [0, 0.4],
    ['inset(8% 25% 8% 25%)', 'inset(0% 0% 0% 0%)']
  );
  const portraitScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);

  // Text choreography
  const nameY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);
  const nameOpacity = useTransform(scrollYProgress, [0.5, 0.85], [1, 0]);
  const taglineOpacity = useTransform(scrollYProgress, [0.45, 0.75], [1, 0]);

  // Bottom bar
  const footerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      setMousePos({ x, y });
    };
    if (typeof window !== 'undefined' && !('ontouchstart' in window)) {
      window.addEventListener('mousemove', handleMouse);
      return () => window.removeEventListener('mousemove', handleMouse);
    }
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="snap-section relative bg-[#050607] text-[var(--ivory)] overflow-hidden"
      style={{ height: '115vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ─── Full-Viewport Portrait Background (Cinematic Reveal) ─── */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            clipPath: portraitClip,
            scale: portraitScale,
          }}
        >
          <img
            src="/me/WhatsApp Image 2026-08-24 at 6.56.57 PM.jpeg"
            alt="Tenzin Wangchu Khongsai"
            className="w-full h-full object-cover object-[center_20%]"
            style={{
              transform: `translate(${mousePos.x * 0.08}px, ${mousePos.y * 0.08}px)`,
              transition: 'transform 0.5s ease-out',
              filter: `brightness(0.7) contrast(1.1)`,
            }}
          />
          {/* Dark gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-[#050607]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050607]/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050607]/50 via-transparent to-transparent" />
        </motion.div>

        {/* ─── 3D Metallic Architectural Tower Centerpiece (Reference Match) ─── */}
        <div className="absolute right-4 sm:right-16 top-1/2 -translate-y-1/2 z-10 w-[300px] sm:w-[450px] pointer-events-auto">
          <Section3DModel type="hero" />
        </div>

        {/* ─── Atmospheric Halo (reactive to mouse) ─── */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: `
              radial-gradient(circle 500px at ${55 + mousePos.x * 0.3}% ${40 + mousePos.y * 0.3}%, rgba(217, 119, 54, 0.12) 0%, transparent 60%),
              radial-gradient(circle 800px at 60% 70%, rgba(224, 106, 46, 0.05) 0%, transparent 65%)
            `,
          }}
        />

        {/* ─── Top Status Bar — Systems & Engineering Grade ─── */}
        <motion.div
          style={{ opacity: footerOpacity }}
          className="absolute top-0 left-0 right-0 z-30 px-6 sm:px-10 pt-5 pb-4 flex items-center justify-between font-mono text-[11px] text-white/50 tracking-wider uppercase border-b border-white/[0.06]"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D97736] animate-pulse" />
            <span className="text-white/90 font-semibold tracking-[0.15em]">TWK</span>
            <span className="hidden sm:inline text-white/25">|</span>
            <span className="hidden sm:inline text-[#E89052] font-semibold">SYSTEMS & INTELLIGENCE LAB</span>
          </div>
          <div className="flex items-center gap-5 text-[10px]">
            <span className="hidden md:inline text-white/30">CHENNAI, IN [13.08°N]</span>
            <span className="text-[#E89052] font-semibold">OPEN TO WORK</span>
          </div>
        </motion.div>

        {/* ─── Vertical Pagination Markers (reference video (4).mp4) ─── */}
        <div className="hidden lg:flex flex-col gap-4 absolute left-8 top-1/3 z-20 font-mono text-[9px] text-white/40 pointer-events-auto">
          {[
            { num: '01', label: 'MONOLITH' },
            { num: '02', label: 'PROJECTS' },
            { num: '03', label: 'ARCHITECTURE' },
            { num: '04', label: 'LAB' },
            { num: '05', label: 'CONTACT' },
          ].map((item, idx) => (
            <div key={item.num} className="flex items-center gap-2 group cursor-pointer">
              <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-[#E89052]' : 'bg-white/20'}`} />
              <span className="text-white/60 group-hover:text-[#E89052] transition-colors">{item.num} // {item.label}</span>
            </div>
          ))}
        </div>

        {/* ─── Central Name Typography (overlaid on portrait with 3D tilt) ─── */}
        <motion.div
          style={{
            y: nameY,
            opacity: nameOpacity,
            perspective: 1000,
          }}
          className="absolute inset-0 z-20 flex flex-col justify-end pb-[18vh] sm:pb-[16vh] px-6 sm:px-10 pointer-events-none"
        >
          {/* Monumental Name with 3D tilt */}
          <motion.div
            style={{
              transform: `rotateX(${-mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="max-w-[95vw] pointer-events-auto"
          >
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 130, opacity: 0, rotateX: 30 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[clamp(3.8rem,10vw,12rem)] leading-[0.82] tracking-[-0.04em] text-white drop-shadow-[0_4px_40px_rgba(0,0,0,0.9)]"
              >
                TENZIN
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 130, opacity: 0, rotateX: 30 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[clamp(3.8rem,10vw,12rem)] leading-[0.82] tracking-[-0.04em] text-white drop-shadow-[0_4px_40px_rgba(0,0,0,0.9)]"
              >
                WANGCHU
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 130, opacity: 0, rotateX: 30 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif italic text-[clamp(3.8rem,10vw,12rem)] leading-[0.82] tracking-[-0.04em] text-[#E89052] drop-shadow-[0_4px_50px_rgba(217,119,54,0.4)]"
              >
                KHONGSAI
              </motion.h1>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity: taglineOpacity }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8 pointer-events-auto"
          >
            <div>
              <div className="w-10 h-0.5 bg-[#D97736] mb-3" />
              <p className="font-serif italic text-lg sm:text-2xl text-white/85 leading-snug max-w-lg">
                Building software, intelligent systems, and computational models to understand{' '}
                <span className="text-[#E89052]">how things work.</span>
              </p>
            </div>
            <div className="font-mono text-[10px] text-white/40 tracking-wider leading-relaxed">
              CSE @ SIMATS<br />
              BS DATA SCIENCE @ IIT MADRAS
            </div>
          </motion.div>
        </motion.div>

        {/* ─── Bottom Scroll Prompt ─── */}
        <motion.div
          style={{ opacity: footerOpacity }}
          className="absolute bottom-0 left-0 right-0 z-30 px-6 sm:px-10 py-4 flex items-center justify-between font-mono text-[10px] text-white/35 tracking-wider uppercase border-t border-white/[0.04]"
        >
          <span>KOTLIN · REACT · PYTHON · DISTRIBUTED SYS</span>
          <button
            onClick={scrollToProjects}
            className="flex items-center gap-2 text-white/50 hover:text-[#E89052] transition-colors cursor-pointer"
          >
            <span>↓ SCROLL TO EXPLORE</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
