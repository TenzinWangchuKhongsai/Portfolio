import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Menu, X } from 'lucide-react'
import './portfolio-workbench.css'

const projects = [
  {
    id: '01',
    name: 'AURA',
    category: 'PERSONAL INTELLIGENCE',
    summary: 'An exploration of intelligent personal productivity.',
    idea: 'A local-first Android workspace for collecting tasks and shaping a day around them.',
    system: 'Compose UI → ViewModel → StateFlow → Room → WorkManager, with a natural-language layer for schedule entry.',
    build: 'Kotlin, Jetpack Compose, Room, StateFlow, WorkManager, Gemini',
    learning: 'Designing a useful boundary between conversational input, structured data, and dependable background work.',
    status: 'PERSONAL BUILD · IN PROGRESS',
    visual: 'aura',
    visualLabel: 'A product-system sketch',
  },
  {
    id: '02',
    name: 'PADHO',
    category: 'AI-ASSISTED NEWSROOM',
    summary: 'A media pipeline that turns news sources into short-form stories.',
    idea: 'Explore how a small newsroom workflow could take a story from feed ingestion through narration and visual publishing.',
    system: 'RSS → processing → AI-assisted writing → text-to-speech → media generation → Express → SQLite → publishing.',
    build: 'Node.js, Gemini, Edge TTS, FFmpeg, Express, SQLite',
    learning: 'Making each transformation inspectable—and keeping editorial review part of an automated workflow.',
    status: 'PIPELINE VISUALIZATION · NOT LIVE',
    image: '/projects/padho/newsroom.jpg',
    visualLabel: 'Newsroom pipeline interface',
  },
  {
    id: '03',
    name: 'CAREER AGENT',
    category: 'RESEARCH & OUTREACH',
    summary: 'A research-first system for exploring roles and planning thoughtful outreach.',
    idea: 'Bring opportunity research, role-fit notes, and outreach safeguards into one deliberate workflow.',
    system: 'Profile → opportunity research → evidence review → outreach draft → safety checks.',
    build: 'Research workflows, structured data, APIs, automation',
    learning: 'Treating verification and human review as first-class parts of an agentic workflow.',
    status: 'SYSTEM EXPLORATION',
    visual: 'career',
    visualLabel: 'Research workflow sketch',
  },
  {
    id: '04',
    name: 'SMART OFFICE',
    category: 'IOT & SIMULATION',
    summary: 'An exploration of occupancy-aware spaces and energy use.',
    idea: 'Model how room occupancy and sensor signals could inform a more responsive office environment.',
    system: 'Sensor inputs → occupancy model → room state → lighting and energy decisions.',
    build: 'IoT concepts, occupancy detection, simulation',
    learning: 'Thinking through the gap between a sensor reading and a useful system decision.',
    status: 'SIMULATION / CONCEPT',
    image: '/projects/smart-office/hero.png',
    visualLabel: 'Smart office project visual',
  },
  {
    id: '05',
    name: 'SYSTEMS / SIMULATIONS',
    category: 'INTERACTIVE EXPERIMENTS',
    summary: 'Small explorations across simulation, computer vision, and networks.',
    idea: 'Use focused experiments to understand the behavior of systems that are difficult to see all at once.',
    system: 'Model → observe → perturb → compare → refine.',
    build: 'Computer vision, networks, simulation, intelligent systems',
    learning: 'A collection of questions and prototypes rather than a claim of finished products.',
    status: 'ONGOING EXPERIMENTS',
    image: '/projects/first_drive.jpg',
    visualLabel: '3D driving simulation interface',
  },
]

const systems = {
  aura: {
    name: 'AURA / PERSONAL PRODUCTIVITY',
    nodes: [
      ['COMPOSE UI', 'The screen where a person writes and reviews a schedule.'],
      ['VIEWMODEL', 'Keeps screen state and user actions in one place.'],
      ['STATEFLOW', 'Carries observable state back to the interface.'],
      ['ROOM', 'Stores the structured schedule locally.'],
      ['WORKMANAGER', 'Coordinates work that should continue in the background.'],
      ['NATURAL LANGUAGE', 'An input layer for turning a written intention into structured fields.'],
    ],
  },
  padho: {
    name: 'PADHO / MEDIA PIPELINE',
    nodes: [
      ['RSS', 'Collect source items from feeds.'],
      ['PROCESSING', 'Prepare and structure an item for the next step.'],
      ['AI', 'Assist with transforming source text into a script.'],
      ['TTS', 'Create a narration track from approved text.'],
      ['MEDIA', 'Assemble narration and visual elements.'],
      ['EXPRESS', 'Serve the workflow and its review interface.'],
      ['SQLITE', 'Keep workflow and publishing records.'],
      ['PUBLISH', 'A final hand-off after review.'],
    ],
  },
}

