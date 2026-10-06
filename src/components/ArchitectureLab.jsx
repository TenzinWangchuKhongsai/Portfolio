import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Section3DModel from './Section3DModel';

/* ─── Architecture Data ─── */
const architectures = {
  'smart-office': {
    label: 'SMART OFFICE 7-LAYER IoT STACK',
    nodes: [
      { id: 'sensors', label: 'PIR / LUX SENSORS', type: 'PHYSICAL LAYER', desc: 'Distributed sensor nodes monitoring real-time occupancy, ambient lux, temperature, and CO2 in 20 zoned rooms.', x: 25, y: 40 },
      { id: 'coco', label: 'COCO-SSD / TF.JS', type: 'VISION ENGINE', desc: 'Real-time webcam human detection using TensorFlow.js with configurable confidence thresholds.', x: 185, y: 40 },
      { id: 'mqtt', label: 'MQTT BROKER', type: 'INGESTION BUS', desc: 'High-throughput pub/sub messaging broker with sub-50ms latency.', x: 345, y: 40 },
      { id: 'timeseries', label: 'SQLITE TIMESERIES', type: 'PERSISTENCE', desc: 'Time-series database storing historical environmental readings and occupancy states.', x: 80, y: 160 },
      { id: 'rules', label: 'ADAPTIVE RULES', type: 'HEURISTIC CORE', desc: 'Rule engine computing dynamic HVAC airflow CFM and multi-circuit lighting.', x: 235, y: 160 },
      { id: 'actuators', label: 'RELAYS & UI', type: 'EXECUTION & VIS', desc: 'Hardware relay controllers and real-time React facility dashboard.', x: 375, y: 160 },
    ],
    edges: [['sensors','coco'],['coco','mqtt'],['mqtt','timeseries'],['mqtt','rules'],['rules','actuators'],['timeseries','actuators']],
  },
  padho: {
    label: 'PADHO AUTOMATED CONTENT PIPELINE',
    nodes: [
      { id: 'rss', label: 'RSS WIRE FEEDS', type: 'INGESTION', desc: 'Automated polling engine fetching raw XML feeds every 15 minutes.', x: 25, y: 40 },
      { id: 'proc', label: 'NODE.JS PARSER', type: 'TRANSFORM', desc: 'Sanitizes raw HTML payloads and extracts clean article text.', x: 185, y: 40 },
      { id: 'gemini', label: 'GEMINI AI REWRITE', type: 'INTELLIGENCE', desc: 'LLM pipeline transforming articles into broadcast scripts.', x: 345, y: 40 },
      { id: 'tts', label: 'EDGE-TTS SYNTH', type: 'SPEECH SYNTH', desc: 'Deep learning speech synthesis with phoneme timing.', x: 80, y: 160 },
      { id: 'ffmpeg', label: 'FFMPEG COMPOSITOR', type: 'VIDEO ASSEMBLY', desc: 'Headless media assembler stitching audio, canvas, and 9:16 video.', x: 235, y: 160 },
      { id: 'client', label: 'REACT & DISPATCH', type: 'DELIVERY & WEB', desc: 'React dashboard, SQLite archive, and social distribution.', x: 375, y: 160 },
    ],
    edges: [['rss','proc'],['proc','gemini'],['gemini','tts'],['tts','ffmpeg'],['ffmpeg','client'],['gemini','client']],
  },
  'career-agent': {
    label: 'CAREER AGENT EVIDENCE ENGINE',
    nodes: [
      { id: 'resume', label: 'RESUME AST', type: 'INPUT SCHEMA', desc: 'Parses candidate PDF into structured JSON with verified skill taxonomy.', x: 25, y: 40 },
      { id: 'intel', label: 'OPPORTUNITY ENGINE', type: 'ROLE MATCH', desc: 'Evaluates technology stack overlap against job requirements.', x: 185, y: 40 },
      { id: 'evidence', label: 'EVIDENCE GATE', type: 'VERIFICATION', desc: 'Deterministic checkpoint ensuring assertions bind to verifiable evidence.', x: 345, y: 40 },
      { id: 'dnc', label: 'SCOPED DNC', type: 'SUPPRESSION', desc: 'Email, Domain, and Company DNC enforcement.', x: 80, y: 160 },
      { id: 'gemini', label: 'GEMINI 1.5 FLASH', type: 'SYNTHESIS', desc: 'Drafts outreach citing concrete verified experience.', x: 235, y: 160 },
      { id: 'queue', label: 'APPROVAL QUEUE', type: 'AUDIT & SEND', desc: 'Immutable audit snapshot awaiting user authorization.', x: 375, y: 160 },
    ],
    edges: [['resume','intel'],['intel','evidence'],['evidence','gemini'],['evidence','dnc'],['dnc','gemini'],['gemini','queue']],
  },
};

