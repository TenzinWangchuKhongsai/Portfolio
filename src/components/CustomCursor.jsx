import { useEffect, useRef } from 'react';

/*
 * CustomCursor — zero setState, pure DOM writes.
 * All position + state updates bypass React entirely for 60fps smoothness.
 */

export default function CustomCursor() {
  const dotRef    = useRef(null);
  const ringRef   = useRef(null);
  const badgeRef  = useRef(null);
  const badgeLbl  = useRef(null);

  const isTouch =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (isTouch) return;

    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const badge = badgeRef.current;
    const lbl   = badgeLbl.current;
    if (!dot || !ring || !badge) return;

    const pos     = { x: -200, y: -200 };
    const ringPos = { x: -200, y: -200 };
    const target  = { x: -200, y: -200 };
    let   raf     = null;
    let   tone    = '#FBC086'; // peach default

    const lerp = (a, b, f) => a + (b - a) * f;

    const setTone = (t) => { tone = t; };

    const setVerb = (verb) => {
      if (verb) {
        lbl.textContent = verb;
        badge.style.opacity = '1';
        badge.style.scale = '1';
        dot.style.opacity = '0';
        ring.style.opacity = '0';
      } else {
        badge.style.opacity = '0';
        badge.style.scale = '0.4';
        dot.style.opacity = '0.9';
        ring.style.opacity = '0.8';
      }
      badge.style.background = tone;
    };

    const setHovered = (on) => {
      if (on) {
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.background = tone;
        ring.style.width = '48px';
        ring.style.height = '48px';
        ring.style.borderColor = tone;
      } else {
        dot.style.width = '6px';
        dot.style.height = '6px';
        dot.style.background = '#FFFFFF';
        ring.style.width = '32px';
        ring.style.height = '32px';
        ring.style.borderColor = 'rgba(255,255,255,0.4)';
      }
    };

    const animate = () => {
      pos.x = lerp(pos.x, target.x, 0.4);
      pos.y = lerp(pos.y, target.y, 0.4);
      ringPos.x = lerp(ringPos.x, target.x, 0.16);
      ringPos.y = lerp(ringPos.y, target.y, 0.16);

      dot.style.transform   = `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%)`;
      ring.style.transform  = `translate3d(${ringPos.x}px,${ringPos.y}px,0) translate(-50%,-50%)`;
      badge.style.transform = `translate3d(${ringPos.x}px,${ringPos.y}px,0) translate(-50%,-50%)`;

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onOver = (e) => {
      const ct = e.target.closest('[data-cursor]');
      const cl = e.target.closest('a, button, [role="button"], input, .cursor-pointer');
      if (ct) {
        const v = ct.getAttribute('data-cursor') || '';
        const t = ct.getAttribute('data-cursor-tone') === 'pink' ? '#F8B1C6'
                : ct.getAttribute('data-cursor-tone') === 'white' ? '#FFFFFF'
                : '#FBC086';
        setTone(t);
        setHovered(true);
        setVerb(v);
      } else if (cl) {
        setTone('#F8B1C6');
        setHovered(true);
        setVerb('');
      }
    };

    const onOut = (e) => {
      const rel = e.relatedTarget;
      if (!rel || !rel.closest('[data-cursor], a, button, [role="button"]')) {
        setVerb('');
        setHovered(false);
      }
    };

    // Lightweight click ripple — one-shot CSS animation via a temporary span
    const onDown = (e) => {
      dot.style.width = '4px';
      dot.style.height = '4px';
      ring.style.width = '26px';
      ring.style.height = '26px';
      // small DOM ripple — appended and self-removed
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:fixed;left:${e.clientX}px;top:${e.clientY}px;
        width:36px;height:36px;border-radius:50%;pointer-events:none;
        border:1.5px solid ${tone};opacity:0.6;
        transform:translate(-50%,-50%);
        animation:cursor-ping 0.6s ease-out forwards;
        z-index:9999;
      `;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    };
    const onUp = () => {
      dot.style.width = '6px';
      dot.style.height = '6px';
      ring.style.width = '32px';
      ring.style.height = '32px';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout',  onOut,  { passive: true });
    window.addEventListener('mousedown',   onDown);
    window.addEventListener('mouseup',     onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      window.removeEventListener('mousedown',   onDown);
      window.removeEventListener('mouseup',     onUp);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Sharp center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          width: '6px', height: '6px',
          background: '#FFFFFF',
          opacity: 0.9,
          boxShadow: '0 0 8px rgba(255,255,255,0.7)',
          willChange: 'transform',
          transition: 'width 0.15s, height 0.15s, background 0.15s',
        }}
      />

      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          width: '32px', height: '32px',
          border: '1.5px solid rgba(255,255,255,0.4)',
          opacity: 0.8,
          willChange: 'transform',
          transition: 'width 0.2s ease-out, height 0.2s ease-out, border-color 0.2s, opacity 0.2s',
        }}
      />

      {/* Morphing action badge */}
      <div
        ref={badgeRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ opacity: 0, scale: 0.4, willChange: 'transform, opacity', transition: 'opacity 0.15s, scale 0.15s' }}
      >
        <div
          className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold uppercase text-[11px] tracking-wider shadow-2xl backdrop-blur-md"
          style={{ background: '#FBC086', color: '#0B0E14', border: '1px solid rgba(255,255,255,0.6)' }}
        >
          <span ref={badgeLbl} />
        </div>
      </div>

      {/* Keyframe for ripple */}
      <style>{`@keyframes cursor-ping { to { transform:translate(-50%,-50%) scale(2.2); opacity:0; } }`}</style>
    </div>
  );
}