const processSteps = [
  ['01', 'IDEA', 'Start with a question worth making concrete.'],
  ['02', 'RESEARCH', 'Understand the problem before choosing the tool.'],
  ['03', 'ARCHITECTURE', 'Give the moving parts a clear relationship.'],
  ['04', 'DESIGN', 'Make the system legible to the person using it.'],
  ['05', 'BUILD', 'Turn the model into something you can try.'],
  ['06', 'TEST', 'Look for the assumptions that do not hold.'],
  ['07', 'ITERATE', 'Keep the useful parts; rethink the rest.'],
]

function SectionMark({ index, label, light = false }) {
  return <div className={`section-mark${light ? ' section-mark-light' : ''}`}><span>{index}</span><span className="mark-rule" /><span>{label}</span></div>
}

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => setTime(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }).format(new Date()))
    updateTime()
    const interval = window.setInterval(updateTime, 60_000)
    return () => window.clearInterval(interval)
  }, [])

  const links = [['work', 'WORK'], ['systems', 'SYSTEMS'], ['about', 'ABOUT'], ['academics', 'ACADEMICS'], ['contact', 'CONTACT']]
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Tenzin Wangchu Khongsai, back to top">TENZIN <span>/ WK</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([href, label]) => <a key={href} href={`#${href}`}>{label}</a>)}
      </nav>
      <div className="header-status"><span className="header-time">{time} IST</span><span className="online-dot" /><span className="online-label">SYSTEM ONLINE</span></div>
      <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
        {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
      </button>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
        <p className="mono mobile-nav-caption">INDEX / 2026</p>
        {links.map(([href, label], i) => <a key={href} href={`#${href}`} onClick={closeMenu}><span>0{i + 1}</span>{label}<ArrowUpRight size={19} /></a>)}
        <p className="mono mobile-nav-footer">CHENNAI / INDIA · {time} IST</p>
      </nav>}
    </header>
  )
}

function Hero() {
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-topline mono"><span>PORTFOLIO / 2026</span><span>CHENNAI, INDIA <i>·</i> 13° 04′ N</span></div>
    <div className="hero-layout">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-dot" /> COMPUTER SCIENCE × DATA SCIENCE</p>
        <h1 id="hero-title">I build<br /><em>software</em><br />that thinks<br />in systems<span className="period">.</span></h1>
        <div className="hero-bottomline">
          <p>Curious about the places where software, intelligence, and the real world meet.</p>
          <a href="#work" className="round-link" aria-label="Scroll to selected work"><ArrowDown size={20} strokeWidth={1.5} /></a>
        </div>
      </div>
      <div className="hero-instrument" aria-label="A diagram showing a builder's iterative process">
        <div className="instrument-head mono"><span>FIELD NOTE / 001</span><span>BUILD MODE</span></div>
        <div className="instrument-visual">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="instrument-cross cross-one" /><div className="instrument-cross cross-two" />
          <div className="instrument-center"><span className="center-dot" /><span className="center-label mono">IDEA<br />→ SYSTEM</span></div>
          <span className="instrument-node node-a mono">INPUT</span><span className="instrument-node node-b mono">MODEL</span><span className="instrument-node node-c mono">BUILD</span><span className="instrument-node node-d mono">LEARN</span>
          <span className="instrument-coord coord-a mono">01 / 04</span><span className="instrument-coord coord-b mono">ITERATIVE BY DESIGN</span>
        </div>
        <div className="instrument-foot mono"><span>STATUS / EXPERIMENTAL</span><span className="signal-bars"><i /><i /><i /><i /></span></div>
      </div>
    </div>
    <div className="hero-footer mono"><span>COMPUTER SCIENCE ENGINEERING STUDENT</span><span>SCROLL TO EXPLORE <span className="scroll-line" /></span><span>01 — 09</span></div>
  </section>
}

function Introduction() {
  return <section className="introduction section-pad" id="about">
    <SectionMark index="01" label="A NOTE ON HOW I BUILD" />
    <div className="intro-body">
      <span className="quote-mark" aria-hidden="true">"</span>
      <blockquote>I'm Tenzin—a student drawn to what happens when <em>software, intelligence, and automation</em> meet real problems.</blockquote>
      <div className="intro-aside"><p>I learn by making: starting with a question, following it into the details, and building something I can test and rethink.</p><span className="mono annotation">CURRENTLY EXPLORING<br />AI / DATA / SOFTWARE / SYSTEMS</span></div>
    </div>
    <div className="intro-foot mono"><span>THINKING / IN PROGRESS</span><span>STACK / CONSTANTLY EVOLVING</span><span>BASED IN CHENNAI</span></div>
  </section>
}

