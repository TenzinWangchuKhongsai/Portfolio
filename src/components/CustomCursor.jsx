import { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const [expanded, setExpanded] = useState(false);
  const [label, setLabel] = useState('');
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  const isTouch = typeof window !== 'undefined'
    && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (isTouch) return;

    const move = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const handleOver = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        setExpanded(true);
        setLabel(el.getAttribute('data-cursor') || '');
      }
    };

    const handleOut = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        setExpanded(false);
        setLabel('');
      }
    };

    // Smooth interpolation loop — no lag, no springiness
    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.15);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y + 30}px) translate(-50%, 0)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${expanded ? 'expanded' : ''}`}
        style={{ top: 0, left: 0, willChange: 'transform' }}
      />
      <div
        ref={labelRef}
        className={`cursor-label ${expanded && label ? 'visible' : ''}`}
        style={{ top: 0, left: 0, willChange: 'transform' }}
      >
        {label}
      </div>
    </>
  );
}
