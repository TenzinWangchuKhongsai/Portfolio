import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Typographic Skills Arena ─── */
const skills = [
  { text: 'PYTHON', size: 'text-4xl sm:text-6xl lg:text-7xl', style: 'font-serif font-bold text-[#0B0D0F]' },
  { text: 'JAVA', size: 'text-3xl sm:text-5xl lg:text-6xl', style: 'font-mono text-[#4A5260]' },
  { text: 'JAVASCRIPT', size: 'text-4xl sm:text-6xl lg:text-7xl', style: 'font-serif italic text-[#D97736]' },
  { text: 'ANDROID', size: 'text-3xl sm:text-5xl lg:text-6xl', style: 'font-mono font-semibold text-[#0B0D0F]' },
  { text: 'MACHINE LEARNING', size: 'text-2xl sm:text-4xl lg:text-5xl', style: 'font-serif text-[#242830]' },
  { text: 'COMPUTER VISION', size: 'text-2xl sm:text-4xl lg:text-5xl', style: 'font-serif italic text-[#4A5260]' },
  { text: 'SYSTEM DESIGN', size: 'text-3xl sm:text-5xl lg:text-6xl', style: 'font-mono text-[#0B0D0F]' },
  { text: 'SQL', size: 'text-3xl sm:text-5xl', style: 'font-mono text-[#D97736]' },
  { text: 'HTML / CSS', size: 'text-2xl sm:text-4xl', style: 'font-serif text-[#4A5260]' },
  { text: 'C', size: 'text-3xl sm:text-5xl', style: 'font-mono text-[#0B0D0F]' },
  { text: 'PANDAS', size: 'text-2xl sm:text-4xl', style: 'font-mono text-[#525B6A]' },
  { text: 'NUMPY', size: 'text-2xl sm:text-4xl', style: 'font-mono text-[#525B6A]' },
  { text: 'STATISTICS', size: 'text-2xl sm:text-4xl', style: 'font-serif italic text-[#0B0D0F]' },
  { text: 'AUTOMATION', size: 'text-3xl sm:text-5xl', style: 'font-mono text-[#D97736]' },
];