function AuraSketch() {
  return <div className="aura-sketch" role="img" aria-label="Illustrative schedule interface showing a task list and input field">
    <div className="sketch-top mono"><span>AURA / DAILY VIEW</span><span>LOCAL STATE <b>●</b></span></div>
    <div className="sketch-date"><span className="mono">TUESDAY / 09:42</span><strong>Make room<br /><em>for focus.</em></strong></div>
    <div className="sketch-task"><span className="task-time mono">09:00</span><span>Systems programming</span><span className="task-state" /></div>
    <div className="sketch-task"><span className="task-time mono">13:00</span><span>Review the model</span><span className="task-state task-state-blue" /></div>
    <div className="sketch-input mono">+ WRITE A THOUGHT… <ArrowRight size={14} /></div>
    <div className="sketch-note mono">PRODUCT CONCEPT / INTERFACE STUDY</div>
  </div>
}

function ProjectVisual({ project }) {
  if (project.image) return <figure className="project-visual image-visual">
    <img src={project.image} alt={project.visualLabel} loading="lazy" />
    <figcaption className="visual-caption mono"><span>{project.visualLabel}</span><span>PROJECT ARCHIVE / {project.id}</span></figcaption>
  </figure>
  if (project.visual === 'aura') return <figure className="project-visual aura-visual"><AuraSketch /><figcaption className="visual-caption mono"><span>{project.visualLabel}</span><span>ILLUSTRATIVE UI STUDY</span></figcaption></figure>
  return <figure className="project-visual career-visual">
    <div className="career-backdrop mono"><span>RESEARCH LOG / 03</span><span>ROLE SIGNALS</span></div>
    <div className="career-flow"><div className="career-card"><span className="mono">01 / PROFILE</span><strong>Skills &amp; interests</strong></div><div className="career-connector"><ArrowRight /></div><div className="career-card active-career"><span className="mono">02 / RESEARCH</span><strong>Opportunity notes</strong></div><div className="career-connector"><ArrowRight /></div><div className="career-card"><span className="mono">03 / REVIEW</span><strong>Human decision</strong></div></div>
    <figcaption className="visual-caption mono"><span>{project.visualLabel}</span><span>WORKFLOW SKETCH</span></figcaption>
  </figure>
}

function ProjectArchive() {
  const [selected, setSelected] = useState(0)
  const project = projects[selected]
  return <section className="work-section section-pad" id="work">
    <div className="work-heading"><SectionMark index="02" label="SELECTED WORK / A LIVING ARCHIVE" /><p>Ideas become interesting<br />when you <em>start making.</em></p></div>
    <div className="project-browser">
      <div className="project-index" role="tablist" aria-label="Select a project">
        {projects.map((item, index) => <button key={item.id} className={`project-tab${selected === index ? ' selected' : ''}`} onClick={() => setSelected(index)} role="tab" id={`project-tab-${index}`} aria-selected={selected === index} aria-controls="project-panel">
          <span className="mono tab-number">{item.id}</span><span className="tab-name">{item.name}</span><ArrowUpRight className="tab-arrow" size={16} />
        </button>)}}
        <p className="mono index-note">FIVE THREADS<br />STILL UNFOLDING</p>
      </div>
      <article className="project-detail" id="project-panel" role="tabpanel" aria-labelledby={`project-tab-${selected}`} key={project.id}>
        <div className="project-title-row"><div><p className="mono project-category">{project.id} / {project.category}</p><h2>{project.name}</h2></div><span className="mono project-state"><i />{project.status}</span></div>
        <p className="project-summary">{project.summary}</p>
        <ProjectVisual project={project} />
        <div className="project-notes">
          <div className="note-block"><h3 className="mono">THE IDEA</h3><p>{project.idea}</p></div>
          <div className="note-block"><h3 className="mono">THE SYSTEM</h3><p>{project.system}</p></div>
          <div className="note-block"><h3 className="mono">THE BUILD</h3><p>{project.build}</p></div>
          <div className="note-block"><h3 className="mono">THE EXPERIMENT</h3><p>{project.learning}</p></div>
        </div>
        <div className="project-endnote mono"><span>NO CLAIMS WITHOUT EVIDENCE.</span><span>PROJECT NOTE / {project.id}</span></div>
      </article>
    </div>
  </section>
}

