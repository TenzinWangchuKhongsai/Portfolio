import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Official Lenis + GSAP integration — keep the ticker reference so cleanup works
    const onScroll = ScrollTrigger.update;
    lenis.on('scroll', onScroll);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    // Keep lagSmoothing at default (60ms) — disabling it causes judder
    // gsap.ticker.lagSmoothing(0); // REMOVED: this was causing jank

    // Smooth scroll for in-page anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: -40, duration: 1.1 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(rafCallback); // remove exact same reference
      lenis.off('scroll', onScroll);
      lenis.destroy();
      delete window.__lenis;
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
