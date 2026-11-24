import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════
   CINEMATIC HERO & TRAILER CAROUSEL
   Exact 1:1 Replica of rockstargames.com/VI:
   - Screen 1: Full-bleed Hero Poster with 3D Chrome TWK Logo (Image 2)
   - Large Circular Glass Play Button with ambient pulse
   - Screen 2: Official 4-Card Trailer Carousel (Image 3)
     * Featured Top Card: "WATCH AN EXTENDED LOOK" ([▶ Play] pill)
     * Bottom 3 Cards: "LAUNCH TRAILER", "TRAILER 2", "TRAILER 1"
   - 3D Interactive Card Tilt with Specular Glare
   - High-performance Lerp Cursor Actions
   ═══════════════════════════════════════════════════════════════════ */

const TWK_LOGO = '/twk_monogram_alpha.png';
const FALLBACK_POSTER = '/me/videos/hero_video_poster.jpg';
const INTRO_VIDEO = '/me/videos/intro_video.mp4';

const trailers = [
  {
    id: 'extended-look',
    badge: 'FEATURED EXTENDED LOOK',
    title: 'AN EXTENDED LOOK // THE BUILDER REVEAL',
    subtitle: 'Autonomous Systems · Real-Time Engineering · Full Production Reel',
    src: '/me/videos/an_extended_look.mp4',
    poster: '/me/videos/extended_look_thumb.jpg',
  },
  {
    id: 'trailer-launch',
    badge: 'LAUNCH TRAILER',
    title: 'LAUNCH TRAILER // SECLOGIX ATTACK ENGINE',
    subtitle: 'Automata Defense · Real-Time WAF · Linear O(N) Processing',
    src: '/me/videos/Launch_Teaser.mp4',
    poster: '/me/videos/launch_teaser_thumb.jpg',
  },
  {
    id: 'trailer-2',
    badge: 'TRAILER 2',
    title: 'TRAILER 2 // CYBERSECURITY COMMAND CENTER',
    subtitle: 'Surveillance Terminals · Finite State Transition Tables',
    src: '/me/videos/V3.mp4',
    poster: '/v3_f3.jpg',
  },
  {
    id: 'trailer-1',
    badge: 'TRAILER 1',
    title: 'TRAILER 1 // DEVELOPER BATTLESTATION',
    subtitle: 'Full-Stack Engineering · Vice City Skyline · RGB Workspace',
    src: '/me/videos/v4.mp4',
    poster: '/v4_f3.jpg',
  },
];

/* ── 3D Interactive Tilt Card Component — zero setState, pure DOM writes ── */
function TiltCard({ children, className = '', style = {}, onClick, dataCursor = 'PLAY', dataCursorTone = 'pink' }) {
  const cardRef  = useRef(null);
  const glareRef = useRef(null);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rX = ((y / rect.height) - 0.5) * -10;
    const rY = ((x / rect.width)  - 0.5) *  10;
    card.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg)`;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${(x/rect.width)*100}% ${(y/rect.height)*100}%, rgba(255,255,255,0.25) 0%, transparent 60%)`;
      glareRef.current.style.opacity = '0.18';
    }
  };

  const onMouseLeave = () => {
    if (cardRef.current)  cardRef.current.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    if (glareRef.current) glareRef.current.style.opacity   = '0';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      data-cursor={dataCursor}
      data-cursor-tone={dataCursorTone}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      style={{ ...style, transition: 'transform 0.22s ease-out', willChange: 'transform' }}
    >
      {children}
      {/* Dynamic Specular Glare */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none rounded-[inherit] z-20"
        style={{ opacity: 0, transition: 'opacity 0.3s' }}
      />
    </div>
  );
}

