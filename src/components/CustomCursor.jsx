import { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   PREMIUM DYNAMIC ACTION CURSOR
   Inspired by www.worksruthi.com & Awwwards site of the year:
   - High-performance Lerp tracking with velocity & inertia
   - Morphing action badge with verbs: "PLAY ▶", "EXPLORE ↗", "LEARN ↗", "HIRE ✉", "CLOSE ✕"
   - Subtle magnetic pull & specular glow
   - Adapts to dark/light/sunset surfaces
   - Automatically disabled on touch / mobile devices
   ═══════════════════════════════════════════════════════════════════ */

export default function CustomCursor() {
  const [activeVerb, setActiveVerb] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorTone, setCursorTone] = useState('peach'); // 'peach' | 'pink' | 'white'
  const [ripples, setRipples] = useState([]);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const badgeRef = useRef(null);

  const pos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const target = useRef({ x: -200, y: -200 });
  const raf = useRef(null);

  const isTouch =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (isTouch) return;

    const onMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = (e) => {
      setIsClicking(true);
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseOver = (e) => {
      const targetEl = e.target;
      const cursorTarget = targetEl.closest('[data-cursor]');
      const clickable = targetEl.closest('a, button, [role="button"], input, .cursor-pointer');

      if (cursorTarget) {
        const verb = cursorTarget.getAttribute('data-cursor');
        const tone = cursorTarget.getAttribute('data-cursor-tone') || 'peach';
        setActiveVerb(verb || '');
        setCursorTone(tone);
        setIsHovered(true);
      } else if (clickable) {
        setActiveVerb('');
        setCursorTone('pink');
        setIsHovered(true);
      }
    };

    const onMouseOut = (e) => {
      const related = e.relatedTarget;
      if (!related || !related.closest('[data-cursor], a, button, [role="button"]')) {
        setActiveVerb('');
        setIsHovered(false);
      }
    };

    // Smooth Lerp loop: dot is ultra-responsive (0.4), trailing ring has fluid inertia (0.16)
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.4);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.4);

      ringPos.current.x = lerp(ringPos.current.x, target.current.x, 0.16);
      ringPos.current.y = lerp(ringPos.current.y, target.current.y, 0.16);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const toneBg =
    cursorTone === 'pink'
      ? '#F8B1C6'
      : cursorTone === 'peach'
      ? '#FBC086'
      : '#FFFFFF';

  const toneText = '#0B0E14';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* ── 1. Sharp Center Dot (hidden when active verb is shown) ── */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full transition-opacity duration-200 pointer-events-none"
        style={{
          width: isClicking ? '4px' : isHovered && !activeVerb ? '8px' : '6px',
          height: isClicking ? '4px' : isHovered && !activeVerb ? '8px' : '6px',
          background: isHovered ? toneBg : '#FFFFFF',
          opacity: activeVerb ? 0 : 0.9,
          boxShadow: isHovered ? `0 0 12px ${toneBg}` : '0 0 8px rgba(255,255,255,0.7)',
          willChange: 'transform',
        }}
      />

      {/* ── 2. Fluid Trailing Ring (scales up smoothly on hover, shrinks on click) ── */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          width: activeVerb ? '0px' : isClicking ? '26px' : isHovered ? '48px' : '32px',
          height: activeVerb ? '0px' : isClicking ? '26px' : isHovered ? '48px' : '32px',
          border: `1.5px solid ${isHovered ? toneBg : 'rgba(255, 255, 255, 0.4)'}`,
          opacity: activeVerb ? 0 : 0.8,
          background: isHovered ? `${toneBg}12` : 'transparent',
          boxShadow: isHovered ? `0 0 20px ${toneBg}40` : 'none',
          willChange: 'transform, width, height',
        }}
      />

      {/* ── 3. Dynamic Click Ripples ── */}
      {ripples.map((rip) => (
        <span
          key={rip.id}
          className="fixed rounded-full pointer-events-none animate-ping"
          style={{
            left: rip.x,
            top: rip.y,
            width: '36px',
            height: '36px',
            transform: 'translate(-50%, -50%)',
            border: `1.5px solid ${toneBg}`,
            opacity: 0.6,
            animationDuration: '0.6s',
            animationIterationCount: '1',
            animationFillMode: 'forwards',
          }}
        />
      ))}

      {/* ── 3. Worksruthi-Style Morphing Action Badge (PLAY, EXPLORE, LEARN, HIRE) ── */}
      <div
        ref={badgeRef}
        className="fixed top-0 left-0 pointer-events-none transition-all duration-200 ease-out"
        style={{
          opacity: activeVerb ? 1 : 0,
          transformOrigin: 'center center',
          scale: activeVerb ? 1 : 0.4,
          willChange: 'transform, opacity',
        }}
      >
        <div
          className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold uppercase text-[11px] tracking-wider shadow-2xl backdrop-blur-md"
          style={{
            background: toneBg,
            color: toneText,
            boxShadow: `0 8px 30px ${toneBg}60, 0 2px 10px rgba(0,0,0,0.8)`,
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}
        >
          <span>{activeVerb}</span>
        </div>
      </div>
    </div>
  );
}