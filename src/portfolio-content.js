export const projects = [
  {
    id: 'aura',
    number: '01',
    category: 'PERSONAL INTELLIGENCE',
    title: 'AURA',
    subtitle: 'A personal productivity system, explored from the inside out.',
    description: 'An exploration of personal productivity and information: turning everyday intent into a schedule that can be understood, persisted, and revisited.',
    image: null,
    imageAlt: '',
    visual: 'aura',
    technologies: ['Android', 'Jetpack Compose', 'Room', 'StateFlow', 'WorkManager'],
    idea: 'Make a personal schedule easier to shape using natural language and a clear view of what comes next.',
    system: 'Compose UI → ViewModel → StateFlow → Room → WorkManager → natural-language layer.',
    experiment: 'Exploring the boundaries between a reactive interface, local persistence, background work, and natural-language input.',
    state: 'Project exploration',
  },
  {
    id: 'padho',
    number: '02',
    category: 'MEDIA AUTOMATION',
    title: 'PADHO AUR SHIKHO INDIA.NEWS',
    subtitle: 'An AI-assisted newsroom and media automation pipeline.',
    description: 'A digital newsroom concept that connects incoming stories with AI-assisted processing, audio, media generation, and a publishing workflow.',
    image: '/projects/padho/newsroom.jpg',
    imageAlt: 'Padho newsroom pipeline console interface',
    visual: 'image',
    technologies: ['RSS', 'Processing', 'AI', 'TTS', 'Media generation', 'Express', 'SQLite'],
    idea: 'Explore how a story can move through a repeatable production pipeline, from source material to a publishable media format.',
    system: 'RSS → processing → AI → TTS → media generation → Express → SQLite → publishing.',
    experiment: 'Thinking through the hand-offs between text, audio, media assets, and a publishing queue.',
    state: 'Architecture visualization',
  },
  {
    id: 'career-agent',
    number: '03',
    category: 'RESEARCH & OUTREACH',
    title: 'CAREER AGENT',
    subtitle: 'A research-first system for thoughtful career exploration.',
    description: 'A concept for researching roles and organizations before drafting personalized outreach, with evidence and human review at the center.',
    image: null,
    imageAlt: '',
    visual: 'career',
    technologies: ['Research', 'Evidence', 'Personalization', 'Human review'],
    idea: 'Make career research more deliberate by grounding each next step in information that can be checked.',
    system: 'Research → evidence → personalization → human review.',
    experiment: 'Exploring how automation can support careful research without removing a person from the decision.',
    state: 'Project exploration',
  },
  {
    id: 'smart-office',
    number: '04',
    category: 'IOT & SIMULATION',
    title: 'SMART OFFICE',
    subtitle: 'Occupancy, energy, and the systems that connect them.',
    description: 'An IoT and occupancy-detection simulation exploring how environmental signals could inform energy-aware office systems.',
    image: '/projects/smart_office.jpg',
    imageAlt: 'Smart office occupancy and energy system interface',
    visual: 'image',
    technologies: ['IoT', 'Occupancy detection', 'Energy optimization', 'Simulation'],
    idea: 'Explore how a workspace might respond to occupancy and environmental context rather than running on fixed assumptions.',
    system: 'Sensors → occupancy signal → decision logic → simulated office response.',
    experiment: 'Connecting sensing, simple system logic, and an interface for observing a simulated environment.',
    state: 'Simulation',
  },
  {
    id: 'systems',
    number: '05',
    category: 'EXPERIMENTAL ARCHIVE',
    title: 'SYSTEMS & SIMULATIONS',
    subtitle: 'Small experiments that make abstract systems tangible.',
    description: 'A growing archive of experiments across simulations, computer vision, networks, and intelligent systems.',
    image: '/projects/first_drive.jpg',
    imageAlt: 'Vehicle simulation interface with system telemetry',
    visual: 'image',
    technologies: ['Simulations', 'Computer vision', 'Networks', 'Intelligent systems'],
    idea: 'Use small, concrete experiments to understand how a system behaves when its parts interact.',
    system: 'Models, signals, and interfaces—connected differently in each experiment.',
    experiment: 'Building a foundation through exploration, iteration, and observing the behaviour of systems.',
    state: 'Ongoing archive',
  },
];

