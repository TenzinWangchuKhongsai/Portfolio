import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════
   CONTACT FINALE — REPLICA OF GTA VI "outro-announcement" & FOOTER
   - Centered metallic TWK emblem
   - Giant Barlow Condensed 900 typography
   - Iconic GTA VI blush pink (#F8B1C6) pill CTA button
   - 3 Glass Contact Cards (Email with copy, GitHub, LinkedIn)
   - Official GTA VI footer layout
   ═══════════════════════════════════════════════════════════════════ */

export default function ContactFinale() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const palmY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  const copyEmail = () => {
    navigator.clipboard.writeText('shritenzin@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const now = new Date();
  const timeStr =
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now) + ' IST';

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative select-none overflow-hidden flex flex-col justify-between"
      style={{
        background: '#07090E',
        minHeight: '100svh',
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
      }}
    >
      {/* Decorative GTA VI Palm Silhouette Background with Scroll Parallax */}
      <motion.img
        src="/gta/art-left.0vk970u0aa4z3.svg"
        alt=""
        style={{ y: palmY }}
        className="absolute bottom-10 left-0 w-80 lg:w-[500px] opacity-[0.06] pointer-events-none select-none will-change-transform"
      />

      {/* Warm Ambient Vice City Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle 800px at 50% 35%, rgba(248, 177, 198, 0.08) 0%, rgba(251, 192, 134, 0.04) 40%, transparent 70%)',
        }}
      />

      {/* ── Main Content Area ── */}
      <div
        className="max-w-[1520px] mx-auto w-full relative z-10 flex-1 flex flex-col justify-center items-center text-center"
        style={{ padding: '0 clamp(1.25rem, 4vw, 3.5rem)' }}
      >
        {/* Outro Metallic Logo Emblem (Replica of outro-announcement VI mark) */}
        <motion.div
          className="w-36 sm:w-48 mb-6"
        >
          <img
            src="/twk_monogram_alpha.png"
            alt="TWK Emblem"
            className="w-full h-auto object-contain mx-auto"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(248, 177, 198, 0.35)) drop-shadow(0 4px 20px rgba(0,0,0,0.8))',
            }}
          />
        </motion.div>

        <motion.div
          className="font-mono text-xs font-semibold tracking-[0.28em] uppercase text-[#F8B1C6] mb-3"
        >
          CHAPTER 05 // LET'S BUILD
        </motion.div>

        {/* Monumental Headline */}
        <motion.h2
          className="font-black uppercase text-white tracking-tight leading-[0.88] max-w-4xl"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(3.2rem, 9.5vw, 8.5rem)',
            textShadow: '0 4px 30px rgba(0,0,0,0.8)',
          }}
        >
          BUILD SOMETHING<br />
          <span style={{ color: '#F8B1C6' }}>WORTH EXPLORING.</span>
        </motion.h2>

        <motion.p
          className="text-white/60 text-base sm:text-xl leading-relaxed mt-5 max-w-2xl"
        >
          Open to impactful software engineering roles, data science positions, and systems research. Available for immediate relocation.
        </motion.p>

        {/* Primary CTA Button (Exact GTA VI Blush Pink Pill) */}
        <motion.div
          className="mt-8 mb-14"
        >
          <a
            href="mailto:shritenzin@gmail.com"
            data-cursor="HIRE"
            data-cursor-tone="pink"
            className="inline-flex items-center gap-3 font-bold text-sm sm:text-base uppercase tracking-wider rounded-full px-9 sm:px-12 py-4 transition-all duration-300 hover:brightness-110 active:scale-95 shadow-xl"
            style={{
              background: '#F8B1C6',
              color: '#0B0E14',
              boxShadow: '0 8px 32px rgba(248, 177, 198, 0.35)',
            }}
          >
            <span>HIRE NOW</span>
            <span>→</span>
          </a>
        </motion.div>

        {/* ── 3 Glass Contact Cards with Staggered Scroll Entrance ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl text-left pt-8 border-t border-white/10">
          {/* Email Card */}
          <motion.div
            className="p-6 rounded-[22px] border border-white/[0.08] flex flex-col justify-between transition-all duration-300 hover:border-white/25 hover:-translate-y-1.5 hover:shadow-2xl"
            style={{ background: '#0F131C' }}
          >
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-[#F8B1C6] block mb-2">
                DIRECT INBOX
              </span>
              <a
                href="mailto:shritenzin@gmail.com"
                className="font-mono text-sm sm:text-base font-semibold text-white hover:text-[#F8B1C6] transition-colors block break-all"
              >
                shritenzin@gmail.com
              </a>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={copyEmail}
                className="font-mono text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all cursor-pointer"
              >
                {copied ? '✓ COPIED TO CLIPBOARD' : 'COPY EMAIL'}
              </button>
            </div>
          </motion.div>

          {/* GitHub Card */}
          <motion.div
            className="p-6 rounded-[22px] border border-white/[0.08] flex flex-col justify-between transition-all duration-300 hover:border-white/25 hover:-translate-y-1.5 hover:shadow-2xl"
            style={{ background: '#0F131C' }}
          >
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-[#FBC086] block mb-2">
                CODE ARCHIVE
              </span>
              <a
                href="https://github.com/TenzinWangchuKhongsai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm sm:text-base font-semibold text-white hover:text-[#FBC086] transition-colors block break-all"
              >
                TenzinWangchuKhongsai
              </a>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5">
              <a
                href="https://github.com/TenzinWangchuKhongsai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-wider font-semibold text-[#FBC086] hover:underline"
              >
                VIEW GITHUB PROFILE ↗
              </a>
            </div>
          </motion.div>

          {/* LinkedIn Card */}
          <motion.div
            className="p-6 rounded-[22px] border border-white/[0.08] flex flex-col justify-between transition-all duration-300 hover:border-white/25 hover:-translate-y-1.5 hover:shadow-2xl"
            style={{ background: '#0F131C' }}
          >
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-[#F8B1C6] block mb-2">
                PROFESSIONAL NETWORK
              </span>
              <a
                href="https://www.linkedin.com/in/tenzin-wangchu-khongsai-b31546399"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm sm:text-base font-semibold text-white hover:text-[#F8B1C6] transition-colors block break-all"
              >
                tenzin-wangchu-khongsai
              </a>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5">
              <a
                href="https://www.linkedin.com/in/tenzin-wangchu-khongsai-b31546399"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-wider font-semibold text-[#F8B1C6] hover:underline"
              >
                CONNECT ON LINKEDIN ↗
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Official GTA VI Footer ── */}
      <footer
        className="w-full relative z-10 border-t border-white/10 mt-16"
        style={{ padding: '1.25rem clamp(1.25rem, 4vw, 3.5rem)', background: '#05070B' }}
      >
        <div className="max-w-[1520px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <span
              className="font-black text-sm tracking-widest text-[#F8B1C6]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              TWK
            </span>
            <span className="font-mono text-[11px] font-bold tracking-wider text-white">
              TENZIN WANGCHU KHONGSAI
            </span>
            <span className="font-mono text-[11px] text-white/40">· CHENNAI, INDIA</span>
          </div>

          <div className="flex flex-wrap gap-4 items-center font-mono text-[10px] text-white/40">
            <span>SIMATS CSE (9.0)</span>
            <span>·</span>
            <span>IIT MADRAS BS (8.0)</span>
            <span>·</span>
            <span className="text-[#FBC086] font-semibold">{timeStr}</span>
            <span>·</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-white hover:text-[#F8B1C6] transition-colors uppercase font-bold cursor-pointer"
            >
              BACK TO TOP ↑
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
}