function SystemsPlayground() {
  const [activeSystem, setActiveSystem] = useState('aura')
  const [activeNode, setActiveNode] = useState(0)
  const [running, setRunning] = useState(false)
  const system = systems[activeSystem]

  useEffect(() => {
    setActiveNode(0)
    setRunning(false)
  }, [activeSystem])

  useEffect(() => {
    if (!running) return undefined
    const interval = window.setInterval(() => setActiveNode((node) => (node + 1) % system.nodes.length), 900)
    return () => window.clearInterval(interval)
  }, [running, system.nodes.length])

  return <section className="systems-section section-pad" id="systems">
    <SectionMark index="03" label="INTERACTIVE SYSTEMS MAP" />
    <div className="systems-heading"><h2>How the pieces<br /><em>talk to each other.</em></h2><p>These maps describe the shape of the work—not a live service. Select a node to see its role.</p></div>
    <div className="systems-console">
      <div className="console-head"><div className="system-switch" role="tablist" aria-label="Choose a system">
        <button role="tab" aria-selected={activeSystem === 'aura'} onClick={() => setActiveSystem('aura')}>AURA / ANDROID</button>
        <button role="tab" aria-selected={activeSystem === 'padho'} onClick={() => setActiveSystem('padho')}>PADHO / MEDIA</button>
      </div><span className="mono console-visual-label">ARCHITECTURE VISUALIZATION</span></div>
      <div className="flow-map" aria-label={`${system.name} architecture nodes`}>
        {system.nodes.map(([name], index) => <div className="flow-item" key={`${activeSystem}-${name}`}>
          <button className={`flow-node${activeNode === index ? ' flow-node-active' : ''}`} onClick={() => { setActiveNode(index); setRunning(false) }} aria-pressed={activeNode === index}>
            <span className="mono">{String(index + 1).padStart(2, '0')}</span><strong>{name}</strong><span className="node-light" />
          </button>
          {index < system.nodes.length - 1 && <span className={`flow-connector${running ? ' connector-running' : ''}`} aria-hidden="true"><span /></span>}
        </div>)}}
      </div>
      <div className="console-footer"><p className="node-explanation"><span className="mono">NODE / {String(activeNode + 1).padStart(2, '0')}</span>{system.nodes[activeNode][1]}</p><button className={`run-button${running ? ' is-running' : ''}`} onClick={() => setRunning((value) => !value)} aria-pressed={running}><span className="run-indicator" />{running ? 'PAUSE FLOW' : 'TRACE THE FLOW'}<ArrowRight size={15} /></button></div>
    </div>
  </section>
}

function BuildMethod() {
  const [activeStep, setActiveStep] = useState(1)
  const current = processSteps[activeStep]
  return <section className="method-section section-pad">
    <SectionMark index="04" label="A PRACTICE, NOT A CHECKLIST" />
    <div className="method-heading"><h2>Make it clear.<br /><em>Then make it real.</em></h2><p className="mono method-stamp">HOW I BUILD / {current[0]}</p></div>
    <div className="method-track" role="tablist" aria-label="Build process">
      {processSteps.map(([number, label], index) => <button key={number} className={`method-step${activeStep === index ? ' method-step-active' : ''}`} role="tab" aria-selected={activeStep === index} onClick={() => setActiveStep(index)}><span className="mono">{number}</span><strong>{label}</strong><span className="method-step-line" /></button>)}}
    </div>
    <div className="method-reveal" role="tabpanel"><span className="mono">{current[0]} / {current[1]}</span><p>{current[2]}</p><span className="method-cursor" aria-hidden="true">_</span></div>
  </section>
}

