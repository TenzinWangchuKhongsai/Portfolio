import './App.css';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import EditorialNav from './components/EditorialNav';
import CinematicHero from './components/CinematicHero';
import EditionCards from './components/EditionCards';
import BackOfBox from './components/BackOfBox';
import ProjectSequence from './components/ProjectSequence';
import EditorialIdentity from './components/EditorialIdentity';
import TheLab from './components/TheLab';
import NewswireSection from './components/NewswireSection';
import ContactFinale from './components/ContactFinale';
import ScrollAnimations from './components/ScrollAnimations';

export default function App() {
  return (
    <SmoothScroll>
      <div className="bg-[#080A0F] text-[#F4F4F0] min-h-screen selection:bg-[#F8B1C6] selection:text-[#0B0E14]">
        {/* Real-time fluid scroll indicator */}
        <ScrollProgress />

        {/* GSAP cinematic scroll animations — zero layout change */}
        <ScrollAnimations />

        {/* Custom smooth cursor — desktop only */}
        <CustomCursor />

        {/* GTA VI fixed navigation bar */}
        <EditorialNav />

        {/* Main page content — Exact GTA VI Section Anatomy */}
        <main>
          {/* 1. Hero Poster with Metallic TWK Logo & Video Background */}
          <CinematicHero />

          {/* 2. Ultimate Edition Cards — Dual Academic Degrees (SIMATS & IIT Madras) */}
          <EditionCards />

          {/* 3. Back-of-Box Narrative Block — "Chennai, India. I BUILD TO UNDERSTAND." */}
          <BackOfBox />

          {/* 4. Promocards — The 6 Core Engineering Projects (Padho, SecLogix, Smart Office, etc.) */}
          <ProjectSequence />

          {/* 5. Editorial Builder Profile — Portraits, Timeline & Continuous Marquee */}
          <EditorialIdentity />

          {/* 6. The Lab — Technical Arsenal & Skills Proficiency Grid */}
          <TheLab />

          {/* 7. Newswire — Verified Achievements, Tech Star Summit Winner, Conferences */}
          <NewswireSection />

          {/* 8. Outro Announcement & Official Footer — "BUILD SOMETHING WORTH EXPLORING" */}
          <ContactFinale />
        </main>
      </div>
    </SmoothScroll>
  );
}