export default function CinematicHero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const modalVideoRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [videoErr, setVideoErr] = useState(false);

  /* Viewport scroll parallax for Hero */
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroBgY = useTransform(heroScroll, [0, 1], ['0%', '22%']);
  const heroContentY = useTransform(heroScroll, [0, 1], ['0px', '-45px']);
  const heroOpacity = useTransform(heroScroll, [0, 0.85], [1, 0.2]);

  /* Mouse parallax */
  useEffect(() => {
    if ('ontouchstart' in window) return;
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /* Autoplay video */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => setVideoErr(true));
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="hero" className="relative select-none bg-[#07090E]">
      {/* ═══════════════════════════════════════════════════════════════
          STAGE 1: FULL-BLEED POSTER HERO (MATCHING USER IMAGE 2)
          ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden flex flex-col justify-between"
        style={{ height: '100svh', minHeight: '700px' }}
      >
        {/* Layer 0: Full-Bleed Video / Poster Background with Scroll Parallax */}
        <motion.div
          style={{ y: heroBgY, opacity: heroOpacity }}
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              transform: `translate(${mousePos.x * 0.03}px, ${mousePos.y * 0.03}px) scale(1.05)`,
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {!videoErr ? (
              <video
                ref={videoRef}
                src={INTRO_VIDEO}
                poster={FALLBACK_POSTER}
                loop
                muted
                playsInline
                onError={() => setVideoErr(true)}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.55) contrast(1.15) saturate(1.05)' }}
              />
            ) : (
              <img
                src={FALLBACK_POSTER}
                alt="Vice City Skyline"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.55) contrast(1.15) saturate(1.05)' }}
              />
            )}
          </div>
        </motion.div>

        {/* Layer 1: GTA VI Atmospheric Vignettes & Glow */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(7, 9, 14, 0.75) 0%, transparent 22%, transparent 68%, #07090E 100%)',
          }}
        />
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 65% 55% at ${50 + mousePos.x * 0.1}% ${45 + mousePos.y * 0.08}%, rgba(248, 177, 198, 0.16) 0%, rgba(251, 192, 134, 0.08) 45%, transparent 75%)`,
          }}
        />

        {/* Layer 2: Centerpiece with Parallax Drift (Matching Reference Screenshot 2) */}
        <motion.div
          style={{ y: heroContentY, opacity: heroOpacity }}
          className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-16"
        >
          {/* Eyebrow: WATCH */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-xs sm:text-sm font-bold tracking-[0.38em] uppercase text-white/70 mb-3"
          >
            WATCH
          </motion.span>

          {/* Monumental Headline: PRE-LOAD NOW */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-black uppercase tracking-tight text-center text-white leading-none mb-4"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)',
              textShadow: '0 4px 30px rgba(0,0,0,0.95)',
            }}
          >
            PRE-LOAD NOW
          </motion.h1>

          {/* Central 3D Metallic Chrome TWK Monogram (Centerpiece) with subtle breathing float */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              scale: [1, 1.015, 1],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative my-2 sm:my-3"
            style={{
              transform: `translate(${mousePos.x * -0.025}px, ${mousePos.y * -0.025}px)`,
              width: 'clamp(260px, 42vw, 560px)',
            }}
          >
            <img
              src={TWK_LOGO}
              alt="TWK Emblem"
              className="w-full h-auto object-contain mx-auto transition-transform duration-500 hover:scale-105"
              style={{
                filter:
                  'drop-shadow(0 0 50px rgba(248, 177, 198, 0.45)) drop-shadow(0 0 90px rgba(251, 192, 134, 0.25)) drop-shadow(0 8px 30px rgba(0,0,0,0.95))',
              }}
            />
          </motion.div>

          {/* Big Circular Glass Play Button with Radar Waves (Exact Match to Image 2) */}
          <div className="relative my-4 sm:my-5 flex items-center justify-center">
            {/* Outer radar pulse rings */}
            <span
              className="absolute inset-0 rounded-full border border-white/40 animate-ping pointer-events-none"
              style={{ animationDuration: '2.5s', animationIterationCount: 'infinite' }}
            />
            <span
              className="absolute -inset-3 rounded-full border border-[#F8B1C6]/30 animate-pulse pointer-events-none"
              style={{ animationDuration: '3.2s' }}
            />

            <button
              onClick={() => setActiveTrailer(trailers[0])}
              data-cursor="PLAY"
              data-cursor-tone="pink"
              aria-label="Play Trailer"
              className="group relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
              style={{
                background: 'rgba(255, 255, 255, 0.22)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255, 255, 255, 0.75)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.7), 0 0 35px rgba(248, 177, 198, 0.45)',
              }}
            >
              {/* Play Arrow Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-white ml-1 transition-transform duration-200 group-hover:scale-115 group-hover:translate-x-0.5"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Layer 3: Bottom Status Strip (Exact GTA VI Status Anatomy) */}
        <div className="relative z-20 border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div
            className="max-w-[1520px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ padding: '0.85rem clamp(1.25rem, 4vw, 3.5rem)' }}
          >
            {/* Left: Status */}
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#F8B1C6] animate-pulse" />
              <div className="flex flex-col">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40">
                  CURRENT STATUS
                </span>
                <span className="font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-white/90">
                  AVAILABLE FOR OPPORTUNITIES · CHENNAI &amp; REMOTE
                </span>
              </div>
            </div>

            {/* Center: Scroll Prompt */}
            <button
              onClick={scrollToProjects}
              data-cursor="EXPLORE"
              data-cursor-tone="peach"
              className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-white/60 hover:text-[#FBC086] transition-colors cursor-pointer"
            >
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="text-sm leading-none"
              >
                ↓
              </motion.span>
              <span>SCROLL TO EXPLORE</span>
            </button>

            {/* Right: HIRE NOW CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
                SIMATS 9.0 · IITM 8.0
              </span>
              <a
                href="mailto:shritenzin@gmail.com"
                data-cursor="HIRE"
                data-cursor-tone="pink"
                className="font-bold text-[11px] tracking-[0.08em] uppercase rounded-full px-4 py-1.5 transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{ background: '#F8B1C6', color: '#0B0E14' }}
              >
                HIRE NOW →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STAGE 2: THE OFFICIAL TRAILER CAROUSEL (MATCHING USER IMAGE 3)
          Top Card: "WATCH AN EXTENDED LOOK" ([▶ Play] pill)
          Bottom 3 Cards: "LAUNCH TRAILER", "TRAILER 2", "TRAILER 1"
          ═══════════════════════════════════════════════════════════════ */}
      <section
        id="trailers"
        className="relative overflow-hidden"
        style={{
          background: '#07090E',
          paddingTop: 'clamp(3rem, 6vw, 5rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        }}
      >
        <div
          className="max-w-[1520px] mx-auto"
          style={{ padding: '0 clamp(1.25rem, 4vw, 3.5rem)' }}
        >
          {/* Section Overline */}
          <div className="mb-6 sm:mb-8 flex items-center justify-between">
            <span className="font-mono text-xs font-semibold tracking-[0.28em] uppercase text-[#F8B1C6]">
              CINEMATIC ARCHIVES // 4K PRODUCTION REELS
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 hidden sm:inline-block">
              CLICK TO PLAY IN FULL RES
            </span>
          </div>

          {/* ── TOP FEATURED CARD: AN EXTENDED LOOK (Image 3 Top Card) ── */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard
              onClick={() => setActiveTrailer(trailers[0])}
              dataCursor="PLAY"
              dataCursorTone="pink"
              className="group relative w-full overflow-hidden mb-6 sm:mb-8 border border-white/10"
              style={{
                borderRadius: 'clamp(20px, 3.5vw, 32px)',
                minHeight: 'clamp(380px, 38vw, 480px)',
                background: '#0B0E14',
                boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
              }}
            >
              {/* Background Artwork */}
              <img
                src={trailers[0].poster}
                alt={trailers[0].title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ filter: 'brightness(0.8) contrast(1.1)' }}
              />
              {/* Radial Dark Mask */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 15% 35%, rgba(7, 9, 14, 0.95) 0%, rgba(7, 9, 14, 0.75) 45%, rgba(7, 9, 14, 0.2) 75%, transparent 100%)',
                }}
              />

              {/* Content Top-Left */}
              <div
                className="relative z-10 w-full h-full flex flex-col justify-between"
                style={{ padding: 'clamp(2rem, 5vw, 4rem)' }}
              >
                <div>
                  <span className="font-mono text-[11px] font-bold tracking-[0.3em] uppercase text-white/70 block mb-1">
                    WATCH
                  </span>
                  <h2
                    className="font-black uppercase text-white tracking-tight leading-[0.92] max-w-xl"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)',
                      textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                    }}
                  >
                    AN EXTENDED LOOK
                  </h2>
                  <p className="text-white/75 text-sm sm:text-base mt-2 max-w-md">
                    {trailers[0].subtitle}
                  </p>
                </div>

                {/* [ ▶ Play ] Pill Button (Exact Replica of Image 3) */}
                <div className="mt-6">
                  <div
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider text-black transition-all duration-300 group-hover:brightness-110 group-hover:shadow-lg"
                    style={{
                      background: '#FFFFFF',
                      boxShadow: '0 4px 20px rgba(255, 255, 255, 0.35)',
                    }}
                  >
                    <span>▶</span>
                    <span>Play</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* ── BOTTOM ROW: 3 TRAILER CARDS SIDE BY SIDE (Image 3 Bottom Row) ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {trailers.slice(1).map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard
                  onClick={() => setActiveTrailer(t)}
                  dataCursor="PLAY"
                  dataCursorTone="pink"
                  className="group relative w-full overflow-hidden border border-white/10"
                  style={{
                    borderRadius: 'clamp(20px, 3vw, 28px)',
                    minHeight: 'clamp(420px, 36vw, 480px)',
                    background: '#0B0E14',
                    boxShadow: '0 16px 50px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Background Artwork */}
                  <img
                    src={t.poster}
                    alt={t.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                    style={{ filter: 'brightness(0.8) contrast(1.1)' }}
                  />
                  {/* Gradient for Bottom Legibility */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(7, 9, 14, 0.95) 0%, rgba(7, 9, 14, 0.6) 40%, transparent 70%)',
                    }}
                  />

                  {/* Centered Glass Play Button (Image 3 circular play icon) */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="relative flex items-center justify-center">
                      <span
                        className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-0 group-hover:opacity-40 transition-opacity"
                        style={{ animationDuration: '1.8s' }}
                      />
                      <div
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(248,177,198,0.5)]"
                        style={{
                          background: 'rgba(255, 255, 255, 0.25)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          border: '1.5px solid rgba(255, 255, 255, 0.7)',
                          boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="text-white ml-0.5"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Title Content (Exact typography hierarchy from Image 3) */}
                  <div
                    className="absolute bottom-0 inset-x-0 z-10 p-6 flex flex-col items-center text-center"
                  >
                    <span className="font-mono text-[10px] font-bold tracking-[0.28em] uppercase text-white/70 block mb-1">
                      WATCH
                    </span>
                    <h3
                      className="font-black uppercase text-white tracking-tight leading-[0.92]"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                        textShadow: '0 2px 14px rgba(0,0,0,0.9)',
                      }}
                    >
                      {t.badge}
                    </h3>
                    <p className="text-white/60 text-xs mt-1.5 line-clamp-1 max-w-xs">
                      {t.subtitle}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FULLSCREEN VIDEO MODAL (PLAYING REAL 4K ASSETS)
          ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeTrailer && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl rounded-[28px] overflow-hidden border border-white/20 bg-[#0B0E14] shadow-2xl"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-black/60">
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#F8B1C6] tracking-widest uppercase">
                    OFFICIAL CINEMATIC TRAILER // 4K 60FPS
                  </span>
                  <h3
                    className="font-black text-lg sm:text-xl text-white uppercase"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {activeTrailer.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTrailer(null)}
                  data-cursor="CLOSE"
                  data-cursor-tone="pink"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Video Player */}
              <div className="relative w-full aspect-video bg-black">
                <video
                  ref={modalVideoRef}
                  src={activeTrailer.src}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-black/80 flex items-center justify-between">
                <span className="font-mono text-xs text-white/50 tracking-wider">
                  {activeTrailer.subtitle}
                </span>
                <button
                  onClick={() => setActiveTrailer(null)}
                  className="font-mono text-xs uppercase tracking-wider text-[#F8B1C6] hover:underline cursor-pointer"
                >
                  CLOSE PLAYER ✕
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}