import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════
   EDITION CARDS & BOX ART ARCHIVES
   Exact 1:1 Replica of rockstargames.com/VI:
   - Screen 1: Box Art Mosaic Section with status strip (Image 4)
   - Screen 2: Dual Ultimate Edition featured cards (Image 5)
     * Left: Box Art Cover with 3D tilt & dynamic specular glare
     * Right: Spaced overline, Barlow Condensed title, description,
              and [ Learn More → ] peach pill button
   - Full deep-dive modal on click with syllabus & verified CGPAs
   ═══════════════════════════════════════════════════════════════════ */

/* ── 3D Tilt Wrapper ── */
function TiltCard({ children, className = '', style = {}, onClick, dataCursor = 'DETAILS', dataCursorTone = 'peach' }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.16 });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      data-cursor={dataCursor}
      data-cursor-tone={dataCursorTone}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.22s ease-out',
        willChange: 'transform',
      }}
    >
      {children}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-20"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.22) 0%, transparent 60%)`,
          opacity: glare.opacity,
        }}
      />
    </div>
  );
}

export default function EditionCards() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [activeModal, setActiveModal] = useState(null);

  const editions = [
    {
      id: 'simats',
      tag: 'U L T I M A T E   E D I T I O N',
      title: 'ULTIMATE EDITION',
      subtitle: 'B.E. COMPUTER SCIENCE & ENGINEERING',
      institution: 'SIMATS ENGINEERING COLLEGE',
      badge: 'CGPA 9.0 // 2029',
      description:
        'An exclusive curriculum threaded across all aspects of computer systems — advanced automata theory, deterministic finite state machines, distributed systems, and real-time network simulations.',
      bgImage: '/me/Images/ultimate_edition.png',
      buttonText: 'Learn More',
      accent: '#FBC086',
      details: [
        'Advanced Data Structures & Algorithmic Problem Solving in C, Python & Java',
        'Theory of Computation & Finite Automata (Core architecture for SecLogix WAF)',
        'Operating Systems, Concurrency, Virtual Memory, and Systems Design',
        'Database Management Systems, Relational Schema Design, and Indexing',
        'IoT Networks, Sensor Nodes, Protocols, and Embedded Energy Simulation',
      ],
    },
    {
      id: 'iitm',
      tag: 'V I N T A G E   E D I T I O N',
      title: 'VINTAGE PACK',
      subtitle: 'BS IN DATA SCIENCE & APPLICATIONS',
      institution: 'IIT MADRAS (INDIAN INSTITUTE OF TECHNOLOGY)',
      badge: 'CGPA 8.0 // FOUNDATIONAL COMPLETE',
      description:
        'Rigorous mathematical, statistical, and algorithmic training under India’s premier institute of technology. Completed foundational tier with 8.0 CGPA spanning linear algebra, probability, and exploratory modeling.',
      bgImage: '/me/Images/vintage_pack.png',
      buttonText: 'Learn More',
      accent: '#FBC086',
      details: [
        'Linear Algebra, Vector Spaces, Matrix Decompositions, and Eigenvalues',
        'Rigorous Probability & Inferential Statistics for Predictive Modeling',
        'Computational Thinking, Python Data Structures, and Algorithmic Analysis',
        'Discrete Mathematics, Graph Theory, and Combinatorial Logic',
        'Machine Learning & Exploratory Data Analysis with NumPy & Pandas',
      ],
    },
  ];

  return (
    <section
      ref={containerRef}
      id="editions"
      className="relative select-none overflow-hidden"
      style={{
        background: '#07090E',
        paddingTop: 'clamp(4rem, 7vw, 6rem)',
        paddingBottom: 'clamp(4rem, 7vw, 6rem)',
      }}
    >
      <div
        className="max-w-[1520px] mx-auto flex flex-col gap-12 sm:gap-16"
        style={{ padding: '0 clamp(1.25rem, 4vw, 3.5rem)' }}
      >
        {/* ═══════════════════════════════════════════════════════════════
            STAGE 1: BOX ART KEY ART MOSAIC SECTION (IMAGE 4)
            ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[32px] overflow-hidden border border-white/10 bg-[#0A0D15]"
        >
          {/* Top Banner with Palm Flourishes (Image 4 Top Strip) */}
          <div
            className="w-full flex items-center justify-center relative py-3 sm:py-4 px-6 border-b border-white/10"
            style={{
              background: 'linear-gradient(90deg, #181124 0%, #291C36 50%, #181124 100%)',
            }}
          >
            <img
              src="/gta/art-left.0vk970u0aa4z3.svg"
              alt=""
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 h-8 sm:h-10 opacity-30 pointer-events-none"
            />
            <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.35em] uppercase text-white/90">
              PRE-LOAD NOW // THE ACADEMIC ARCHIVES
            </span>
            <img
              src="/gta/art-right.0829t2opnft4.svg"
              alt=""
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 h-8 sm:h-10 opacity-30 pointer-events-none"
            />
          </div>

          {/* Central Key Art */}
          <div className="relative w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 flex flex-col items-center">
            <div className="relative rounded-[24px] overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src="/me/Images/pre_load_academic_archive.png"
                alt="Pre-Load Academic Archive - Tenzin Wangchu Khongsai"
                className="max-h-[620px] w-auto max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Bottom Strip (Image 4 Bottom Anatomy) */}
          <div
            className="w-full border-t border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: 'rgba(7, 9, 14, 0.95)' }}
          >
            {/* Left: Coming / Date */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50">
                GRADUATION HORIZON
              </span>
              <span
                className="font-black text-xl sm:text-2xl uppercase text-white tracking-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                EXPECTED 2029 // DUAL TIER
              </span>
            </div>

            {/* Center: HIRE NOW Pill Button */}
            <a
              href="mailto:shritenzin@gmail.com"
              data-cursor="HIRE"
              data-cursor-tone="pink"
              className="inline-flex items-center justify-center font-bold text-xs sm:text-[13px] tracking-wide rounded-full px-8 py-3 transition-all duration-200 hover:brightness-110 active:scale-95 shadow-xl"
              style={{
                background: '#F8B1C6',
                color: '#0B0E14',
                boxShadow: '0 4px 20px rgba(248, 177, 198, 0.35)',
              }}
            >
              HIRE NOW
            </a>

            {/* Right: Verified Technical Badges */}
            <div className="flex items-center gap-4 text-white/60 font-mono text-[10px] tracking-wider uppercase">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F8B1C6]" />
                <span>SIMATS CSE (9.0)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBC086]" />
                <span>IIT MADRAS BS (8.0)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            STAGE 2: DUAL ULTIMATE EDITION FEATURED CARDS (IMAGE 5)
            Exact Replica: Box Art on Left, Title + Learn More on Right
            ═══════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-8 sm:gap-10">
          {editions.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard
                onClick={() => setActiveModal(item)}
                dataCursor="DETAILS"
                dataCursorTone="peach"
                className="group w-full border border-white/10"
                style={{
                  borderRadius: 'clamp(24px, 3.5vw, 36px)',
                  background:
                    idx === 0
                      ? 'radial-gradient(120% 140% at 90% 50%, #2A173B 0%, #170E24 45%, #0B0E15 100%)'
                      : 'radial-gradient(120% 140% at 90% 50%, #1D253D 0%, #121727 45%, #0B0E15 100%)',
                  boxShadow: '0 24px 70px rgba(0, 0, 0, 0.7)',
                  padding: 'clamp(2rem, 5vw, 4rem)',
                }}
              >
                {/* Palm Silhouette flourishes */}
                <img
                  src={idx === 0 ? '/gta/art-right.0829t2opnft4.svg' : '/gta/art-left.0vk970u0aa4z3.svg'}
                  alt=""
                  className="absolute right-0 top-0 h-full opacity-10 pointer-events-none select-none"
                />

                {/* 2-Column Responsive Layout (Exact Replica of Image 5) */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {/* Left Column: Edition Box Art */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div
                      className="relative w-full max-w-[420px] rounded-[24px] overflow-hidden border border-white/15 shadow-2xl transition-transform duration-700 group-hover:scale-105"
                      style={{ aspectRatio: '1/1' }}
                    >
                      <img
                        src={item.bgImage}
                        alt={item.title}
                        className="w-full h-full object-cover object-center"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)',
                        }}
                      />
                      {/* Top Corner Pill Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="font-mono text-[9px] font-bold tracking-wider px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#FBC086] border border-[#FBC086]/30 uppercase">
                          {item.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Title, Narrative & Learn More Pill Button (Image 5) */}
                  <div className="lg:col-span-7 flex flex-col justify-center text-left">
                    {/* Spaced Overline: U L T I M A T E   E D I T I O N */}
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.38em] uppercase text-white/70 block mb-2">
                      {item.tag}
                    </span>

                    {/* Monumental Barlow Condensed Title */}
                    <h3
                      className="font-black uppercase text-white tracking-tight leading-[0.92] mb-3"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)',
                        textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Subtitle / Program Name */}
                    <div className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#FBC086] mb-4">
                      {item.subtitle}
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-[#CBD2DC] text-sm sm:text-base leading-relaxed max-w-xl mb-6">
                      {item.description}
                    </p>

                    {/* Learn More → Peach Pill Button (Exact Replica of Image 5) */}
                    <div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModal(item);
                        }}
                        data-cursor="LEARN"
                        data-cursor-tone="peach"
                        className="inline-flex items-center gap-2.5 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all duration-300 hover:brightness-110 hover:shadow-xl cursor-pointer"
                        style={{
                          background: '#FBC086',
                          color: '#0B0E14',
                          padding: '0.75rem 2rem',
                          boxShadow: '0 6px 24px rgba(251, 192, 134, 0.4)',
                        }}
                      >
                        <span>Learn More</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071L12.7071 19.7071C12.3166 20.0976 11.6834 20.0976 11.2929 19.7071C10.9024 19.3166 10.9024 18.6834 11.2929 18.2929L16.5858 13L5 13C4.44771 13 4 12.5523 4 12C4 11.4477 4.44771 11 5 11L16.5858 11L11.2929 5.70711C10.9024 5.31658 10.9024 4.68342 11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289L19.7071 11.2929Z"
                            fill="currentColor"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Deep Dive Degree Specification Modal ── */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-[32px] overflow-hidden border border-white/20 bg-[#0B0E14] shadow-2xl p-6 sm:p-10"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-5 mb-6">
                <div>
                  <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-[#F8B1C6]">
                    {activeModal.tag}
                  </span>
                  <h3
                    className="font-black text-2xl sm:text-3xl text-white uppercase mt-1"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {activeModal.subtitle}
                  </h3>
                  <span className="font-mono text-xs text-[#FBC086] tracking-wider block mt-0.5">
                    {activeModal.institution} · {activeModal.badge}
                  </span>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  data-cursor="CLOSE"
                  data-cursor-tone="pink"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Description */}
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
                {activeModal.description}
              </p>

              {/* Core Curriculum Modules */}
              <div className="mb-6">
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-white/50 block mb-3">
                  CORE MODULES &amp; COMPETENCIES
                </span>
                <div className="space-y-2">
                  {activeModal.details.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                    >
                      <span className="font-mono text-xs font-bold text-[#F8B1C6] mt-0.5">
                        0{i + 1}.
                      </span>
                      <span className="text-xs sm:text-sm text-white/85 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="font-mono text-xs text-white/40">
                  OFFICIAL INSTITUTIONAL RECORD
                </span>
                <button
                  onClick={() => setActiveModal(null)}
                  className="font-bold text-xs uppercase tracking-wider text-[#F8B1C6] hover:underline cursor-pointer"
                >
                  CLOSE SPECIFICATION ✕
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}