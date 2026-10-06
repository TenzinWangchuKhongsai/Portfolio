import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function TheLab() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <section ref={sectionRef} id="lab" className="snap-section section-dark py-16 sm:py-20 relative noise">
      {/* Copper ambient atmosphere */}
      <div className="absolute inset-0 ambient-copper opacity-60 pointer-events-none" />

      <div className="scene-pad relative z-10 max-w-6xl mx-auto">
        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-3 text-[10px] text-[var(--copper)] font-semibold font-mono tracking-[0.2em]"
          >
            CHAPTER 04 — EXPERIMENTAL ARCHIVE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-[var(--ivory)] font-serif leading-[0.95]"
          >
            THE<br />
            <span className="italic text-[var(--text-secondary)]">LAB.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base text-[var(--ivory-muted)] mt-4 leading-relaxed max-w-xl"
          >
            Software experiments, network topologies, and computational explorations built from first principles. Click any card for FLIP expanded execution view.
          </motion.p>
        </div>

        {/* ─── 3 experiments with FLIP layout expansion (reference video (1).mp4) ─── */}
        <div className="space-y-10">

          {/* 01: VISIONFRAME */}
          <motion.div
            layout
            onClick={() => setExpandedCard(expandedCard === 'vision' ? null : 'vision')}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className={`border-t border-[var(--border)] pt-6 cursor-pointer transition-colors ${
              expandedCard === 'vision' ? 'bg-[#14171D]/90 p-6 rounded-2xl border-[var(--copper)]' : ''
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-2 mb-2 font-mono text-[10px]">
                  <span className="text-[var(--copper)] font-bold">01</span>
                  <span className="text-[var(--text-secondary)] tracking-wider">COMPUTER VISION</span>
                  {expandedCard === 'vision' && <span className="text-[#E89052] font-bold ml-auto">[FLIP EXPANDED]</span>}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[var(--ivory)] mb-2 leading-tight">
                  VISIONFRAME — CAMERA & VIDEO ENGINE
                </h3>
                <div className="text-[10px] font-mono text-[var(--copper-light)] mb-3">
                  PYTHON · OPENCV · NUMPY · MULTI-FORMAT
                </div>
                <p className="text-xs text-[var(--ivory-muted)] leading-relaxed">
                  Modular real-time video processing with frame-by-frame spatial convolutions, edge detection, and headless stream extraction.
                </p>
              </div>

              <div className="lg:col-span-8 bg-[#14171D] p-4 rounded-lg border border-white/5 font-mono text-[10px] space-y-2">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[var(--copper)] font-bold">STREAM PIPELINE SPEC</span>
                  <span className="text-emerald-400">30 FPS · OPENCV 4.x</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 bg-black/40 rounded border border-white/5">
                    <div className="text-[var(--ivory)] font-bold">FRAME INGEST</div>
                    <div className="text-[var(--text-secondary)] text-[9px] mt-0.5">cv2.VideoCapture(0)</div>
                    <div className="text-[var(--copper-light)] text-[9px]">1080p Stream</div>
                  </div>
                  <div className="p-2.5 bg-black/40 rounded border border-white/5">
                    <div className="text-[var(--ivory)] font-bold">SPATIAL TRANSFORM</div>
                    <div className="text-[var(--text-secondary)] text-[9px] mt-0.5">Gaussian & Sobel</div>
                    <div className="text-[var(--copper-light)] text-[9px]">NumPy Convolution</div>
                  </div>
                  <div className="p-2.5 bg-black/40 rounded border border-white/5">
                    <div className="text-[var(--ivory)] font-bold">ENCODING SINK</div>
                    <div className="text-[var(--text-secondary)] text-[9px] mt-0.5">cv2.VideoWriter(H.264)</div>
                    <div className="text-emerald-400 text-[9px]">Ring Buffer</div>
                  </div>
                </div>

                {expandedCard === 'vision' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-3 border-t border-white/10 space-y-2">
                    <div className="text-[var(--copper)] font-bold">LIVE FRAME BUFFER MEMORY SPECS</div>
                    <div className="p-3 bg-black/60 rounded text-[9px] text-white/70 space-y-1">
                      <div>Matrix Dim: 1920 × 1080 × 3 (BGR24)</div>
                      <div>Ring Buffer Capacity: 120 Frames (4.0s depth)</div>
                      <div>Kernel: 3×3 Sobel Gradient [x_weight: 0.5, y_weight: 0.5]</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* 02: SMART CAMPUS NETWORK */}
          <motion.div
            layout
            onClick={() => setExpandedCard(expandedCard === 'campus' ? null : 'campus')}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className={`border-t border-[var(--border)] pt-6 cursor-pointer transition-colors ${
              expandedCard === 'campus' ? 'bg-[#14171D]/90 p-6 rounded-2xl border-[var(--copper)]' : ''
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <span className="text-[var(--copper)] font-bold">02</span>
                  <span className="text-[var(--text-secondary)] tracking-wider">NETWORK ARCHITECTURE</span>
                  {expandedCard === 'campus' && <span className="text-[#E89052] font-bold ml-auto">[FLIP EXPANDED]</span>}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[var(--ivory)] leading-tight">
                  SMART CAMPUS NETWORK
                </h3>
                <div className="text-[10px] font-mono text-[var(--copper-light)]">
                  CISCO · VLAN 802.1Q · ACL
                </div>
                <p className="text-xs text-[var(--ivory-muted)] leading-relaxed">
                  Hierarchical campus network with multi-VLAN segmentation, router-on-a-stick subinterfaces, DHCP pools, and firewall ACLs.
                </p>
                <div className="flex flex-wrap gap-1.5 text-[9px] font-mono text-[var(--text-secondary)]">
                  <span className="px-1.5 py-0.5 rounded bg-white/5">802.1Q Trunking</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5">Subinterfaces</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5">ACL Isolation</span>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="rounded-lg overflow-hidden border border-[var(--border)] bg-black/60 p-2.5">
                  <div className="aspect-[16/10] overflow-hidden rounded bg-black">
                    <img
                      src="/projects/smart-campus/topology.jpeg"
                      alt="Smart Campus Network Topology"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-[var(--copper)] font-semibold">VERIFIED PACKET TRACER TOPOLOGY</span>
                    <span className="text-[var(--text-tertiary)]">VLAN ROUTING</span>
                  </div>

                  {expandedCard === 'campus' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pt-3 border-t border-white/10 font-mono text-[9px] text-white/70 space-y-1">
                      <div>VLAN 10: Faculty Data (192.168.10.0/24)</div>
                      <div>VLAN 20: Student Wi-Fi (192.168.20.0/24)</div>
                      <div>VLAN 30: IoT Sensor Mesh (192.168.30.0/24)</div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 03: CPU SCHEDULER */}
          <motion.div
            layout
            onClick={() => setExpandedCard(expandedCard === 'cpu' ? null : 'cpu')}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            className={`border-t border-[var(--border)] pt-6 cursor-pointer transition-colors ${
              expandedCard === 'cpu' ? 'bg-[#14171D]/90 p-6 rounded-2xl border-[var(--copper)]' : ''
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <span className="text-[var(--copper)] font-bold">03</span>
                  <span className="text-[var(--text-secondary)] tracking-wider">OPERATING SYSTEMS</span>
                  {expandedCard === 'cpu' && <span className="text-[#E89052] font-bold ml-auto">[FLIP EXPANDED]</span>}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[var(--ivory)] leading-tight">
                  EDGE-AWARE CPU SCHEDULER
                </h3>
                <div className="text-[10px] font-mono text-[var(--copper-light)]">
                  C / PYTHON · GANTT TIMELINE
                </div>
                <p className="text-xs text-[var(--ivory-muted)] leading-relaxed">
                  Process scheduling simulation benchmarking greedy edge-aware algorithms against FCFS, SJF, and Round Robin.
                </p>
                <div className="p-2.5 rounded bg-[#14171D] border border-white/5 font-mono text-[10px]">
                  <div className="text-[var(--copper)] font-bold">HEURISTIC METRIC</div>
                  <div className="text-[var(--ivory-muted)] text-[9px] mt-1">
                    Priority = (Burst × Deadline) / (IO Wait + 1)
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-[#14171D] border border-white/5 font-mono space-y-1.5">
                  <div className="text-[10px] text-[var(--copper)] font-bold">04 // GRAPH TOPOLOGY</div>
                  <div className="font-serif text-base text-[var(--ivory)]">Network Mesh & Packets</div>
                  <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                    Dijkstra and Bellman-Ford shortest-path simulations with dynamic congestion modeling.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-[#14171D] border border-white/5 font-mono space-y-1.5">
                  <div className="text-[10px] text-[var(--copper)] font-bold">05 // SENSOR TELEMETRY</div>
                  <div className="font-serif text-base text-[var(--ivory)]">Microcontroller Signals</div>
                  <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                    Hardware interrupt handling, PIR debounce, and serial packet telemetry for facility automation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

