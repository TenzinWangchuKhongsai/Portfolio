import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    title: 'PROGRAMMING LANGUAGES',
    color: '#FBC086',
    skills: [
      { name: 'Python', level: 4, note: 'Primary Language · AI & Systems' },
      { name: 'Java', level: 3, note: 'Object-Oriented Design & Android' },
      { name: 'C', level: 3, note: 'Low-Level Systems & Memory' },
      { name: 'JavaScript', level: 3, note: 'Web Engines & Event Loops' },
    ],
  },
  {
    title: 'WEB ARCHITECTURE',
    color: '#F8B1C6',
    skills: [
      { name: 'React', level: 3, note: 'Component State & Modern Hooks' },
      { name: 'Tailwind CSS', level: 4, note: 'Fluid Responsive Layouts' },
      { name: 'HTML5 / Modern DOM', level: 4, note: 'Semantic Architecture' },
      { name: 'REST APIs & Webhooks', level: 3, note: 'Integration Pipelines' },
    ],
  },
  {
    title: 'DATA SCIENCE & AI',
    color: '#FBC086',
    skills: [
      { name: 'NumPy & Pandas', level: 3, note: 'Data Munging & Vectorization' },
      { name: 'Probability & Statistics', level: 3, note: 'IIT Madras Rigorous Coursework' },
      { name: 'Machine Learning', level: 2, note: 'Supervised Models & Evaluators' },
      { name: 'Computer Vision', level: 2, note: 'OpenCV & Image Processing' },
    ],
  },
  {
    title: 'SYSTEMS & PLATFORMS',
    color: '#F8B1C6',
    skills: [
      { name: 'SQL & Relational DBMS', level: 3, note: 'Schema Design & Indexing' },
      { name: 'Git & GitHub Workflows', level: 3, note: 'Version Control & Releases' },
      { name: 'Finite Automata Theory', level: 3, note: 'State Machine Construction' },
      { name: 'IoT Protocols & Networks', level: 2, note: 'Sensor Simulation Models' },
    ],
  },
];

const achievements = [
  {
    idx: '01',
    title: 'TECH STAR SUMMIT WINNER',
    org: 'SIMATS Engineering College',
    tag: 'FIRST PRIZE',
    color: '#FBC086',
  },
  {
    idx: '02',
    title: 'MODEL UNITED NATIONS',
    org: 'International Affairs & Policy',
    tag: 'DELEGATE',
    color: '#F8B1C6',
  },
  {
    idx: '03',
    title: 'YOUTH PARLIAMENTS',
    org: 'National Civic Forums',
    tag: 'ACTIVE PARTICIPANT',
    color: '#FBC086',
  },
  {
    idx: '04',
    title: 'HACKATHONS & CODE MEETS',
    org: 'Engineering Project Competitions',
    tag: 'COMPETITOR',
    color: '#F8B1C6',
  },
  {
    idx: '05',
    title: 'IIT MADRAS FOUNDATIONAL',
    org: 'BS in Data Science Programme',
    tag: 'CGPA 8.0 COMPLETED',
    color: '#FBC086',
  },
];

function LevelDots({ level, activeColor }) {
  return (
    <div className="flex gap-1.5 items-center">
      {[1, 2, 3, 4].map((dot) => (
        <motion.span
          key={dot}
          initial={{ scale: 0.2, opacity: 0.2 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.35,
            delay: dot * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            background: dot <= level ? activeColor : 'rgba(255, 255, 255, 0.1)',
            boxShadow: dot <= level ? `0 0 8px ${activeColor}60` : 'none',
          }}
        />
      ))}
    </div>
  );
}

export default function TheLab() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="lab"
      className="relative select-none"
      style={{
        background: '#080A0F',
        paddingTop: 'clamp(5rem, 8vw, 8rem)',
        paddingBottom: 'clamp(5rem, 8vw, 8rem)',
      }}
    >
      <div
        className="max-w-[1520px] mx-auto"
        style={{ padding: '0 clamp(1.25rem, 4vw, 3.5rem)' }}
      >
        {/* ── Section Header ── */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            className="font-mono text-xs font-semibold tracking-[0.28em] uppercase text-[#F8B1C6] mb-3"
          >
            CHAPTER 04 // TECHNICAL ARSENAL
          </motion.div>

          <motion.h2
            className="font-black uppercase text-white tracking-tight leading-[0.88]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(3rem, 9vw, 7.5rem)',
            }}
          >
            SKILLS &amp; <span style={{ color: '#FBC086' }}>TOOLS</span>
          </motion.h2>

          <motion.p
            className="text-white/60 text-sm sm:text-base leading-relaxed mt-4 max-w-xl"
          >
            Transparent inventory of technical proficiency across languages, distributed frameworks, and data science tooling. Dots represent actual hands-on depth.
          </motion.p>
        </div>

        {/* ── 4-Column Skill Categories (GTA VI rounded card style) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              className="p-6 sm:p-7 rounded-[26px] border border-white/[0.08] flex flex-col justify-between transition-all duration-300 hover:border-white/20 hover:-translate-y-1.5"
              style={{ background: '#0F131C', boxShadow: '0 12px 35px rgba(0,0,0,0.5)' }}
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-t-2" style={{ borderColor: cat.color }}>
                  <h3
                    className="font-black text-lg text-white uppercase tracking-wider"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {cat.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-white tracking-wide">
                          {skill.name}
                        </span>
                        <LevelDots level={skill.level} activeColor={cat.color} />
                      </div>
                      <span className="font-mono text-[10px] text-white/40">
                        {skill.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Legend Strip ── */}
        <div className="mt-8 flex flex-wrap items-center gap-6 pt-4 border-t border-white/5">
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
            PROFICIENCY SCALE:
          </span>
          {[
            { dots: 1, label: 'EXPLORING' },
            { dots: 2, label: 'LEARNING' },
            { dots: 3, label: 'USING' },
            { dots: 4, label: 'PRIMARY' },
          ].map(({ dots, label }) => (
            <div key={label} className="flex items-center gap-2">
              <LevelDots level={dots} activeColor="#FBC086" />
              <span className="font-mono text-[10px] tracking-wider text-white/50">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Achievements & Recognition Strip ── */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="font-mono text-xs font-semibold tracking-[0.28em] uppercase text-[#F8B1C6] mb-6">
            VERIFIED ACHIEVEMENTS &amp; RECOGNITION
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {achievements.map((ach, idx) => (
              <motion.div
                key={ach.title}
                className="p-5 rounded-[20px] border border-white/[0.08] flex flex-col justify-between transition-all duration-300 hover:border-white/25 hover:-translate-y-1.5"
                style={{ background: '#0F131C', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/5">
                    <span className="font-mono text-[11px] tracking-[0.24em] font-bold text-white/50">
                      // {ach.idx}
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: ach.color }}
                    />
                  </div>
                  <h4
                    className="font-black text-base text-white uppercase leading-snug"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {ach.title}
                  </h4>
                  <p className="font-mono text-[10px] text-white/40 mt-1">
                    {ach.org}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-white/5">
                  <span
                    className="font-mono text-[9px] font-bold tracking-wider uppercase"
                    style={{ color: ach.color }}
                  >
                    {ach.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
