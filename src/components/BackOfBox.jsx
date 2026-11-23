import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════
   BACK OF BOX — REPLICA OF GTA VI "back-of-box" SECTION
   The iconic dramatic dark narrative block:
   - Full-bleed atmospheric background artwork (desktop.00.5pzu2sm-z4.jpg)
   - Massive Barlow Condensed typography: "CHENNAI, INDIA." & "I BUILD TO UNDERSTAND."
   - Editorial story text explaining the engineering philosophy
   - Bottom status badges
   ═══════════════════════════════════════════════════════════════════ */

export default function BackOfBox() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const palmY = useTransform(scrollYProgress, [0, 1], ['-18%', '18%']);

  return (
    <section
      ref={sectionRef}
      id="narrative"
      className="relative select-none overflow-hidden"
      style={{
        background: '#07090E',
        minHeight: 'clamp(520px, 60vh, 720px)',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
      }}
    >
      {/* ── Layer 0: Background Cinematic Artwork (desktop.00.5pzu2sm-z4.jpg) with Parallax ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.img
          src="/gta/desktop.00.5pzu2sm-z4.jpg"
          alt=""
          style={{
            y: bgY,
            height: '120%',
            top: '-10%',
            position: 'absolute',
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.32) contrast(1.15) saturate(0.85)',
          }}
        />
      </div>

      {/* ── Layer 1: Atmospheric Vignettes (Heavy Top, Bottom, and Radial Glow) ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, #080A0F 0%, rgba(8, 10, 15, 0.4) 30%, rgba(8, 10, 15, 0.6) 70%, #080A0F 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(251, 192, 134, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Decorative Palm Silhouette in Background with Smooth Parallax Drift */}
      <motion.img
        src="/gta/art-right.0829t2opnft4.svg"
        alt=""
        style={{ y: palmY }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 lg:w-[540px] opacity-[0.05] pointer-events-none"
      />

      {/* ── Layer 2: Content (Exact GTA VI "Vice City, USA." Narrative Hierarchy) ── */}
      <div
        className="max-w-[1520px] w-full mx-auto relative z-10"
        style={{ padding: '0 clamp(1.25rem, 4vw, 3.5rem)' }}
      >
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Location Tagline (Matches "Vice City, USA.") */}
          <motion.div
              className="font-mono text-xs sm:text-sm font-bold tracking-[0.35em] uppercase mb-4"
            style={{ color: '#FBC086' }}
          >
            CHENNAI, INDIA.
          </motion.div>

          {/* Headline (Barlow Condensed 900 heavy uppercase) */}
          <motion.h2
            className="font-black uppercase text-white tracking-tight leading-[0.88] mb-6 sm:mb-8"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)',
              textShadow: '0 4px 30px rgba(0,0,0,0.9)',
            }}
          >
            I BUILD TO <span style={{ color: '#F8B1C6' }}>UNDERSTAND.</span>
          </motion.h2>

          {/* Narrative Story (Matches GTA VI back-of-box story text) */}
          <motion.p
            className="text-white/80 text-base sm:text-xl lg:text-2xl leading-relaxed font-sans max-w-3xl"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}
          >
            Engineering student concurrently pursuing Computer Science &amp; Engineering at SIMATS while mastering rigorous mathematical foundations and Data Science at IIT Madras. Rather than consuming technology passively, true understanding is earned by building from first principles — autonomous newsrooms, deterministic automata defense engines, and IoT simulation systems.
          </motion.p>

          {/* Divider */}
          <motion.div
            className="w-16 h-[2px] my-8"
            style={{
              background: 'linear-gradient(90deg, transparent, #FBC086, transparent)',
            }}
          />

          {/* Fast Credentials Strip */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-mono text-xs uppercase tracking-[0.2em] text-white/50"
          >
            <span className="text-white font-bold">SIMATS CSE (9.0 CGPA)</span>
            <span className="text-[#FBC086]">◆</span>
            <span className="text-white font-bold">IIT MADRAS BS (8.0 CGPA)</span>
            <span className="text-[#F8B1C6]">◆</span>
            <span className="text-[#FBC086] font-semibold">AVAILABLE FOR IMMEDIATE RELOCATION</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

