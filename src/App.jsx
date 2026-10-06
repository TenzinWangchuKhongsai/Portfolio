import './App.css';
import CustomCursor from './components/CustomCursor';
import EditorialNav from './components/EditorialNav';
import CinematicHero from './components/CinematicHero';
import ProjectSequence from './components/ProjectSequence';
import ArchitectureLab from './components/ArchitectureLab';
import EditorialIdentity from './components/EditorialIdentity';
import TheLab from './components/TheLab';
import ContactFinale from './components/ContactFinale';
import Interactive3DCanvas from './components/Interactive3DCanvas';

export default function App() {
  return (
    <>
      {/* Interactive 3D Canvas Background */}
      <Interactive3DCanvas />

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Editorial navigation — appears after hero scroll */}
      <EditorialNav />

      {/* Visual narrative: six scenes */}
      <main>
        {/* Scene 01 — Overture */}
        <CinematicHero />

        {/* Scene 02 — What I Build */}
        <ProjectSequence />

        {/* Scene 03 — How It Works */}
        <ArchitectureLab />

        {/* Scene 04 — The Person (light section) */}
        <EditorialIdentity />

        {/* Scene 05 — The Lab */}
        <TheLab />

        {/* Scene 06 — Let's Build Something */}
        <ContactFinale />
      </main>
    </>
  );
}
