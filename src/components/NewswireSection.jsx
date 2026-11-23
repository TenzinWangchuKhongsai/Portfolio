import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════
   NEWSWIRE SECTION — REPLICA OF GTA VI "newswire" (Featured News)
   Matches the horizontal news cards layout:
   - Header with "FEATURED NEWS / ACHIEVEMENTS" + "View all posts →"
   - Grid of cards with photo, date tag, bold title, and description
   - Clean dark styling with hover glow
   ═══════════════════════════════════════════════════════════════════ */

const newsItems = [
  {
    id: 'techstar',
    category: 'SIMATS ENGINEERING // COMPETITION',
    date: 'OCTOBER 2026',
    title: 'TECH STAR SUMMIT FIRST PRIZE WINNER',
    description:
      'Awarded first place at the annual Tech Star Summit technical symposium for engineering architecture, autonomous software design, and presentation.',
    image: '/me/Images/techstar_portrait_framed.jpg',
    badge: 'FIRST PRIZE',
    accent: '#FBC086',
  },
  {
    id: 'youthskills',
    category: 'NATIONAL CIVIC FORUM // LEADERSHIP',
    date: 'SEPTEMBER 2026',
    title: 'WORLD YOUTH SKILLS DAY & PARLIAMENT',
    description:
      'Selected student delegate representing engineering institutions, addressing technology literacy, youth skills development, and AI policy.',
    image: '/me/Images/beach_portrait_framed.jpg',
    badge: 'DELEGATE',
    accent: '#F8B1C6',
  },
  {
    id: 'iitm-foundation',
    category: 'IIT MADRAS // NATIONAL EXCELLENCE',
    date: 'ACADEMIC MILESTONE',
    title: 'IIT MADRAS BS DATA SCIENCE COMPLETED',
    description:
      'Successfully completed the Foundational Level tier of the BS in Data Science programme at IIT Madras with an 8.0 CGPA, mastering linear algebra and discrete statistics.',
    image: '/me/Images/vintage_pack.png',
    badge: 'CGPA 8.0',
    accent: '#FBC086',
  },
  {
    id: 'mun-hack',
    category: 'POLICY & RAPID PROTOTYPING',
    date: 'TECHNICAL COMPETITIONS',
    title: 'MODEL UNITED NATIONS & HACKATHONS',
    description:
      'Continuous participation in diplomatic debate formats, algorithmic hackathons, and multi-team software development sprints.',
    image: '/me/Images/mun_framed_ambient.jpg',
    badge: 'COMPETITOR',
    accent: '#F8B1C6',
  },
];

export default function NewswireSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="newswire"
      className="relative select-none"
      style={{
        background: '#080A0F',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
      }}
    >
      <div
        className="max-w-[1520px] mx-auto"
        style={{ padding: '0 clamp(1.25rem, 4vw, 3.5rem)' }}
      >
        {/* Header (Exact GTA VI "Featured News" + "View all posts" style) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="font-mono text-xs font-semibold tracking-[0.28em] uppercase text-[#F8B1C6] mb-2 block">
              VERIFIED MILESTONES // PUBLIC RECORD
            </span>
            <h2
              className="font-black uppercase text-white tracking-tight leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
              }}
            >
              FEATURED <span style={{ color: '#FBC086' }}>NEWSWIRE</span>
            </h2>
          </div>

          <a
            href="https://www.linkedin.com/in/tenzin-wangchu-khongsai-b31546399"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#FBC086] hover:text-white transition-colors"
          >
            <span>VIEW ALL ACHIEVEMENTS ON LINKEDIN</span>
            <span>→</span>
          </a>
        </div>

        {/* 4 Cards Grid (Exact GTA VI Newswire Card Format) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item, idx) => (
            <motion.div
              key={item.id}
              className="group flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/[0.08] transition-all duration-300 hover:border-white/20 hover:-translate-y-1.5"
              style={{
                background: '#0F131C',
                boxShadow: '0 12px 35px rgba(0,0,0,0.5)',
              }}
            >
              {/* Card Image */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/10' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ filter: 'brightness(0.92) contrast(1.05)' }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, #0F131C 0%, rgba(15, 19, 28, 0.4) 18%, transparent 45%)',
                  }}
                />
                <div className="absolute top-3 right-3">
                  <span
                    className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase"
                    style={{
                      background: 'rgba(8, 10, 15, 0.85)',
                      color: item.accent,
                      border: `1px solid ${item.accent}40`,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Card Text Content */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white/40 block mb-1">
                    {item.category}
                  </span>
                  <h3
                    className="font-black text-lg text-white uppercase leading-snug group-hover:text-[#FBC086] transition-colors"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed mt-2 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-white/40">
                  <span>{item.date}</span>
                  <span className="text-white group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