function ArchDiagram({ arch, activeNode, setActiveNode }) {
  const nodeMap = {};
  arch.nodes.forEach((n) => { nodeMap[n.id] = n; });

  const getDownstream = (nodeId) => {
    const downstream = new Set();
    const queue = [nodeId];
    while (queue.length > 0) {
      const current = queue.shift();
      arch.edges.forEach(([from, to]) => {
        if (from === current && !downstream.has(to)) {
          downstream.add(to);
          queue.push(to);
        }
      });
    }
    return downstream;
  };

  const downstreamSet = activeNode ? getDownstream(activeNode) : new Set();

  return (
    <svg viewBox="0 0 490 270" className="w-full max-w-2xl mx-auto" style={{ overflow: 'visible' }}>
      {arch.edges.map(([fromId, toId], i) => {
        const from = nodeMap[fromId];
        const to = nodeMap[toId];
        if (!from || !to) return null;
        const isActive = activeNode === fromId || (activeNode && downstreamSet.has(toId) && (fromId === activeNode || downstreamSet.has(fromId)));
        return (
          <g key={i}>
            <line
              x1={from.x + 44}
              y1={from.y + 20}
              x2={to.x + 44}
              y2={to.y + 20}
              stroke={isActive ? 'var(--copper)' : 'rgba(140,137,130,0.2)'}
              strokeWidth={isActive ? 1.75 : 0.75}
              className={isActive ? 'arch-line' : ''}
              style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
            />
            {isActive && (
              <circle
                r="3"
                fill="#E89052"
                className="drop-shadow-[0_0_8px_#D97736]"
              >
                <animateMotion
                  path={`M ${from.x + 44} ${from.y + 20} L ${to.x + 44} ${to.y + 20}`}
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        );
      })}

      {arch.nodes.map((node) => {
        const isActive = activeNode === node.id;
        const isDown = downstreamSet.has(node.id);
        const hl = isActive || isDown;
        return (
          <g key={node.id} className="arch-node cursor-pointer"
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
            onClick={() => setActiveNode(isActive ? null : node.id)}>
            <rect x={node.x} y={node.y} width={88} height={42} rx={6}
              fill={hl ? 'rgba(217,119,54,0.18)' : 'rgba(17,19,22,0.92)'}
              stroke={hl ? 'var(--copper)' : 'rgba(140,137,130,0.25)'}
              strokeWidth={hl ? 1.6 : 0.75}
              className={hl ? 'drop-shadow-[0_0_12px_rgba(217,119,54,0.3)]' : ''}
              style={{ transition: 'all 0.3s ease' }} />
            <text x={node.x+44} y={node.y+17} textAnchor="middle"
              fill={hl ? 'var(--ivory)' : 'var(--ivory-muted)'}
              fontSize="6.5" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.04em"
              style={{ transition: 'fill 0.3s' }}>
              {node.label}
            </text>
            <text x={node.x+44} y={node.y+31} textAnchor="middle"
              fill={hl ? 'var(--copper-light)' : 'var(--copper)'}
              fontSize="5.5" fontFamily="'JetBrains Mono',monospace" letterSpacing="0.08em"
              style={{ transition: 'fill 0.3s' }}>
              {node.type}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function ArchitectureLab() {
  const [activeTab, setActiveTab] = useState('smart-office');
  const [activeNode, setActiveNode] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const currentArch = architectures[activeTab];
  const activeNodeData = activeNode ? currentArch.nodes.find((n) => n.id === activeNode) : null;

  return (
    <section ref={sectionRef} id="architecture" className="snap-section section-dark py-16 sm:py-20 relative noise">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="scene-pad max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}
          className="mb-4 text-[10px] text-[var(--copper)] font-semibold font-mono tracking-[0.2em]">
          CHAPTER 02 — ARCHITECTURE
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-editorial text-[var(--ivory)] mb-10 font-serif">
          HOW THE IDEAS<br />
          <span className="italic text-[var(--text-secondary)]">BECOME ARCHITECTURES.</span>
        </motion.h2>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-5 sm:gap-6 mb-8 text-meta">
          {[
            { key: 'smart-office', label: 'SMART OFFICE' },
            { key: 'padho', label: 'NEWSROOM' },
            { key: 'career-agent', label: 'CAREER AGENT' },
          ].map(tab => (
            <button key={tab.key}
              onClick={() => { setActiveTab(tab.key); setActiveNode(null); }}
              className={`pb-1.5 transition-colors duration-300 font-semibold text-[10px] tracking-wider ${
                activeTab === tab.key
                  ? 'text-[var(--copper)] border-b-2 border-[var(--copper)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--ivory)]'
              }`}
              data-cursor="EXPLORE">
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Diagram & Exploded 3D Glass Stack Side-by-Side */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }} className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-7">
            <div className="mb-4 text-[10px] font-mono text-[var(--text-secondary)] flex items-center justify-between">
              <span className="text-[var(--ivory)] font-semibold">{currentArch.label}</span>
              <span className="text-[var(--text-tertiary)] hidden sm:block">HOVER NODES TO INSPECT</span>
            </div>

            <div className="py-2">
              <ArchDiagram arch={currentArch} activeNode={activeNode} setActiveNode={setActiveNode} />
            </div>
          </div>

          {/* Exploded 3D Refractive Glass Architecture Stack (Main reference video.mp4) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full h-[320px] rounded-2xl glass-panel border border-white/10 overflow-hidden relative">
              <div className="absolute top-3 left-3 z-10 font-mono text-[9px] text-[#E89052] tracking-widest uppercase">
                3D EXPLODED GLASS STACK
              </div>
              <Section3DModel type={activeTab === 'career-agent' ? 'radar' : 'office'} selectedNode={activeNode} />
            </div>
          </div>

          <div className="lg:col-span-12 min-h-[60px] mt-3 border-t border-[var(--border)] pt-4">
            {activeNodeData ? (
              <motion.div key={activeNodeData.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                <div className="flex items-baseline gap-3 mb-1 font-mono">
                  <span className="text-xs text-[var(--copper)] font-bold">{activeNodeData.label}</span>
                  <span className="text-xs text-[var(--text-secondary)]">[{activeNodeData.type}]</span>
                </div>
                <p className="text-sm text-[var(--ivory)] leading-relaxed max-w-xl font-sans">{activeNodeData.desc}</p>
              </motion.div>
            ) : (
              <p className="text-[10px] font-mono text-[var(--text-secondary)]">
                SELECT ANY NODE TO INSPECT SUBSYSTEM DETAILS
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

