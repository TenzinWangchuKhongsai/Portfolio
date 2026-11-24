import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// useScroll + useTransform removed — they fire on every scroll tick, killing fps.
// Palm and portrait now use static CSS; GSAP ScrollAnimations handles the entrance.

const skillsTicker = [
  'PYTHON',
  'FINITE AUTOMATA',
  'MACHINE LEARNING',
  'REACT',
  'SYSTEM DESIGN',
  'DATA SCIENCE',
  'IoT PROTOCOLS',
  'CYBERSECURITY',
  'SQL & DBMS',
  'AUTOMATION AGENTS',
  'C & JAVA',
  'COMPUTER VISION',
];

export default function EditorialIdentity() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  // Removed: useScroll, useTransform (palmY, portraitImgY, portraitScale)

  return (
    <section
      ref={sectionRef}
      id="identity"
      className="relative select-none overflow-hidden"
      style={{
        background: '#07090E',
        paddingTop: 'clamp(5rem, 8vw, 8rem)',
        paddingBottom: 'clamp(5rem, 8vw, 8rem)',
      }}
    >
      {/* Decorative Palm Silhouette — static, entrance handled by GSAP */}
      <img
        src="/gta/art-right.0829t2opnft4.svg"
        alt=""
        className="absolute top-10 right-0 w-80 lg:w-[480px] opacity-[0.06] pointer-events-none select-none"
      />

      <div
        className="max-w-[1520px] mx-auto relative z-10"
        style={{ padding: '0 clamp(1.25rem, 4vw, 3.5rem)' }}
      >
        {/* ── Section Header ── */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            className="font-mono text-xs font-semibold tracking-[0.28em] uppercase text-[#F8B1C6] mb-3"
          >
            CHAPTER 03 // THE BUILDER
          </motion.div>

          <motion.h2
            className="font-black uppercase text-white tracking-tight leading-[0.88]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(3rem, 9vw, 7.5rem)',
            }}
          >
            CHENNAI, INDIA.<br />
            <span style={{ color: '#FBC086' }}>I BUILD TO UNDERSTAND.</span>
          </motion.h2>
        </div>

        {/* ── Main Two-Column Editorial Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Biography, Philosophy & Education */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="space-y-4 max-w-2xl">
              <p className="text-white/80 text-base sm:text-lg leading-relaxed font-sans">
                Computer Science &amp; Engineering undergraduate at <strong className="text-white">SIMATS Engineering</strong>, concurrently pursuing foundational Data Science coursework at <strong className="text-white">IIT Madras</strong>.
              </p>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                Rather than treating software as abstract syntax, I build systems from the ground up to understand how state machines catch real-time threats, how automated agent pipelines compress newsroom latency, and how IoT topologies optimize energy consumption.
              </p>
            </div>

            {/* Academic Credential Cards (GTA VI dark card style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {/* Card 1: SIMATS */}
              <div
                className="p-6 rounded-[22px] flex flex-col justify-between border border-white/[0.08] transition-all duration-300 hover:border-[#FBC086]/30"
                style={{ background: '#0F131C' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-[#FBC086]">
                      B.E. CSE
                    </span>
                    <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-full bg-[#FBC086]/15 text-[#FBC086] border border-[#FBC086]/30">
                      9.0 CGPA
                    </span>
                  </div>
                  <h3
                    className="font-black text-xl text-white uppercase"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    SIMATS ENGINEERING
                  </h3>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    Data Structures, Automata Theory, Operating Systems, Networks, and Distributed Architecture. Expected 2029.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FBC086]" />
                  <span className="font-mono text-[9px] tracking-widest uppercase text-white/40">
                    CHENNAI, TAMIL NADU
                  </span>
                </div>
              </div>

              {/* Card 2: IIT Madras */}
              <div
                className="p-6 rounded-[22px] flex flex-col justify-between border border-white/[0.08] transition-all duration-300 hover:border-[#F8B1C6]/30"
                style={{ background: '#0F131C' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase text-[#F8B1C6]">
                      BS DATA SCIENCE
                    </span>
                    <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-full bg-[#F8B1C6]/15 text-[#F8B1C6] border border-[#F8B1C6]/30">
                      8.0 CGPA
                    </span>
                  </div>
                  <h3
                    className="font-black text-xl text-white uppercase"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    IIT MADRAS
                  </h3>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    Linear Algebra, Discrete Mathematics, Computational Thinking, Statistics, and Python. Foundational Level Complete.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F8B1C6]" />
                  <span className="font-mono text-[9px] tracking-widest uppercase text-white/40">
                    NATIONAL INSTITUTE OF EXCELLENCE
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-white/10">
              {[
                { label: 'LOCATION', value: 'CHENNAI, INDIA' },
                { label: 'AVAILABILITY', value: 'OPEN TO RELOCATION' },
                { label: 'ROLES', value: 'SOFTWARE / AI / SYSTEMS' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40">
                    {label}
                  </div>
                  <div className="font-mono text-xs font-bold tracking-wider text-white mt-0.5">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Portrait & Award Recognition */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Portrait Card with Window Parallax */}
            <motion.div
              data-cursor="INSPECT"
              data-cursor-tone="pink"
              className="group relative w-full overflow-hidden rounded-[28px] border border-white/[0.08] transition-all duration-500 hover:border-[#F8B1C6]/30 cursor-pointer"
              style={{
                aspectRatio: '4/5',
                background: '#0F131C',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  src="/me/Images/WhatsApp_Image_2026-08-24_at_6.56.57_cc24506f_2K.jpg"
                  alt="Tenzin Wangchu Khongsai"
                  style={{
                    height: '116%',
                    top: '-8%',
                    position: 'absolute',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    filter: 'brightness(0.92) contrast(1.08)',
                  }}
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.18]"
                />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(9, 12, 17, 0.95) 0%, rgba(9, 12, 17, 0.2) 40%, transparent 100%)',
                }}
              />
              {/* Bottom Label inside Portrait */}
              <div className="absolute bottom-6 inset-x-6 flex items-end justify-between">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#FBC086] font-bold block mb-1">
                    STUDENT &amp; DEVELOPER
                  </span>
                  <h4
                    className="font-black text-2xl text-white uppercase leading-none"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    TENZIN WANGCHU KHONGSAI
                  </h4>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F8B1C6] animate-pulse" />
              </div>
            </motion.div>

            {/* Award Photo Strip with Viewport Spring */}
            <div className="grid grid-cols-2 gap-4">
              <div
                data-cursor="INSPECT"
                data-cursor-tone="peach"
                className="group relative overflow-hidden rounded-[20px] border border-white/[0.08] transition-all duration-500 hover:border-[#FBC086]/30 cursor-pointer"
                style={{ aspectRatio: '4/3', background: '#0F131C' }}
              >
                <img
                  src="/me/Images/techstar_portrait_framed.jpg"
                  alt="Tech Star Summit Award"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="font-mono text-[9px] font-bold text-[#FBC086] tracking-wider uppercase">
                    FIRST PRIZE // TECH STAR SUMMIT
                  </span>
                </div>
              </div>

              <div
                data-cursor="INSPECT"
                data-cursor-tone="peach"
                className="group relative overflow-hidden rounded-[20px] border border-white/[0.08] transition-all duration-500 hover:border-[#FBC086]/30 cursor-pointer"
                style={{ aspectRatio: '4/3', background: '#0F131C' }}
              >
                <img
                  src="/me/Images/beach_portrait_framed.jpg"
                  alt="Youth Skills Day"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="font-mono text-[9px] font-bold text-[#F8B1C6] tracking-wider uppercase">
                    DELEGATE // YOUTH SKILLS DAY
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Continuous Technical Marquee Ticker ── */}
        <div
          data-cursor="SKILLS"
          data-cursor-tone="peach"
          className="mt-16 pt-8 border-t border-white/10 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <div className="flex overflow-hidden whitespace-nowrap select-none group">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
              className="flex items-baseline gap-8 pr-8 group-hover:[animation-play-state:paused]"
            >
              {skillsTicker.concat(skillsTicker).concat(skillsTicker).map((skill, idx) => (
                <span
                  key={idx}
                  className="font-black uppercase tracking-tight text-white/40 hover:text-white transition-colors cursor-default"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                  }}
                >
                  <span style={{ color: idx % 2 === 0 ? '#FFFFFF' : '#FBC086' }}>{skill}</span>
                  <span className="text-white/15 ml-8">/</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
