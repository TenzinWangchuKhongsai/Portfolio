import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function ContactFinale() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  const statementScale = useTransform(scrollYProgress, [0.2, 0.6], [0.96, 1]);
  const statementY = useTransform(scrollYProgress, [0.2, 0.6], [20, 0]);

  const copyEmail = () => {
    navigator.clipboard.writeText('shritenzin@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const now = new Date();
  const timeStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now) + ' IST';

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="snap-section relative bg-[#06080B] text-[var(--ivory)] min-h-screen flex flex-col justify-between overflow-hidden"
    >
      {/* Architectural Portal Corridor Visual Overlay (Main reference video.mp4) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_700px_at_50%_45%,rgba(217,119,54,0.1),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(232, 144, 82, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(232, 144, 82, 0.4) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
        transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2.0)',
      }} />

      {/* Main Content */}
      <div className="scene-pad pt-20 pb-12 relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] text-[#D97736] tracking-[0.2em] font-semibold mb-4 uppercase"
        >
          CHAPTER 05 // LET'S BUILD
        </motion.div>

        {/* Monumental Headline */}
        <motion.div style={{ scale: statementScale, y: statementY }}>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(3rem,8vw,9rem)] leading-[0.86] tracking-[-0.03em] text-white max-w-5xl mb-8"
          >
            BUILD SOMETHING<br />
            <span className="italic text-[#E89052]">WORTH EXPLORING.</span>
          </motion.h2>
        </motion.div>

        <p className="font-serif italic text-lg sm:text-xl text-white/60 max-w-xl mb-10 leading-relaxed">
          Open to impactful software engineering roles, systems research, and ambitious technology builds.
        </p>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl border-t border-white/8 pt-8">
          
          {/* Email */}
          <div className="p-5 rounded-xl glass-panel hover:border-[#D97736]/40 transition-colors">
            <div className="font-mono text-[9px] text-[#D97736] font-semibold tracking-wider uppercase mb-2">
              DIRECT CHANNEL
            </div>
            <a
              href="mailto:shritenzin@gmail.com"
              className="font-mono text-sm text-white hover:text-[#E89052] transition-colors block mb-2.5 font-medium truncate"
            >
              shritenzin@gmail.com
            </a>
            <button
              onClick={copyEmail}
              className="font-mono text-[10px] px-2.5 py-1 rounded bg-white/5 hover:bg-[#D97736] hover:text-black border border-white/10 transition-all text-white/70 cursor-pointer"
            >
              {copied ? '✓ COPIED' : 'COPY EMAIL'}
            </button>
          </div>

          {/* GitHub */}
          <div className="p-5 rounded-xl glass-panel hover:border-[#D97736]/40 transition-colors flex flex-col justify-between">
            <div>
              <div className="font-mono text-[9px] text-[#D97736] font-semibold tracking-wider uppercase mb-2">
                REPOSITORIES
              </div>
              <a
                href="https://github.com/TenzinWangchuKhongsai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-white hover:text-[#E89052] transition-colors block font-medium"
              >
                TenzinWangchuKhongsai
              </a>
              <p className="text-white/40 text-[10px] mt-1">Aura, Padho, Smart Office, Simulations</p>
            </div>
            <a
              href="https://github.com/TenzinWangchuKhongsai"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] text-[#E89052] hover:underline"
            >
              VISIT GITHUB →
            </a>
          </div>

          {/* LinkedIn */}
          <div className="p-5 rounded-xl glass-panel hover:border-[#D97736]/40 transition-colors flex flex-col justify-between">
            <div>
              <div className="font-mono text-[9px] text-[#D97736] font-semibold tracking-wider uppercase mb-2">
                PROFESSIONAL
              </div>
              <a
                href="https://www.linkedin.com/in/tenzin-wangchu-khongsai/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-white hover:text-[#E89052] transition-colors block font-medium"
              >
                tenzin-wangchu-khongsai
              </a>
              <p className="text-white/40 text-[10px] mt-1">SIMATS · IIT Madras</p>
            </div>
            <a
              href="https://www.linkedin.com/in/tenzin-wangchu-khongsai/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] text-[#E89052] hover:underline"
            >
              CONNECT →
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="scene-pad py-4 border-t border-white/8 relative z-10 font-mono text-[10px] text-white/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97736]" />
            <span className="text-white/80 font-semibold">TENZIN WANGCHU KHONGSAI</span>
            <span>· CHENNAI, IN</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>SIMATS CSE (9.0)</span>
            <span>· IIT MADRAS BS (8.0)</span>
            <span className="text-[#E89052]">{timeStr}</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
