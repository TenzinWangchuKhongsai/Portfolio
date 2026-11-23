import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════
   PROJECT SEQUENCE — EXACT GTA VI PROMO CARD REPLICA
   Directly matched to sample reference screenshot (rockstargames.com/VI):
   - Huge rounded corners (rounded-[32px])
   - Full bleed cinematic artwork with radial dark gradient masks
   - Barlow Condensed 900 heavy uppercase typography (line-height: 0.9)
   - Warm Vice City Peach (#FBC086) pill buttons with arrow icon
   - Expandable deep-dive specs with GitHub and architectural details
   ═══════════════════════════════════════════════════════════════════ */

const projects = [
  {
    id: 'padho',
    num: '01',
    category: 'AI & MULTI-PERSPECTIVE WISDOM',
    name: 'PADHO AUR SHIKHO INDIA.FAITH',
    subtitle: 'AI WISDOM PLATFORM',
    headline: 'PADHO AUR SHIKHO\nINDIA.FAITH',
    tagline: 'AI-POWERED WISDOM APP ACROSS 9 PERSPECTIVES',
    description:
      'Padho Aur Shikho India.faith is an AI-powered wisdom app that answers any question—religious, moral, personal, or controversial—from nine perspectives at once: eight world religions and science & psychology backed by real research.',
    fullOverview:
      'Padho Aur Shikho India.faith is an AI-powered wisdom app that answers any question, whether it is religious, moral, personal, or controversial, from nine perspectives at once. Eight come from world religions: Islam, Hinduism, Christianity, Buddhism, Judaism, Sikhism, Zoroastrianism, and Jainism. The ninth is a science and psychology lens backed by real research.',
    highlights: [
      {
        title: 'Real citations',
        desc: 'Every religious answer points to an actual scripture reference with chapter and verse, so users can check the source instead of trusting a generic AI reply.',
      },
      {
        title: 'Beyond religion',
        desc: 'It handles life questions too, such as heartbreak, stress, exam anxiety, and anger, by drawing on the teachings of each tradition.',
      },
      {
        title: 'Challenge and debate',
        desc: 'Users can contest any answer and get a scripture-backed rebuttal from that tradition. They can keep challenging, so the conversation goes as deep as they want.',
      },
      {
        title: '25 Indian languages',
        desc: 'Answers come in the language users actually think in, from Hindi, Tamil, and Bengali to Assamese, Nepali, and Mizo.',
      },
      {
        title: 'Friendly tone',
        desc: 'Answers are written like advice from a wise friend, not a textbook.',
      },
      {
        title: 'Everyday tools',
        desc: 'It includes bookmarking, sharing, local chat history, and a daily scripture verse.',
      },
      {
        title: 'Privacy-first',
        desc: 'There are no mandatory accounts and no data harvesting, and chat history stays on the user’s device.',
      },
    ],
    founder:
      'Tenzin Wangchu Khongsai, a student from Bomdila, Arunachal Pradesh, studying at IIT Madras and SIMATS Engineering College.',
    vision:
      'Padho Aur Shikho India.faith is the first product in a larger mission to make verified, well-sourced knowledge accessible to every Indian in every language.',
    problem:
      'Seeking wisdom on complex personal, moral, or faith questions on the modern internet usually leads to extreme bias, unverified claims, or generic AI summaries that lack authenticity and scripture context.',
    solution:
      'Built a multi-agent retrieval and citation engine grounded in authentic sacred texts across eight world religions plus empirical research in cognitive science and psychology, delivering nuanced perspectives with chapter and verse references.',
    stack: [
      'IONIC',
      'ANGULAR',
      'TYPESCRIPT',
      'SCSS',
      'GEMINI API',
      'CAPACITOR',
      'FASTAPI',
      'ANDROID',
    ],
    contribution:
      'Conceived and developed Padho Aur Shikho India.faith end-to-end: multi-perspective reasoning pipelines, 25-language localization, offline-first local storage, and responsive cross-platform mobile client.',
    github: 'https://github.com/TenzinWangchuKhongsai',
    bgImage: '/projects/padho_aur_shikho_india.png',
    accentColor: '#FBC086', // Exact sampled Explore More peach
    align: 'left',
  },
  {
    id: 'smartoffice',
    num: '02',
    category: 'IoT & ENERGY OPTIMIZATION',
    name: 'SMART OFFICE IoT PLATFORM — SOFTWARE EXPLANATION',
    subtitle: 'SOFTWARE EXPLANATION',
    headline: 'SMART OFFICE IoT PLATFORM\n— SOFTWARE EXPLANATION',
    tagline: 'SENSE → UNDERSTAND → RESPOND → SAVE',
    description:
      'Design and simulation of an intelligent IoT-based smart office network and energy optimization system, featuring a full-stack dual-tier platform with 3-way occupancy sensing, 6-rule automation, and 12-hour energy profiling.',
    fullOverview:
      'Traditional offices waste energy because devices—lights, fans, air conditioners—remain ON even when rooms are empty. This project implements a closed-loop energy optimization software architecture following the core philosophy: SENSE → UNDERSTAND → RESPOND → SAVE.',
    projectMeta: {
      title: 'Design and Simulation of an Intelligent IoT-Based Smart Office Network and Energy Optimization System',
      student: 'Tenzin Wangchu Khongsai (Reg. No. 192511447) · BE Computer Science Engineering · Team No. 10',
      supervisor: 'Supervised By: Dr. S. Salini · SIMATS',
    },
    highlights: [
      {
        title: 'Sense: 3-Way Occupancy Input',
        desc: 'Fuses virtual software simulation, in-browser laptop webcam AI (COCO-SSD with stability buffer), and network CCTV / IP camera streams (RTSP/MJPEG/ONVIF).',
      },
      {
        title: 'Understand: 6-Rule Intelligence',
        desc: 'Continuous real-time evaluation of empty room, low/high light, and high/moderate/comfortable temperature thresholds across all active rooms.',
      },
      {
        title: 'Respond: Real-Time WebSocket Control',
        desc: 'Instant device state toggling via WebSockets and REST APIs, paired with a browser-independent background controller.',
      },
      {
        title: 'Save: 12-Hour Energy Profiling',
        desc: 'Meters simulated watt-hours over a 12-hour workday demand curve, demonstrating quantifiable energy reduction vs always-on conventional setups.',
      },
      {
        title: 'Safety & Fail-Safe Mechanisms',
        desc: 'Includes camera disconnect fail-safe (safe shutdown), master turn-off controller, and emergency lockdown mode.',
      },
      {
        title: 'Real-World Hardware Ready',
        desc: 'Abstracted protocol adapters for WiFi smart plugs (ESP32), Bluetooth BLE peripherals, and 0.0.0.0 local network access.',
      },
    ],
    problem:
      'Four core operational gaps in conventional facilities: Energy Wastage (unoccupied rooms), Dynamic Conditions (continual shift throughout the day), Inefficient Control (inconsistent manual human intervention), and Lack of Visibility (no real-time telemetry across the floor plan).',
    solution:
      'Engineered a dual-tier IoT platform: Frontend in React + Vite + TypeScript (Overview, Live Camera, Rooms, Energy Analytics, Automation Rules, Simulation Control) and Backend in Node.js + Express + Socket.IO + SQLite with a browser-independent background controller.',
    stack: [
      'REACT',
      'TYPESCRIPT',
      'VITE',
      'NODE.JS',
      'EXPRESS',
      'SOCKET.IO',
      'SQLITE',
      'COCO-SSD AI',
      'ESP32 / WiFi',
      'IoT PROTOCOLS',
    ],
    contribution:
      'Module 1: IoT Sensor Integration & System Architecture — virtual sensor modeling, stability buffer pipeline, 6-rule decision engine, and real-time energy profiling suite.',
    github: 'https://github.com/TenzinWangchuKhongsai',
    bgImage: '/projects/smart_office_full_framed.png',
    accentColor: '#FBC086',
    align: 'right',
  },
  {
    id: 'tenzia',
    num: '03',
    category: 'AI & PERSONAL COMPANION',
    name: 'TENZIA',
    subtitle: 'BEYOND AN AI ASSISTANT',
    headline: 'TENZIA',
    tagline: 'AN INTELLIGENCE THAT LISTENS, UNDERSTANDS, REMEMBERS, AND HELPS YOU MOVE FORWARD',
    description:
      'A personal AI assistant designed to make human-computer interaction natural, intelligent, and personal. Not simply a chatbot, but an always-available companion bringing together conversational AI, voice interaction, contextual awareness, memory, productivity tools, and computer automation.',
    fullOverview:
      'Tenzia is a personal AI assistant designed to make human-computer interaction more natural, intelligent, and personal. Built around the idea that technology should adapt to people rather than the other way around, Tenzia brings together conversational AI, voice interaction, contextual awareness, memory, productivity tools, and computer automation in one unified environment.',
    highlights: [
      {
        title: 'More Than Conversations',
        desc: 'Natural interaction with continuous conversational context rather than isolated commands. An intelligent partner for brainstorming ideas, technical problem-solving, and everyday planning.',
      },
      {
        title: 'Intelligence With Context',
        desc: 'Works with files, understands what you are working on, organizes information, and eliminates repetitive multi-application switching.',
      },
      {
        title: 'Personal Productivity Partner',
        desc: 'Connected Google services: calendar management, organizing tasks & reminders, working with Gmail, and reviewing daily schedules through natural speech.',
      },
      {
        title: 'From Instructions to Actions',
        desc: 'Action-oriented architecture connecting AI reasoning to practical computer operations with permission controls, confirmation prompts, emergency stop, and post-action verification.',
      },
      {
        title: 'Continuity & Persistent Memory',
        desc: 'Maintains conversational continuity across sessions so discussions build on previous progress rather than constantly starting from scratch.',
      },
      {
        title: 'Futuristic Command-Center UI',
        desc: 'Animated intelligence HUD display, real-time system monitoring, activity logs, voice microphone controls, file uploads, and dedicated interaction modes.',
      },
    ],
    vision:
      'TENZIA represents an experiment in building a more personal relationship between humans and artificial intelligence — technology that supports human thinking, creativity, and execution. Your Intelligence. Your Companion. Your Digital World.',
    problem:
      'Most voice assistants are purely reactive, stateless, and forget context between commands, leaving users stranded between disconnected tools and repetitive manual workflows.',
    solution:
      'Designed an integrated companion environment uniting streaming speech recognition, persistent context recall, proactive event loop triggers, and actionable system operations in a unified personal AI OS.',
    stack: [
      'PYTHON',
      'FASTAPI',
      'VOICE RECOGNITION',
      'NLP',
      'GEMINI API',
      'VECTOR MEMORY',
      'WORKSPACE APIs',
      'AUTOMATION',
    ],
    contribution:
      'Full product conception, voice processing event loop, persistent contextual memory architecture, Google service connector layer, and futuristic command-center interface.',
    github: 'https://github.com/TenzinWangchuKhongsai',
    bgImage: '/projects/tenzia_voice.png',
    accentColor: '#F8B1C6',
    align: 'left',
  },
];

/* ── Individual Promo Card Component (Exact GTA VI Replica) ── */
function PromoCard({ project, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.12 });
  const [modalOpen, setModalOpen] = useState(false);
  const isLeft = project.align === 'left';

  /* ── Viewport Scroll Parallax (Award-winning card window depth) ── */
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.06, 1.14]);
  const textY = useTransform(scrollYProgress, [0, 1], ['14px', '-14px']);

  /* ── 3D Interactive Card Tilt ── */
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -7;
    const rotateY = ((x / rect.width) - 0.5) * 7;
    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.15 });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={() => setModalOpen(true)}
        data-cursor="EXPLORE"
        data-cursor-tone="peach"
        className="group relative w-full overflow-hidden cursor-pointer"
        style={{
          borderRadius: 'clamp(20px, 3.5vw, 32px)',
          minHeight: 'clamp(460px, 48vw, 540px)',
          background: '#0B0E14',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.22s ease-out',
          willChange: 'transform',
        }}
      >
        {/* Dynamic Specular Glare Overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-20"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
            opacity: glare.opacity,
          }}
        />
        {/* ── Layer 0: Background Cinematic Artwork with Viewport Parallax ── */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img
            src={project.bgImage}
            alt={project.name}
            style={{
              y: imgY,
              scale: imgScale,
              height: '116%',
              top: '-8%',
              position: 'absolute',
              width: '100%',
              objectFit: 'cover',
              objectPosition:
                project.id === 'padho'
                  ? 'right center'
                  : project.id === 'smartoffice'
                  ? 'center'
                  : project.id === 'tenzia'
                  ? 'left center'
                  : 'center',
              filter: 'brightness(0.85) contrast(1.08) saturate(1.05)',
            }}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.18]"
          />
        </div>

        {/* ── Layer 1: Radial Dark Mask (Exact GTA VI Text Legibility Gradient) ── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-500"
          style={{
            background: isLeft
              ? 'radial-gradient(110% 180% at 0% 50%, rgba(9, 12, 17, 0.95) 0%, rgba(9, 12, 17, 0.78) 45%, rgba(9, 12, 17, 0.25) 75%, transparent 100%)'
              : 'radial-gradient(110% 180% at 100% 50%, rgba(9, 12, 17, 0.95) 0%, rgba(9, 12, 17, 0.78) 45%, rgba(9, 12, 17, 0.25) 75%, transparent 100%)',
          }}
        />

        {/* Universal subtle bottom dark gradient for mobile */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none md:hidden"
          style={{
            background: 'linear-gradient(to top, rgba(9, 12, 17, 0.95) 0%, rgba(9, 12, 17, 0.7) 60%, transparent 100%)',
          }}
        />

        {/* ── Layer 2: Card Content (Foreground Parallax Separation) ── */}
        <motion.div
          style={{ y: textY, padding: 'clamp(2rem, 5.5vw, 4.5rem)' }}
          className={`relative z-10 w-full h-full flex flex-col ${
            isLeft ? 'justify-center items-start text-left' : 'justify-center items-start md:items-end text-left md:text-right'
          }`}
        >
          <div className="max-w-[600px] flex flex-col gap-2">
            {/* Category / Sub-heading (like MUSIC or SCREENSHOTS in reference) */}
            <span
              className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.28em] uppercase"
              style={{ color: project.accentColor }}
            >
              {project.category}
            </span>

            {/* Giant Title (Barlow Condensed 900 heavy uppercase matching Reference) */}
            <h3
              className="font-black uppercase text-white tracking-tight whitespace-pre-line group-hover:text-white transition-colors"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(2.5rem, 5.2vw, 4.5rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.015em',
                textShadow: '0 4px 24px rgba(0,0,0,0.85)',
              }}
            >
              {project.headline}
            </h3>

            {/* Subtitle / Paragraph */}
            <p
              className="text-[#CBD2DC] text-sm sm:text-base leading-relaxed mt-2"
              style={{ maxWidth: '480px' }}
            >
              {project.description}
            </p>

            {/* The Pill Button (EXACT MATCH to Screenshot 1 "Explore More →") */}
            <div className={`mt-4 sm:mt-5 ${isLeft ? 'self-start' : 'self-start md:self-end'}`}>
              <div
                className="inline-flex items-center gap-2.5 font-bold text-xs sm:text-[13px] tracking-wide rounded-full transition-all duration-200 group-hover:brightness-110 group-hover:shadow-lg cursor-pointer"
                style={{
                  background: project.accentColor,
                  color: '#0B0E14',
                  padding: '0.68rem 1.65rem',
                  boxShadow: `0 4px 20px ${project.accentColor}35`,
                }}
              >
                <span>Explore More</span>
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
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Deep Dive Specification Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/10"
              style={{ background: '#0F131C' }}
            >
              {/* Modal Header */}
              <div
                className="relative overflow-hidden p-6 sm:p-8"
                style={{
                  background: `linear-gradient(135deg, ${project.accentColor}25 0%, #0F131C 100%)`,
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className="font-mono text-xs font-bold tracking-[0.25em] uppercase"
                      style={{ color: project.accentColor }}
                    >
                      {project.category} // PROJECT {project.num}
                    </span>
                    <h2
                      className="font-black uppercase text-white mt-1"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                        lineHeight: 0.95,
                      }}
                    >
                      {project.name}
                    </h2>
                    <p className="font-mono text-xs tracking-wider text-white/50 mt-1">
                      {project.tagline}
                    </p>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="p-2 text-white/60 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Full Overview if available */}
                {project.fullOverview && (
                  <div>
                    <h4
                      className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-2"
                      style={{ color: project.accentColor }}
                    >
                      OVERVIEW &amp; PHILOSOPHY
                    </h4>
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed font-sans">
                      {project.fullOverview}
                    </p>
                  </div>
                )}

                {/* Academic Metadata */}
                {project.projectMeta && (
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold text-[#FBC086] block">
                      ACADEMIC RESEARCH &amp; INSTITUTIONAL RECORD
                    </span>
                    <h5 className="font-bold text-white text-sm leading-snug">
                      {project.projectMeta.title}
                    </h5>
                    <p className="font-mono text-xs text-white/70">
                      {project.projectMeta.student}
                    </p>
                    <p className="font-mono text-xs text-[#F8B1C6]">
                      {project.projectMeta.supervisor}
                    </p>
                  </div>
                )}

                {/* What Makes It Different / Highlights */}
                {project.highlights && (
                  <div>
                    <h4
                      className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-3"
                      style={{ color: project.accentColor }}
                    >
                      WHAT MAKES IT DIFFERENT
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10"
                        >
                          <span
                            className="font-mono text-xs font-bold uppercase tracking-wider block mb-1"
                            style={{ color: project.accentColor }}
                          >
                            ✦ {h.title}
                          </span>
                          <p className="text-xs text-white/70 leading-relaxed">
                            {h.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Founder & Vision */}
                {project.founder && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold text-white/40 block mb-1">
                        FOUNDER
                      </span>
                      <p className="text-xs text-white/80 leading-relaxed">
                        {project.founder}
                      </p>
                    </div>
                    {project.vision && (
                      <div>
                        <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold text-white/40 block mb-1">
                          VISION
                        </span>
                        <p className="text-xs text-white/80 leading-relaxed">
                          {project.vision}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Problem Statement */}
                <div>
                  <h4
                    className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-2"
                    style={{ color: project.accentColor }}
                  >
                    PROBLEM ADDRESSED
                  </h4>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Solution Architecture */}
                <div>
                  <h4
                    className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-2"
                    style={{ color: project.accentColor }}
                  >
                    TECHNICAL ARCHITECTURE
                  </h4>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                {/* Contribution */}
                <div>
                  <h4
                    className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-2"
                    style={{ color: project.accentColor }}
                  >
                    MY DIRECT CONTRIBUTION
                  </h4>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                    {project.contribution}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4
                    className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-2"
                    style={{ color: project.accentColor }}
                  >
                    CORE TECHNOLOGIES
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/5 text-white/80 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-wider rounded-full px-6 py-2.5 transition-all duration-200"
                    style={{
                      background: project.accentColor,
                      color: '#0B0E14',
                    }}
                  >
                    VIEW REPOSITORY ON GITHUB ↗
                  </a>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="font-mono text-xs uppercase tracking-wider text-white/50 hover:text-white px-4 py-2"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ProjectSequence() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.2 });

  return (
    <section
      id="projects"
      className="relative select-none"
      style={{
        background: '#080A0F',
        paddingTop: 'clamp(2.5rem, 4vw, 3.5rem)',
        paddingBottom: 'clamp(4rem, 7vw, 6rem)',
      }}
    >
      {/* ── Section Transition Strip (Faithful to GTA VI section feed) ── */}
      <div
        ref={headerRef}
        className="max-w-[1520px] mx-auto mb-6 sm:mb-8"
        style={{ padding: '0 clamp(1.25rem, 4vw, 3.5rem)' }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FBC086] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.28em] uppercase text-white">
              MY PROJECTS <span className="text-[#FBC086]">// AUTONOMOUS SYSTEMS &amp; SECURITY</span>
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 hidden sm:inline-block">
            3 PRODUCTION ARCHITECTURES
          </span>
        </div>
      </div>

      {/* ── Promo Cards Stack (Exact GTA VI Layout) ── */}
      <div
        className="max-w-[1520px] mx-auto flex flex-col gap-6 sm:gap-8 lg:gap-10"
        style={{ padding: '0 clamp(1.25rem, 4vw, 3.5rem)' }}
      >
        {projects.map((project, index) => (
          <PromoCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* ── Bottom Section CTA ── */}
      <div className="max-w-[1520px] mx-auto mt-12 sm:mt-16 text-center">
        <a
          href="https://github.com/TenzinWangchuKhongsai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full px-8 py-3.5 transition-all duration-200 hover:brightness-110 active:scale-95"
          style={{
            background: '#F8B1C6',
            color: '#0B0E14',
            boxShadow: '0 4px 24px rgba(248, 177, 198, 0.25)',
          }}
        >
          <span>VIEW FULL GITHUB REPOSITORY ARCHIVE</span>
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