export default function EditorialIdentity() {
  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  const skillsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const galleryInView = useInView(galleryRef, { once: true, amount: 0.15 });

  return (
    <section id="identity" className="snap-section section-light relative bg-[#F5F2EC] text-[#0B0D0F] overflow-hidden">
      
      {/* ─── Hero: Portrait + Identity Statement ─── */}
      <div ref={heroRef} className="scene-pad py-16 sm:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Typography & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-[10px] text-[#7A6B58] tracking-[0.2em] font-semibold uppercase"
            >
              CHAPTER 04 // THE HUMAN BUILDER
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-7xl xl:text-8xl text-[#0B0D0F] leading-[0.86] tracking-tight"
            >
              I BUILD TO<br />
              <span className="italic text-[#D97736]">UNDERSTAND.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4 max-w-xl"
            >
              <div className="w-12 h-0.5 bg-[#D97736]" />
              <p className="font-sans text-base sm:text-lg text-[#242830] leading-relaxed">
                Engineering student concurrently studying Computer Science & Engineering at SIMATS while pursuing foundational Data Science with IIT Madras.
              </p>
              <p className="font-sans text-sm text-[#4A5260] leading-relaxed">
                True understanding is earned by building from first principles — offline-first database pipelines, neural newsrooms, computer vision engines, and rigid body physics from mathematical vectors.
              </p>
            </motion.div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 font-mono text-[10px] text-[#525B6A] pt-2">
              <div>
                <span className="text-[#A39682] block text-[9px]">LOCATION</span>
                <span className="font-semibold text-[#0B0D0F]">CHENNAI, INDIA</span>
              </div>
              <div>
                <span className="text-[#A39682] block text-[9px]">FOCUS</span>
                <span className="font-semibold text-[#0B0D0F]">SYSTEMS · DATA · AUTOMATION</span>
              </div>
              <div>
                <span className="text-[#A39682] block text-[9px]">ACADEMIC</span>
                <span className="font-semibold text-[#0B0D0F]">SIMATS (9.0) · IIT MADRAS (8.0)</span>
              </div>
            </div>
          </div>

          {/* Right: Large Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[440px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-black/8 bg-[#E8E2D8]">
              <img
                src="/me/WhatsApp Image 2026-08-24 at 7.07.27 PM.jpeg"
                alt="Tenzin Wangchu Khongsai"
                className="w-full h-full object-cover object-center contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between font-mono text-[10px] text-white">
                <div>
                  <div className="font-bold tracking-wider">TENZIN WANGCHU KHONGSAI</div>
                  <div className="text-[9px] text-white/70">SIMATS ENGINEERING</div>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#D97736]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Documentary Photography + Academics (compact 2-in-1) ─── */}
      <div ref={galleryRef} className="scene-pad py-12 max-w-7xl mx-auto border-t border-black/8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={galleryInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="font-mono text-[10px] text-[#7A6B58] tracking-widest uppercase mb-6">
            EVIDENCE // RECOGNITION & ACADEMICS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            
            {/* Photo 01: Award */}
            <div className="md:col-span-5">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-black/8">
                <img
                  src="/me/WhatsApp Image 2026-08-24 at 7.04.07 PM.jpeg"
                  alt="Tech Star Summit Award"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 font-mono text-[9px] bg-black/70 backdrop-blur text-white px-2.5 py-1 rounded">
                  TECH STAR SUMMIT · SIMATS
                </div>
              </div>
            </div>

            {/* Photo 02 + Text */}
            <div className="md:col-span-3">
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-md border border-black/8">
                <img
                  src="/me/WhatsApp Image 2026-09-16 at 9.38.38 PM.jpeg"
                  alt="World Youth Skills Day"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 font-mono text-[9px] bg-black/70 backdrop-blur text-white px-2.5 py-1 rounded">
                  YOUTH SKILLS DAY
                </div>
              </div>
            </div>

            {/* Academic Cards */}
            <div className="md:col-span-4 space-y-4">
              <div className="p-5 rounded-xl bg-white/70 border border-black/5 shadow-sm">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#D97736] mb-2">
                  <span>B.E. COMPUTER SCIENCE</span>
                  <span className="font-bold px-1.5 py-0.5 rounded bg-[#D97736]/12">9.0</span>
                </div>
                <h3 className="font-serif text-xl text-[#0B0D0F] font-bold mb-1">SIMATS Engineering</h3>
                <p className="text-xs text-[#4A5260] leading-relaxed">
                  Data Structures, Systems Architecture, Computer Networks, IoT Platforms. Expected 2029.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/70 border border-black/5 shadow-sm">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#D97736] mb-2">
                  <span>BS DATA SCIENCE</span>
                  <span className="font-bold px-1.5 py-0.5 rounded bg-[#D97736]/12">8.0</span>
                </div>
                <h3 className="font-serif text-xl text-[#0B0D0F] font-bold mb-1">IIT Madras</h3>
                <p className="text-xs text-[#4A5260] leading-relaxed">
                  Linear Algebra, Computational Statistics, Discrete Mathematics, Algorithmic Thinking.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── Typographic Skills Arena — Kinetic Infinite Marquee ─── */}
      <div ref={skillsRef} className="py-14 border-t border-black/8 overflow-hidden">
        <div className="scene-pad max-w-7xl mx-auto font-mono text-[10px] text-[#7A6B58] tracking-widest uppercase mb-6">
          TECHNICAL REPERTOIRE
        </div>

        <div className="flex overflow-hidden whitespace-nowrap select-none">
          <motion.div
            animate={{ x: [0, -1800] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="flex items-baseline gap-x-8 pr-8"
          >
            {skills.concat(skills).map((s, idx) => (
              <span
                key={idx}
                className={`${s.size} ${s.style} tracking-tight hover:text-[#D97736] hover:scale-105 transition-all cursor-pointer inline-block`}
              >
                {s.text}
                <span className="text-black/15 ml-8">/</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
