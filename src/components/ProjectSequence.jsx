import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Section3DModel from './Section3DModel';

/* ═══════════════════════════════════════════════════════════════════
   ENVIRONMENT 01: AURA — MASSIVE DEVICE SHOWCASE
   Visual centerpiece: giant phone mockup ~50% viewport width
   Typography overlapping the device, tech metadata around perimeter
   ═══════════════════════════════════════════════════════════════════ */

function AuraEnvironment() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [activeTab, setActiveTab] = useState('compose');
  const [tasks, setTasks] = useState([
    { id: 1, time: '09:00', title: 'Systems Programming Lab', tag: 'ACADEMIC', status: 'COMMITTED' },
    { id: 2, time: '13:00', title: 'OS Scheduling', tag: 'CS CORE', status: 'COMMITTED' },
    { id: 3, time: '16:00', title: 'AURA Architecture', tag: 'BUILD', status: 'COMMITTED' },
  ]);
  const [nlInput, setNlInput] = useState('');

  const addTask = () => {
    const newTask = { id: tasks.length + 1, time: '19:30', title: 'Distributed Systems Audit', tag: 'RESEARCH', status: 'PENDING' };
    setTasks(prev => [...prev, newTask]);
    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === newTask.id ? { ...t, status: 'COMMITTED' } : t));
    }, 400);
  };

  const parseNL = () => {
    if (!nlInput.trim()) return;
    const t = { id: tasks.length + 1, time: 'Tomorrow', title: nlInput, tag: 'AI_PARSED', status: 'COMMITTED' };
    setTasks(prev => [...prev, t]);
    setNlInput('');
  };

  return (
    <div ref={ref} className="relative min-h-screen bg-gradient-to-b from-[#0B0907] via-[#120F0C] to-[#08090C] overflow-hidden">
      {/* Atmospheric glow behind device */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_50%_50%,rgba(217,119,54,0.08),transparent_70%)] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-[1800px] mx-auto min-h-screen flex items-center"
      >
        {/* ─── COMPOSITION: Device centered, text overlapping from left ─── */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center px-6 sm:px-10 py-10 gap-4 lg:gap-0">
          
          {/* Left overlapping text block */}
          <div className="lg:col-span-5 lg:relative lg:z-20 space-y-5">
            <div className="font-mono text-[10px] text-[#E89052] tracking-[0.2em]">PROJECT 01 // ANDROID PRODUCTIVITY ECOSYSTEM</div>
            <h2 className="font-serif text-6xl sm:text-8xl lg:text-[9rem] text-white leading-[0.82] tracking-tight">
              AU<span className="italic text-[#E89052]">RA</span>
            </h2>
            <p className="font-sans text-sm text-white/60 leading-relaxed max-w-md">
              Local-first Android scheduling system. Kotlin ViewModel + StateFlow reactive pipeline, Room SQLite persistence, WorkManager background sync, and Gemini natural language schedule parsing.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['KOTLIN', 'COMPOSE', 'STATEFLOW', 'ROOM DB', 'WORKMANAGER', 'GEMINI'].map(t => (
                <span key={t} className="px-2 py-0.5 bg-[#D97736]/10 border border-[#D97736]/25 rounded text-[9px] font-mono text-[#E89052]">{t}</span>
              ))}
            </div>
            
            {/* Architecture flow — compact vertical */}
            <div className="space-y-1 pt-4 border-t border-white/10">
              <div className="font-mono text-[9px] text-[#E89052] tracking-widest">REACTIVE PIPELINE</div>
              {[
                'USER INTENT → ViewModel',
                'StateFlow.update{} → Compose',
                'Room DAO → SQLite ACID',
                'WorkManager → Background Sync',
                'Gemini → NL Parse → Entity',
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] font-mono text-white/50">
                  <span className="text-[#E89052] font-bold w-4">{i + 1}.</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center + Right: 3D Smartphone Domain Model + App UI Container */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-6">
            <div className="w-[280px] sm:w-[320px] hidden sm:block">
              <Section3DModel type="smartphone" />
            </div>

            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-[320px] sm:w-[380px] lg:w-[420px] rounded-[42px] p-4 bg-[#14110E] border-2 border-white/12 shadow-[0_40px_120px_rgba(217,119,54,0.2),0_0_0_1px_rgba(217,119,54,0.05)]"
            >
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-3" />
              <div className="rounded-[28px] bg-gradient-to-b from-[#181410] to-[#0E0C0A] border border-white/8 p-5 min-h-[520px] sm:min-h-[580px] flex flex-col">
                
                {/* Tabs */}
                <div className="flex gap-1 mb-4 p-1.5 bg-black/40 rounded-xl">
                  {['compose', 'room', 'flow'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                        activeTab === tab ? 'bg-[#D97736] text-white font-bold' : 'text-white/50 hover:text-white/70'
                      }`}>{tab.toUpperCase()}</button>
                  ))}
                </div>

                {activeTab === 'compose' && (
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                      <div className="font-serif text-base text-white">Today's Schedule</div>
                      <button onClick={addTask} className="px-3 py-1 rounded-lg bg-[#D97736]/20 text-[#E89052] text-[10px] font-mono cursor-pointer hover:bg-[#D97736]/30">+ ADD</button>
                    </div>
                    <div className="space-y-2 flex-1 overflow-y-auto max-h-[280px]">
                      {tasks.map(t => (
                        <motion.div key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between items-center">
                          <div>
                            <div className="text-[10px] font-mono text-[#E89052]">{t.time}</div>
                            <div className="text-sm text-white/90 mt-0.5">{t.title}</div>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-white/60">{t.tag}</span>
                            <div className={`text-[9px] font-mono mt-1 ${t.status === 'COMMITTED' ? 'text-emerald-400' : 'text-amber-400'}`}>{t.status}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="text-[9px] font-mono text-white/30 mb-2">GEMINI NL PARSER</div>
                      <div className="flex gap-2">
                        <input value={nlInput} onChange={e => setNlInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && parseNL()}
                          placeholder="e.g. Meet mentor at 3pm" className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-[11px] text-white placeholder-white/25 focus:outline-none focus:border-[#D97736]" />
                        <button onClick={parseNL} className="px-3 py-2 rounded-lg bg-[#D97736] text-white text-[10px] font-mono font-bold cursor-pointer hover:bg-[#E89052]">PARSE</button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'room' && (
                  <pre className="text-[11px] font-mono text-white/70 overflow-x-auto p-3 bg-black/40 rounded-xl flex-1">
{`@Entity(tableName = "aura_tasks")
data class TaskEntity(
  @PrimaryKey(autoGenerate = true)
  val id: Long = 0,
  val title: String,
  val timestamp: Long,
  val priority: String,
  val syncState: SyncState
)

@Dao
interface TaskDao {
  @Query("SELECT * FROM aura_tasks ORDER BY timestamp ASC")
  fun observe(): Flow<List<TaskEntity>>

  @Insert(onConflict = REPLACE)
  suspend fun upsert(task: TaskEntity)
}`}
                  </pre>
                )}

                {activeTab === 'flow' && (
                  <div className="space-y-2.5 flex-1">
                    {['USER INTENT → ViewModel', 'StateFlow.update{} → Compose', 'Room DAO → SQLite ACID', 'WorkManager → Sync', 'Gemini → NL Parse'].map((s, i) => (
                      <div key={i} className="p-3 rounded-xl bg-black/30 border border-white/5 text-[11px] font-mono text-white/70 flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#D97736]/20 flex items-center justify-center text-[#E89052] font-bold text-[10px]">{i + 1}</span>
                        {s}
                      </div>
                    ))}
                  </div>
                )}

                <div className="w-28 h-1 bg-white/15 rounded-full mx-auto mt-4" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   ENVIRONMENT 02: PADHO NEWS — VERTICAL VIDEO HERO CENTER
   Composition: Large 9:16 video dominates center, editorial info wraps around
   ═══════════════════════════════════════════════════════════════════ */

function PadhoEnvironment() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStage, setActiveStage] = useState(2);
  const videoRef = useRef(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) { videoRef.current.pause(); } else { videoRef.current.play(); }
      setIsPlaying(!isPlaying);
    }
  };

  const stages = [
    { name: 'RSS INGESTION', desc: 'Polls national feeds every 15m', icon: '📡' },
    { name: 'GEMINI REWRITE', desc: 'Transforms articles into broadcast scripts', icon: '✍️' },
    { name: 'EDGE-TTS VOICE', desc: 'Neural speech synthesis with prosody', icon: '🎙️' },
    { name: 'FFMPEG RENDER', desc: '9:16 vertical reels with subtitle overlay', icon: '🎬' },
    { name: 'SQLITE QUEUE', desc: 'Automated dispatch tracking & scheduling', icon: '📦' },
  ];

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Full-bleed newsroom backdrop */}
      <div className="absolute inset-0 z-0">
        <img src="/projects/padho_newsroom.jpg" alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.35) contrast(1.1)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C080A]/40 via-transparent to-[#0C080A]/90" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-8 px-6 sm:px-10 py-12"
      >
        {/* LEFT: Editorial info block */}
        <div className="lg:w-[32%] space-y-4 lg:pr-4 order-2 lg:order-1 glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl">
          <div className="font-mono text-[10px] text-[#FF3B30] tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF3B30] animate-ping" />
            PROJECT 02 // AUTOMATED VIDEO NEWSROOM
          </div>
          <h2 className="font-serif text-5xl sm:text-7xl text-white leading-[0.85] tracking-tight">
            PADHO<br /><span className="italic text-[#FF3B30]">NEWS</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
            End-to-end automated newsroom: RSS → Gemini → Edge-TTS → FFmpeg 9:16 vertical video rendering with SQLite publish queue.
          </p>
          
          {/* Pipeline stages */}
          <div className="space-y-1.5">
            {stages.map((s, i) => (
              <div key={i} onClick={() => setActiveStage(i)}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer text-[10px] font-mono flex items-center gap-2.5 ${
                  activeStage === i ? 'bg-[#FF3B30]/20 border-[#FF3B30]/60 text-white' : 'bg-black/40 border-white/5 text-white/60 hover:border-white/20'
                }`}>
                <span className="text-base">{s.icon}</span>
                <div>
                  <span className="text-[#FF3B30] font-bold">{String(i + 1).padStart(2, '0')}.</span>{' '}
                  <span className="text-white font-medium">{s.name}</span>
                  <div className="text-white/40 text-[9px]">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {['NODE.JS', 'GEMINI', 'EDGE-TTS', 'FFMPEG', 'SHARP', 'SQLite'].map(t => (
              <span key={t} className="px-2 py-0.5 bg-[#FF3B30]/10 border border-[#FF3B30]/25 rounded text-[9px] font-mono text-[#FF3B30] font-medium">{t}</span>
            ))}
          </div>
        </div>

        {/* CENTER: MASSIVE 9:16 Video — THE VISUAL HERO */}
        <div className="lg:w-[35%] flex justify-center order-1 lg:order-2">
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[280px] sm:w-[320px] lg:w-[340px] aspect-[9/16] rounded-[28px] overflow-hidden border-2 border-white/15 shadow-[0_40px_120px_rgba(255,59,48,0.25),0_0_60px_rgba(255,59,48,0.1)] bg-black"
          >
            <video ref={videoRef} src="/projects/faith/demo.mp4" playsInline loop className="w-full h-full object-cover" onClick={toggleVideo} />
            
            {!isPlaying && (
              <div onClick={toggleVideo} className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-[#FF3B30] text-white flex items-center justify-center text-2xl pl-1 shadow-[0_0_40px_rgba(255,59,48,0.7)]">▶</div>
                <div className="mt-3 font-mono text-[10px] text-white tracking-widest">PLAY 9:16 REEL</div>
              </div>
            )}

            <div className="absolute top-4 inset-x-4 flex items-center justify-between font-mono text-[9px] text-white/70 glass-panel px-3 py-1.5 rounded-full pointer-events-none">
              <span className="font-semibold">PADHO.NEWS</span>
              <span className="text-[#FF3B30]">1080×1920</span>
            </div>

            <div className="absolute bottom-4 inset-x-4 flex items-center justify-between font-mono text-[9px] text-white/70 glass-panel px-3 py-1.5 rounded-full">
              <button onClick={toggleVideo} className="cursor-pointer text-[#FF3B30] font-bold">{isPlaying ? 'PAUSE' : 'PLAY'}</button>
              <span>FFMPEG PIPELINE</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: 3D Broadcast Rig Model + Audio visualizer + headlines */}
        <div className="lg:w-[30%] space-y-4 lg:pl-8 order-3">
          {/* 3D Broadcast Camera & Film Reel Rig Model */}
          <div className="hidden lg:block w-full h-[200px]">
            <Section3DModel type="newsroom" />
          </div>

          {/* Audio visualizer */}
          <div className="glass-panel rounded-xl p-4">
            <div className="flex items-center justify-between font-mono text-[9px] text-white/40 mb-3">
              <span>EDGE-TTS NEURAL SPECTRUM</span>
              <span className="text-[#FF3B30]">128kbps</span>
            </div>
            <div className="h-12 flex items-end gap-0.5">
              {[45,80,60,95,40,70,85,30,90,65,100,75,50,85,60,90,40,70,95,60,45,80,55,90,65].map((h, i) => (
                <motion.div key={i}
                  animate={{ height: isPlaying ? [`${h*0.3}%`, `${h}%`, `${h*0.3}%`] : `${h*0.25}%` }}
                  transition={{ repeat: Infinity, duration: 0.7 + (i%5)*0.1, ease: 'easeInOut' }}
                  className="flex-1 bg-gradient-to-t from-[#FF3B30] to-amber-400 rounded-t" />
              ))}
            </div>
          </div>

          {/* Sample headlines being processed */}
          <div className="glass-panel rounded-xl p-4 space-y-2">
            <div className="font-mono text-[9px] text-[#FF3B30] tracking-widest">LIVE PROCESSING QUEUE</div>
            {[
              'PM launches new infrastructure initiative across southern states',
              'ISRO completes pre-launch review for next lunar mission',
              'Union Budget allocates record funds for education sector',
            ].map((headline, i) => (
              <div key={i} className="p-2 rounded-lg bg-black/40 border border-white/5 text-[10px] text-white/60 leading-snug">
                <span className="text-[#FF3B30] font-mono font-bold mr-1">{String(i + 1).padStart(2, '0')}.</span>
                {headline}
              </div>
            ))}
          </div>

          {/* System log */}
          <div className="glass-panel rounded-xl p-3 font-mono text-[9px] text-white/40 space-y-0.5">
            <div className="text-[#FF3B30] font-semibold">PIPELINE STATUS</div>
            <div><span className="text-emerald-400">●</span> RSS: 24 feeds active</div>
            <div><span className="text-emerald-400">●</span> TTS: 3 voices loaded</div>
            <div><span className="text-amber-400">●</span> Render: 2 in queue</div>
            <div><span className="text-emerald-400">●</span> Published: 847 reels</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ENVIRONMENT 03: SMART OFFICE — BLUEPRINT AS FULL BACKGROUND
   Composition: Blueprint IS the scene, HUD panels float on top
   ═══════════════════════════════════════════════════════════════════ */

function SmartOfficeEnvironment() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [confidence, setConfidence] = useState(72);
  const [relayLight, setRelayLight] = useState(true);
  const [relayHvac, setRelayHvac] = useState(true);

  const detectedHumans = confidence > 75 ? 2 : confidence > 50 ? 4 : 6;
  const hvacCfm = detectedHumans * 220;

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      {/* FULL-BLEED BLUEPRINT — this IS the visual */}
      <div className="absolute inset-0 z-0">
        <img src="/projects/smart_office.jpg" alt="Smart Office Blueprint" className="w-full h-full object-cover" style={{ filter: 'brightness(0.6) contrast(1.2) saturate(0.8)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040C16]/80 via-transparent to-[#040C16]/60" />
        <div className="absolute inset-0 bg-[#040C16]/30" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10 w-full min-h-screen flex flex-col justify-between px-6 sm:px-10 py-10"
      >
        {/* TOP: Title overlaid on the blueprint + 3D Room & Laser Vision Scanner Centerpiece */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-fit">
            <div className="font-mono text-[10px] text-[#00E676] tracking-[0.2em] flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00E676] animate-ping" />
              PROJECT 03 // SPATIAL COMPUTER VISION & 7-LAYER IoT
            </div>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-[7.5rem] text-white leading-[0.82] tracking-tight drop-shadow-[0_4px_40px_rgba(0,0,0,0.8)]">
              SMART <span className="italic text-[#00E676]">OFFICE</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed mt-3">
              Real-time occupancy detection with TensorFlow.js COCO-SSD, 7-layer edge-to-cloud architecture, and automated multi-zone climate and lighting relay systems.
            </p>
          </div>

          <div className="w-[300px] sm:w-[380px] hidden sm:block">
            <Section3DModel type="office" />
          </div>
        </div>

        {/* SPATIAL CALLOUT PINS floating on the blueprint */}
        <div className="hidden lg:block absolute inset-0 z-15 pointer-events-none">
          <div className="absolute top-[28%] left-[62%]">
            <div className="flex items-center gap-2 pointer-events-auto">
              <div className="w-3.5 h-3.5 rounded-full bg-[#00E676] animate-ping opacity-75" />
              <div className="glass-panel px-3 py-1.5 rounded-lg font-mono text-[10px] text-white border border-[#00E676]/30 shadow-lg">
                <span className="text-[#00E676] font-bold">ZONE A</span> · {detectedHumans} humans · {confidence}% conf
              </div>
            </div>
          </div>
          <div className="absolute top-[48%] left-[72%]">
            <div className="flex items-center gap-2 pointer-events-auto">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400 animate-ping opacity-75" />
              <div className="glass-panel px-3 py-1.5 rounded-lg font-mono text-[10px] text-white border border-amber-400/30 shadow-lg">
                <span className="text-amber-400 font-bold">HVAC 01</span> · {hvacCfm} CFM · 21.5°C
              </div>
            </div>
          </div>
          <div className="absolute top-[38%] left-[42%]">
            <div className="flex items-center gap-2 pointer-events-auto">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400 animate-ping opacity-75" />
              <div className="glass-panel px-3 py-1.5 rounded-lg font-mono text-[10px] text-white border border-amber-400/30 shadow-lg">
                <span className="text-amber-400 font-bold">PIR SENSOR</span> · Active · 340 lux
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: HUD Control Panels — floating over the blueprint */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-auto">
          
          {/* COCO-SSD Confidence Gate */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-panel rounded-2xl p-5 space-y-3"
          >
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span className="text-[#00E676] font-semibold">COCO-SSD CONFIDENCE</span>
              <span className="text-white font-bold text-lg">{confidence}%</span>
            </div>
            <input type="range" min="40" max="95" value={confidence}
              onChange={e => setConfidence(Number(e.target.value))}
              className="w-full h-2 bg-black/60 rounded-lg appearance-none cursor-pointer accent-[#00E676]" />
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 rounded-lg bg-black/40 border border-white/5">
                <div className="text-[8px] font-mono text-white/35">HUMANS</div>
                <div className="text-xl font-mono text-[#00E676] font-bold">{detectedHumans}</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-black/40 border border-white/5">
                <div className="text-[8px] font-mono text-white/35">HVAC CFM</div>
                <div className="text-xl font-mono text-white font-bold">{hvacCfm}</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-black/40 border border-white/5">
                <div className="text-[8px] font-mono text-white/35">ENERGY</div>
                <div className="text-xl font-mono text-emerald-400 font-bold">{relayLight ? '85%' : '0%'}</div>
              </div>
            </div>
          </motion.div>

          {/* 7-Layer IoT Stack */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="glass-panel rounded-2xl p-5 font-mono text-[10px] space-y-1"
          >
            <div className="text-[#00E676] font-semibold tracking-widest mb-2">7-LAYER IoT STACK</div>
            {[
              ['L1 SENSOR', 'PIR + Ambient Lux'],
              ['L2 VISION', 'TensorFlow.js COCO-SSD'],
              ['L3 INGEST', 'MQTT Pub/Sub Broker'],
              ['L4 PERSIST', 'SQLite Time-Series'],
              ['L5 RULES', 'Adaptive Heuristic Core'],
              ['L6 CONTROL', 'Circuit Relay Controller'],
              ['L7 APP', 'React Facility Dashboard'],
            ].map(([label, desc], i) => (
              <div key={i} className="flex justify-between py-1 border-b border-white/5 last:border-0">
                <span className="text-white/35">{label}</span>
                <span className="text-white/70">{desc}</span>
              </div>
            ))}
          </motion.div>

          {/* Relay Controls */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="glass-panel rounded-2xl p-5 space-y-3"
          >
            <div className="font-mono text-[10px] text-[#00E676] font-semibold tracking-widest">RELAY CONTROLS</div>
            <button onClick={() => setRelayLight(!relayLight)}
              className={`w-full p-3 rounded-xl border font-mono text-xs transition-all cursor-pointer text-left ${
                relayLight ? 'bg-[#00E676]/15 border-[#00E676]/50 text-[#00E676]' : 'bg-black/30 border-white/10 text-white/40'
              }`}>
              💡 LIGHTING: {relayLight ? 'ACTIVE (85%)' : 'DISABLED'}
            </button>
            <button onClick={() => setRelayHvac(!relayHvac)}
              className={`w-full p-3 rounded-xl border font-mono text-xs transition-all cursor-pointer text-left ${
                relayHvac ? 'bg-[#00E676]/15 border-[#00E676]/50 text-[#00E676]' : 'bg-black/30 border-white/10 text-white/40'
              }`}>
              ❄️ HVAC: {relayHvac ? `AUTO (${hvacCfm} CFM)` : 'OFF'}
            </button>
            <p className="text-[10px] text-white/40 leading-relaxed">
              Spatial human presence detection triggers multi-zone relay automation with configurable thresholds.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['COCO-SSD', 'TF.JS', 'MQTT', 'RELAY', 'REACT'].map(t => (
                <span key={t} className="px-2 py-0.5 bg-[#00E676]/8 border border-[#00E676]/15 rounded text-[8px] font-mono text-[#00E676]/70">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ENVIRONMENT 04: CAREER AGENT — FORENSIC DOSSIER (unique layout)
   Composition: Full-width evidence board with forensic research flow
   ═══════════════════════════════════════════════════════════════════ */

function CareerAgentEnvironment() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [activeDossierTab, setActiveDossierTab] = useState('evidence');

  return (
    <div ref={ref} className="relative min-h-screen bg-[#0E0C08] overflow-hidden">
      {/* Amber forensic atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_30%,rgba(245,158,11,0.06),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(245,158,11,0.04),transparent_60%)]" />
        {/* Evidence board grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-10 py-10 min-h-screen flex flex-col"
      >
        {/* Header — spans full width with 3D Forensic Citation Radar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="font-mono text-[10px] text-amber-400 tracking-[0.2em] flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              PROJECT 04 // FORENSIC PROFILE RESEARCH ENGINE
            </div>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-[8rem] text-white leading-[0.82] tracking-tight">
              CAREER<br /><span className="italic text-amber-400">AGENT</span>
            </h2>
          </div>
          
          <div className="w-[280px] sm:w-[320px] hidden sm:block">
            <Section3DModel type="radar" />
          </div>

          <p className="font-sans text-sm text-white/55 leading-relaxed max-w-sm">
            "Research first. Personalize second. Contact third." Deterministic citation verification for every outreach assertion.
          </p>
        </div>

        {/* FULL-WIDTH EVIDENCE BOARD — 3-column forensic layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Column 1: The Doctrine */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-panel rounded-2xl p-5 space-y-3 flex flex-col"
          >
            <div className="font-mono text-[10px] text-amber-400 tracking-widest">THE FORENSIC DOCTRINE</div>
            <div className="h-0.5 w-full bg-amber-400/20" />
            {[
              { num: '01', rule: 'AST EXTRACTION', desc: 'Parse resume PDF into verifiable skill taxonomy & repo graph' },
              { num: '02', rule: 'EVIDENCE GATE', desc: 'Block outreach lacking strict factual project citations' },
              { num: '03', rule: 'SCOPED DNC', desc: 'Email, Domain, and Company level suppression enforcement' },
              { num: '04', rule: 'HUMAN APPROVAL', desc: 'Immutable preview snapshot requiring explicit signoff' },
            ].map((item) => (
              <div key={item.num} className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-md bg-amber-500/20 flex items-center justify-center font-mono text-[10px] text-amber-400 font-bold">{item.num}</span>
                  <span className="font-mono text-[11px] text-white/90 font-medium">{item.rule}</span>
                </div>
                <div className="text-[10px] text-white/45 pl-8">{item.desc}</div>
              </div>
            ))}
            
            {/* Research flow */}
            <div className="mt-auto pt-3 border-t border-white/5">
              <div className="font-mono text-[9px] text-amber-400/60 tracking-widest mb-2">OUTREACH FLOW</div>
              <div className="flex items-center gap-1 text-[9px] font-mono text-white/40">
                <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400">RESEARCH</span>
                <span>→</span>
                <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400">PERSONALIZE</span>
                <span>→</span>
                <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400">CONTACT</span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Evidence Inspector — the visual center */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-panel rounded-2xl p-5 space-y-4 lg:row-span-1"
          >
            <div className="flex gap-1.5 border-b border-white/10 pb-3">
              {['evidence', 'ast', 'dnc'].map(tab => (
                <button key={tab} onClick={() => setActiveDossierTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                    activeDossierTab === tab ? 'bg-amber-500 text-black font-bold' : 'text-white/50 hover:text-white'
                  }`}>{tab.toUpperCase()}</button>
              ))}
            </div>

            {activeDossierTab === 'evidence' && (
              <div className="space-y-3">
                <div className="font-mono text-[9px] text-amber-400/60 tracking-widest">GENERATED OUTREACH SAMPLE</div>
                <div className="p-4 rounded-lg bg-black/30 border border-amber-500/15 text-xs text-white/75 leading-relaxed">
                  "I observed your team scaling automated video compilation. In{' '}
                  <span className="text-amber-400 font-semibold">[Evidence #E-01: Padho Newsroom]</span>, I architected an end-to-end pipeline using Node.js, Edge-TTS, and FFmpeg that generates 9:16 vertical news reels from RSS feeds."
                </div>
                <div className="font-mono text-[9px] text-amber-400/60 tracking-widest">VERIFICATION STATUS</div>
                <div className="space-y-2">
                  {[
                    ['CLAIM #1: FFmpeg 9:16 Synthesis', 'PASSED', '#a82f0c'],
                    ['CLAIM #2: Room SQLite Persistence', 'PASSED', 'DAO VERIFIED'],
                    ['CLAIM #3: COCO-SSD Human Presence', 'PASSED', 'LAB TESTED'],
                  ].map(([claim, status, ref], i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-emerald-950/25 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 flex justify-between items-center">
                      <span>{claim}</span>
                      <span className="font-bold">{status} [{ref}]</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeDossierTab === 'ast' && (
              <pre className="text-[11px] font-mono text-white/65 overflow-x-auto p-4 bg-black/30 rounded-lg flex-1">
{`{
  "candidate": "Tenzin Wangchu Khongsai",
  "education": [
    { "inst": "SIMATS", "degree": "B.E. CSE", "cgpa": 9.0 },
    { "inst": "IIT Madras", "degree": "BS Data Science" }
  ],
  "nodes": {
    "01": { "name": "Aura", "stack": ["Kotlin","Room","Compose"] },
    "02": { "name": "Padho", "stack": ["Node","FFmpeg","Gemini"] },
    "03": { "name": "Smart Office", "stack": ["COCO-SSD","MQTT"] },
    "04": { "name": "Vehicle Dynamics", "stack": ["Rapier","WebGL"] }
  },
  "verified_claims": 4,
  "suppressed_domains": 0,
  "approval_state": "PENDING_REVIEW"
}`}
              </pre>
            )}

            {activeDossierTab === 'dnc' && (
              <div className="space-y-3 font-mono text-[10px]">
                <div className="text-amber-400 font-semibold">SUPPRESSION POLICIES</div>
                <div className="p-4 rounded-lg bg-black/30 border border-white/5 space-y-2">
                  <div className="flex justify-between text-white/60"><span>DOMAIN SUPPRESSION:</span><span className="text-emerald-400 font-bold">ENFORCED</span></div>
                  <div className="flex justify-between text-white/60"><span>EMAIL DNC LIST:</span><span className="text-emerald-400 font-bold">0 Blacklisted</span></div>
                  <div className="flex justify-between text-white/60"><span>COMPANY SCOPE:</span><span className="text-emerald-400 font-bold">ACTIVE</span></div>
                  <div className="flex justify-between text-white/60"><span>CADENCE LIMIT:</span><span className="text-white font-bold">1 / 72h</span></div>
                </div>
                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/15 text-amber-400/80 text-[10px]">
                  All outreach requires deterministic evidence and human approval. No automated contact without verified citations.
                </div>
              </div>
            )}
          </motion.div>

          {/* Column 3: Candidate Profile + System Status */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-4"
          >
            {/* Candidate card */}
            <div className="glass-panel rounded-2xl p-5">
              <div className="font-mono text-[9px] text-amber-400 tracking-widest mb-3">SUBJECT DOSSIER</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center font-mono text-amber-400 text-sm font-bold">TWK</div>
                <div>
                  <div className="font-mono text-sm text-white font-medium">Tenzin Wangchu Khongsai</div>
                  <div className="text-[10px] text-white/50">CSE @ SIMATS · BS DS @ IIT Madras</div>
                </div>
              </div>
              <div className="space-y-1 text-[10px] font-mono">
                <div className="flex justify-between text-white/50"><span>Verified Projects:</span><span className="text-white font-bold">5</span></div>
                <div className="flex justify-between text-white/50"><span>Tech Stack Nodes:</span><span className="text-white font-bold">12</span></div>
                <div className="flex justify-between text-white/50"><span>Evidence Citations:</span><span className="text-emerald-400 font-bold">4 VERIFIED</span></div>
                <div className="flex justify-between text-white/50"><span>DNC Violations:</span><span className="text-emerald-400 font-bold">0</span></div>
              </div>
            </div>

            {/* System architecture compact */}
            <div className="glass-panel rounded-2xl p-5 font-mono text-[10px] space-y-2">
              <div className="text-amber-400 font-semibold tracking-widest">AGENT ARCHITECTURE</div>
              {[
                ['PARSER', 'Resume → AST → Skill Nodes'],
                ['MATCHER', 'Opportunity → Requirements → Fit Score'],
                ['WRITER', 'Evidence → Template → Personalized Draft'],
                ['GATE', 'Draft → Citation Check → Approve/Block'],
                ['DISPATCH', 'Approved → Schedule → Send → Track'],
              ].map(([label, desc], i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded bg-black/20 border border-white/5">
                  <span className="text-amber-400 font-bold">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <span className="text-white/80">{label}</span>
                    <div className="text-white/35 text-[9px]">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ENVIRONMENT 05: FIRST DRIVE — FULL-BLEED COCKPIT VISUAL
   Composition: Car image IS the scene, telemetry HUD overlays
   ═══════════════════════════════════════════════════════════════════ */

function SystemsEnvironment() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [speed, setSpeed] = useState(142);
  const [rpm, setRpm] = useState(6200);
  const activeGear = speed > 220 ? 6 : speed > 170 ? 5 : speed > 130 ? 4 : 3;
  const [isAccelerating, setIsAccelerating] = useState(false);

  useEffect(() => {
    let interval;
    if (isAccelerating) {
      interval = setInterval(() => {
        setSpeed(prev => Math.min(prev + 4, 284));
        setRpm(prev => (prev > 7800 ? 5400 : prev + 180));
      }, 50);
    } else {
      interval = setInterval(() => {
        setSpeed(prev => Math.max(prev - 2, 120));
        setRpm(prev => Math.max(prev - 90, 4800));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isAccelerating]);

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      {/* FULL-BLEED CAR IMAGE — THE SCENE */}
      <div className="absolute inset-0 z-0">
        <img src="/projects/first_drive.jpg" alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.5) contrast(1.2) saturate(1.1)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-transparent to-[#050607]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050607]/60 via-transparent to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10 w-full min-h-screen flex flex-col justify-between px-6 sm:px-10 py-10"
      >
        {/* TOP: Title over the car + 3D Interactive Sports Car Model (Physics Driven) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-fit">
            <div className="font-mono text-[10px] text-[#E89052] tracking-[0.2em] flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E89052] animate-ping" />
              PROJECT 05 // COMPUTATIONAL VEHICLE KINEMATICS
            </div>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-[7.5rem] text-white leading-[0.82] tracking-tight drop-shadow-[0_4px_60px_rgba(0,0,0,0.9)]">
              FIRST <span className="italic text-[#E89052]">DRIVE</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed mt-3">
              High-performance 3D vehicle dynamics with Rapier physics, multi-link suspension, Pacejka tire friction, and real-time cockpit telemetry at 60 FPS.
            </p>
          </div>

          <div className="w-[320px] sm:w-[420px] pointer-events-auto">
            <Section3DModel type="car" isAccelerating={isAccelerating} />
          </div>
        </div>

        {/* BOTTOM: Cockpit HUD — floating over the car */}
        <div className="space-y-4">
          {/* Main telemetry gauges — large */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="glass-panel rounded-2xl p-4 sm:p-5 text-center">
              <div className="text-[8px] font-mono text-white/30 tracking-wider">SPEED</div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-mono text-[#E89052] font-bold leading-none mt-1">{speed}</div>
              <div className="text-[10px] font-mono text-white/40 mt-1">KPH</div>
            </div>
            <div className="glass-panel rounded-2xl p-4 sm:p-5 text-center">
              <div className="text-[8px] font-mono text-white/30 tracking-wider">RPM</div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-mono text-amber-400 font-bold leading-none mt-1">{rpm}</div>
              <div className="text-[10px] font-mono text-white/40 mt-1">TACHOMETER</div>
            </div>
            <div className="glass-panel rounded-2xl p-4 sm:p-5 text-center">
              <div className="text-[8px] font-mono text-white/30 tracking-wider">GEAR</div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-mono text-white font-bold leading-none mt-1">D{activeGear}</div>
              <div className="text-[10px] font-mono text-white/40 mt-1">SEQUENTIAL</div>
            </div>
            <div className="glass-panel rounded-2xl p-4 sm:p-5 text-center">
              <div className="text-[8px] font-mono text-white/30 tracking-wider">TIRE μ</div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-mono text-emerald-400 font-bold leading-none mt-1">1.15</div>
              <div className="text-[10px] font-mono text-white/40 mt-1">PACEJKA</div>
            </div>
          </div>

          {/* Throttle + Telemetry bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="glass-panel rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between font-mono text-[10px] text-white/50">
                <span>THROTTLE CONTROLLER</span>
                <span className="text-[#E89052] font-semibold">{isAccelerating ? 'WIDE OPEN' : 'COASTING'}</span>
              </div>
              <button
                onMouseDown={() => setIsAccelerating(true)}
                onMouseUp={() => setIsAccelerating(false)}
                onTouchStart={() => setIsAccelerating(true)}
                onTouchEnd={() => setIsAccelerating(false)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D97736] to-[#E89052] text-black font-mono text-sm font-bold shadow-[0_0_40px_rgba(217,119,54,0.35)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer select-none"
              >
                PRESS & HOLD THROTTLE
              </button>
              <div className="flex flex-wrap gap-1.5">
                {['WebGL', 'RAPIER', 'RIGID-BODY', 'PACEJKA', 'TELEMETRY'].map(t => (
                  <span key={t} className="px-2 py-0.5 bg-[#D97736]/10 border border-[#D97736]/25 rounded text-[8px] font-mono text-[#E89052]">{t}</span>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-5">
              <div className="font-mono text-[10px] text-white/40 mb-3">KINEMATICS TELEMETRY</div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-[10px]">
                {[
                  ['SUSPENSION', '42.8 MM'],
                  ['LAT G-FORCE', '1.28 G'],
                  ['BRAKE PRESS', '0 BAR'],
                  ['TORQUE', '740 NM'],
                  ['SUBSTEPS', '12 / FRAME'],
                  ['DELTA-T', '0.016s'],
                  ['SLIP ANGLE', '2.4°'],
                  ['DOWNFORCE', '380 KG'],
                ].map(([label, val], i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-white/30">{label}</span>
                    <span className="text-white/70 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PROJECT SEQUENCE — 5 DISTINCT VISUAL WORLDS
   No chapter overture — projects start immediately after hero
   ═══════════════════════════════════════════════════════════════════ */

export default function ProjectSequence() {
  return (
    <section id="projects" className="relative bg-[#08090C] text-[var(--ivory)]">
      <div id="aura"><AuraEnvironment /></div>
      <div id="padho"><PadhoEnvironment /></div>

      {/* ─── Floating 3D Geometric Wave Banner (Reference Match main_04 / main_06) ─── */}
      <div className="py-12 bg-black/60 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 font-mono text-[10px] text-[#E89052] tracking-[0.25em] uppercase mb-2 text-center">
          CONTINUOUS COMPUTATIONAL ARCHITECTURE
        </div>
        <Section3DModel type="wave" />
      </div>

      <div id="smart-office"><SmartOfficeEnvironment /></div>
      <div id="career-agent"><CareerAgentEnvironment /></div>
      <div id="systems-simulations"><SystemsEnvironment /></div>
    </section>
  );
}