function LearningAndAcademics() {
  return <>
    <section className="learning-section section-pad">
      <SectionMark index="05" label="THE TOOLBOX IS STILL GROWING" />
      <div className="learning-layout"><div><h2>Learning in<br /><em>connected systems.</em></h2><p className="learning-intro">A working map of subjects I'm building fluency in—not a scorecard.</p></div>
        <div className="skill-system">
          <div className="skill-row"><span className="mono">01 / PROGRAMMING</span><p>Python <i>·</i> Java <i>·</i> JavaScript <i>·</i> C <i>·</i> HTML <i>·</i> CSS</p></div>
          <div className="skill-row"><span className="mono">02 / DATA</span><p>SQL <i>·</i> Pandas <i>·</i> NumPy <i>·</i> Statistics</p></div>
          <div className="skill-row"><span className="mono">03 / AI</span><p>Machine learning <i>·</i> Computer vision <i>·</i> AI workflows</p></div>
          <div className="skill-row"><span className="mono">04 / SYSTEMS</span><p>IoT <i>·</i> APIs <i>·</i> Databases <i>·</i> Automation <i>·</i> Simulation</p></div>
          <div className="skill-row"><span className="mono">05 / DEVELOPMENT</span><p>React <i>·</i> Vite <i>·</i> Android <i>·</i> Backend <i>·</i> SQLite</p></div>
        </div>
      </div>
    </section>
    <section className="academics-section section-pad" id="academics">
      <SectionMark index="06" label="STUDYING THE FOUNDATIONS" />
      <div className="academics-heading"><h2>Two lenses.<br /><em>One direction.</em></h2><p>Computer science gives me tools to build. Data science keeps me asking what the information means.</p></div>
      <div className="academic-records">
        <article className="academic-record"><span className="mono academic-index">A / 01</span><div><p className="mono academic-place">SIMATS ENGINEERING COLLEGE</p><h3>B.E. Computer Science<br />&amp; Engineering</h3><p className="academic-context">Building a foundation in the ideas and systems behind software.</p></div><div className="academic-meta"><span className="mono">CGPA <b>9.0</b></span><span className="mono">EXPECTED <b>2029</b></span></div></article>
        <article className="academic-record"><span className="mono academic-index">B / 02</span><div><p className="mono academic-place">INDIAN INSTITUTE OF TECHNOLOGY MADRAS</p><h3>BS in<br />Data Science</h3><p className="academic-context">An ongoing study of data, statistics, and analytical thinking.</p></div><div className="academic-meta"><span className="mono">CGPA <b>8.0</b></span><span className="mono">FOUNDATIONAL / ONGOING</span></div></article>
      </div>
    </section>
  </>
}

function AboutAndNow() {
  return <section className="about-section section-pad">
    <SectionMark index="07" label="A LITTLE MORE PERSONAL" />
    <div className="about-layout"><h2>I build because<br />I want to know<br /><em>what's possible.</em></h2><div className="about-copy"><p>I'm a computer science engineering student in Chennai, also studying data science at IIT Madras. I'm interested in tools that make complicated things easier to understand—and in the small decisions that make software feel considered.</p><p>Long term, I'm drawn to building products of my own. For now, that means following curiosity into projects, learning the fundamentals, and staying honest about what I haven't figured out yet.</p><div className="currently-block"><span className="mono currently-title"><span className="live-pulse" /> CURRENTLY / 2026</span><div className="currently-row"><span className="mono">LEARNING</span><p>Data structures <i>·</i> Java <i>·</i> Statistics <i>·</i> Machine learning</p></div><div className="currently-row"><span className="mono">BUILDING</span><p>Personal software <i>·</i> AI workflows <i>·</i> Experiments</p></div><div className="currently-row"><span className="mono">EXPLORING</span><p>Artificial intelligence <i>·</i> Automation <i>·</i> Product development</p></div></div></div></div>
  </section>
}

function Contact() {
  return <section className="contact-section section-pad" id="contact">
    <SectionMark index="08" label="THE NEXT CONVERSATION" />
    <div className="contact-layout"><div><p className="mono contact-kicker">HAVE A QUESTION / AN IDEA?</p><h2>Maybe we<br /><em>should build it.</em></h2></div><a className="contact-email" href="mailto:shritenzin@gmail.com"><span>WRITE ME A NOTE</span><strong>shritenzin<br />@gmail.com</strong><ArrowUpRight size={22} /></a></div>
    <div className="social-links"><a href="https://github.com/TenzinWangchuKhongsai" target="_blank" rel="noreferrer"><Github size={16} /> GITHUB <ArrowUpRight size={13} /></a><a href="https://www.linkedin.com/in/tenzin-wangchu-khongsai/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LINKEDIN <ArrowUpRight size={13} /></a><span className="mono social-location">CHENNAI / INDIA</span></div>
  </section>
}

function Footer() {
  return <footer className="site-footer"><div className="footer-name">TENZIN WANGCHU KHONGSAI</div><div className="footer-meta mono"><span>CHENNAI / INDIA</span><span>CSE × DATA SCIENCE</span><span>© 2026</span></div><p>Still learning. Still building.</p></footer>
}

export default function PortfolioWorkbench() {
  return <div className="portfolio-workbench"><Navigation /><main><Hero /><Introduction /><ProjectArchive /><SystemsPlayground /><BuildMethod /><LearningAndAcademics /><AboutAndNow /><Contact /></main><Footer /></div>
}