export const architectures = {
  aura: {
    title: 'AURA / PERSONAL INFORMATION FLOW',
    note: 'An architecture visualization — not a live service.',
    nodes: [
      ['COMPOSE UI', 'A place to express and view an intention.'],
      ['VIEWMODEL', 'Coordinates screen-level state and actions.'],
      ['STATEFLOW', 'Carries observable state back to the interface.'],
      ['ROOM', 'Provides a local persistence layer.'],
      ['WORKMANAGER', 'Represents scheduled background work.'],
      ['NATURAL LANGUAGE', 'Explores turning a phrase into structured intent.'],
    ],
  },
  padho: {
    title: 'PADHO / MEDIA PIPELINE',
    note: 'A pipeline visualization — no live processing is performed here.',
    nodes: [
      ['RSS', 'A source of incoming stories.'],
      ['PROCESSING', 'Prepares a story for the next stage.'],
      ['AI', 'Assists with transforming source material.'],
      ['TTS', 'Turns prepared text into speech.'],
      ['MEDIA GENERATION', 'Combines the required output assets.'],
      ['EXPRESS', 'A web layer in the described pipeline.'],
      ['SQLITE', 'A local persistence point in the flow.'],
      ['PUBLISHING', 'The final destination of a prepared item.'],
    ],
  },
};

export const buildStages = [
  { name: 'IDEA', detail: 'Start with a problem worth understanding.' },
  { name: 'RESEARCH', detail: 'Understand the problem before choosing the technology.' },
  { name: 'ARCHITECTURE', detail: 'Think about how the pieces should work together.' },
  { name: 'DESIGN', detail: 'Make the system legible to the person using it.' },
  { name: 'BUILD', detail: 'Turn the concept into something real.' },
  { name: 'TEST', detail: 'Break it deliberately and learn from what happens.' },
  { name: 'ITERATE', detail: 'Keep the useful parts; improve the rest.' },
];

export const skillGroups = [
  { title: 'PROGRAMMING', skills: 'Python · Java · JavaScript · C · HTML · CSS' },
  { title: 'DATA', skills: 'SQL · Pandas · NumPy · Statistics' },
  { title: 'AI & INTELLIGENCE', skills: 'Machine learning · Computer vision · AI workflows' },
  { title: 'SYSTEMS', skills: 'IoT · APIs · Databases · Automation · Simulations' },
  { title: 'DEVELOPMENT', skills: 'React · Vite · Android · Backend · SQLite' },
];

export const currently = [
  { label: 'LEARNING', items: ['Data structures', 'Java', 'Statistics', 'Machine learning'] },
  { label: 'BUILDING', items: ['Personal software systems', 'AI workflows', 'Portfolio', 'Experiments'] },
  { label: 'EXPLORING', items: ['Artificial intelligence', 'Automation', 'Computer vision', 'Product development'] },
];

export const academics = [
  {
    institution: 'SIMATS ENGINEERING COLLEGE',
    degree: 'B.E. Computer Science & Engineering',
    detail: 'Building a foundation in computer science and software systems.',
    metric: 'CGPA / 9.0',
    timeline: 'EXPECTED / 2029',
  },
  {
    institution: 'IIT MADRAS',
    degree: 'BS in Data Science',
    detail: 'An ongoing foundational-level program complementing engineering with data science and analytical thinking.',
    metric: 'CGPA / 8.0',
    timeline: 'FOUNDATIONAL LEVEL / ONGOING',
  },
];

export const contactLinks = [
  { label: 'EMAIL', value: 'shritenzin@gmail.com', href: 'mailto:shritenzin@gmail.com' },
  {
    label: 'GITHUB',
    value: 'TenzinWangchuKhongsai',
    href: 'https://github.com/TenzinWangchuKhongsai',
  },
  {
    label: 'LINKEDIN',
    value: 'tenzin-wangchu-khongsai',
    href: 'https://www.linkedin.com/in/tenzin-wangchu-khongsai/',
  },
];

export const istTime = () =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());

export const getProject = (id) => projects.find((project) => project.id === id);

export const getProjectImage = (id) => getProject(id)?.image ?? null;

export const getProjectLabel = (id) => getProject(id)?.title ?? id;

export const getContactUrl = (label) => contactLinks.find((link) => link.label === label)?.href;

export const heroMeta = {
  location: 'CHENNAI / INDIA',
  study: 'CSE + DATA SCIENCE',
  mode: 'BUILDING / LEARNING / EXPERIMENTING',
};

export const projectIds = projects.map((project) => project.id);

export const projectCount = projects.length;

export const primaryProjects = projects.slice(0, 4);

export const additionalProjects = projects.slice(4);

export const pageTitle = 'Tenzin Wangchu Khongsai';

export const pageDescription = 'A digital workbench for Tenzin Wangchu Khongsai — computer science and data science student, software developer, and technology builder in Chennai, India.';

export const footerStatement = 'Still learning. Still building.';

export const currentYear = 2026;
