import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
 * ScrollAnimations.jsx — Performance-optimised
 * ═════════════════════════════════════════════
 * Same cinematic reveals as before, with 3 performance fixes:
 *  1. clipWrap() REMOVED — it destroyed & rebuilt DOM causing massive reflow.
 *     Replaced with simple opacity+y fade-up on the whole heading element.
 *  2. All `scrub` parallax removed — running every scroll tick kills fps.
 *     Replaced with tasteful one-shot entrance animations (same feel).
 *  3. All animations use toggleActions 'play none none none' (fire once).
 *
 * Zero content, text, layout, or image changes.
 */

export default function ScrollAnimations() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    initialized.current = true;

    // Small delay so Lenis finishes its first tick and DOM is settled
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ──────────────────────────────────────────────
        // SECTION 1 — HERO — Ken-Burns scale entrance
        // ──────────────────────────────────────────────
        const heroVideo = document.querySelector('#hero video');
        if (heroVideo) {
          gsap.fromTo(heroVideo,
            { scale: 1.08 },
            { scale: 1.0, duration: 2.2, ease: 'power2.out' }
          );
        }

        // ──────────────────────────────────────────────
        // SECTION 2 — EDITIONS — Scale reveal from dark
        // ──────────────────────────────────────────────
        const editionsSection = document.querySelector('#editions');
        if (editionsSection) {
          const showcase = editionsSection.querySelector('[class*="rounded-"][class*="overflow-hidden"] img');
          if (showcase) {
            const wrap = showcase.closest('[class*="rounded-"]');
            gsap.fromTo(wrap,
              { opacity: 0, scale: 0.88, y: 50 },
              {
                opacity: 1, scale: 1, y: 0,
                duration: 1.3, ease: 'expo.out',
                scrollTrigger: { trigger: wrap, start: 'top 85%', toggleActions: 'play none none none' }
              }
            );
          }

          const detailCards = editionsSection.querySelectorAll('[style*="radial-gradient"]');
          detailCards.forEach((card, i) => {
            if (card.dataset.anim) return;
            card.dataset.anim = '1';
            gsap.fromTo(card,
              { opacity: 0, y: 70, rotationX: 4, transformOrigin: 'top center' },
              {
                opacity: 1, y: 0, rotationX: 0,
                duration: 1.1, delay: i * 0.15, ease: 'expo.out',
                scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
              }
            );
          });
        }

        // ──────────────────────────────────────────────
        // SECTION 3 — BACKOFBOX NARRATIVE
        // Heading & body fade up — no DOM surgery
        // ──────────────────────────────────────────────
        const narrative = document.querySelector('#narrative');
        if (narrative) {
          // Heading — simple fade-up (replaces the DOM-destroying clipWrap)
          const headline = narrative.querySelector('h2');
          if (headline) {
            gsap.fromTo(headline,
              { opacity: 0, y: 50 },
              {
                opacity: 1, y: 0,
                duration: 1.1, ease: 'expo.out',
                scrollTrigger: { trigger: narrative, start: 'top 80%', toggleActions: 'play none none none' }
              }
            );
          }

          const body = narrative.querySelector('p');
          if (body) {
            gsap.fromTo(body,
              { opacity: 0, y: 30 },
              {
                opacity: 1, y: 0,
                duration: 1.0, delay: 0.25, ease: 'power3.out',
                scrollTrigger: { trigger: body, start: 'top 85%', toggleActions: 'play none none none' }
              }
            );
          }

          const creds = narrative.querySelectorAll('[class*="font-bold"]');
          if (creds.length) {
            gsap.fromTo(creds,
              { opacity: 0, x: -20 },
              {
                opacity: 1, x: 0,
                duration: 0.7, stagger: 0.1, ease: 'power3.out',
                scrollTrigger: {
                  trigger: narrative.querySelector('.flex.flex-wrap'),
                  start: 'top 90%', toggleActions: 'play none none none'
                }
              }
            );
          }
        }

        // ──────────────────────────────────────────────
        // SECTION 4 — PROJECTS — Card surge from below
        // ──────────────────────────────────────────────
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
          const headerLine = projectsSection.querySelector('[class*="border-b"]');
          if (headerLine) {
            gsap.fromTo(headerLine,
              { scaleX: 0, transformOrigin: 'left center' },
              {
                scaleX: 1, duration: 1.2, ease: 'expo.out',
                scrollTrigger: { trigger: headerLine, start: 'top 90%', toggleActions: 'play none none none' }
              }
            );
          }

          const promoCards = projectsSection.querySelectorAll('[class*="rounded-"][class*="cursor-pointer"][class*="overflow-hidden"]');
          promoCards.forEach((card, i) => {
            if (card.dataset.anim) return;
            card.dataset.anim = '1';
            gsap.set(card, { transformPerspective: 1000 });
            gsap.fromTo(card,
              { opacity: 0, y: 90, rotationX: 8, scale: 0.95, transformOrigin: 'center bottom' },
              {
                opacity: 1, y: 0, rotationX: 0, scale: 1,
                duration: 1.2, delay: i * 0.1, ease: 'expo.out',
                scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
              }
            );
          });
        }

        // ──────────────────────────────────────────────
        // SECTION 5 — EDITORIAL IDENTITY
        // Removed scrub parallax on palm (was running every frame)
        // ──────────────────────────────────────────────
        const identity = document.querySelector('#identity');
        if (identity) {
          const chapterLabel = identity.querySelector('[class*="tracking-"]');
          if (chapterLabel) {
            gsap.fromTo(chapterLabel,
              { opacity: 0, x: -30 },
              {
                opacity: 1, x: 0, duration: 1.0, ease: 'power3.out',
                scrollTrigger: { trigger: chapterLabel, start: 'top 88%', toggleActions: 'play none none none' }
              }
            );
          }

          // Heading — simple fade-up (clipWrap removed)
          const heading = identity.querySelector('h2');
          if (heading) {
            gsap.fromTo(heading,
              { opacity: 0, y: 50 },
              {
                opacity: 1, y: 0, duration: 1.0, ease: 'expo.out',
                scrollTrigger: { trigger: heading, start: 'top 82%', toggleActions: 'play none none none' }
              }
            );
          }

          const paras = identity.querySelectorAll('p');
          paras.forEach((p, i) => {
            if (p.dataset.anim) return;
            p.dataset.anim = '1';
            gsap.fromTo(p,
              { opacity: 0, y: 25 },
              {
                opacity: 1, y: 0,
                duration: 0.9, delay: i * 0.08, ease: 'power3.out',
                scrollTrigger: { trigger: p, start: 'top 90%', toggleActions: 'play none none none' }
              }
            );
          });

          const credCards = identity.querySelectorAll('[class*="rounded-\\[22px\\]"]');
          credCards.forEach((card, i) => {
            if (card.dataset.anim) return;
            card.dataset.anim = '1';
            gsap.fromTo(card,
              { opacity: 0, y: 50 + i * 10 },
              {
                opacity: 1, y: 0,
                duration: 0.95, delay: i * 0.12, ease: 'expo.out',
                scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
              }
            );
          });

          const photoStrip = identity.querySelector('[class*="grid-cols-2"]');
          if (photoStrip) {
            Array.from(photoStrip.children).forEach((photo, i) => {
              if (photo.dataset.anim) return;
              photo.dataset.anim = '1';
              gsap.fromTo(photo,
                { opacity: 0, y: 55, rotation: i === 0 ? -3 : 3, scale: 0.94 },
                {
                  opacity: 1, y: 0, rotation: 0, scale: 1,
                  duration: 1.0, delay: 0.1 + i * 0.15, ease: 'expo.out',
                  scrollTrigger: { trigger: photoStrip, start: 'top 85%', toggleActions: 'play none none none' }
                }
              );
            });
          }

          // Palm — one-shot fade in (scrub removed)
          const palm = identity.querySelector('img[src*="art-right"]');
          if (palm) {
            gsap.fromTo(palm,
              { opacity: 0, y: 30 },
              {
                opacity: 0.06, y: 0, duration: 1.5, ease: 'power2.out',
                scrollTrigger: { trigger: identity, start: 'top 85%', toggleActions: 'play none none none' }
              }
            );
          }
        }

        // ──────────────────────────────────────────────
        // SECTION 6 — THE LAB — L/R alternating cards
        // ──────────────────────────────────────────────
        const lab = document.querySelector('#lab');
        if (lab) {
          const labHeading = lab.querySelector('h2');
          if (labHeading) {
            gsap.fromTo(labHeading,
              { opacity: 0, y: 40 },
              {
                opacity: 1, y: 0, duration: 1.0, ease: 'expo.out',
                scrollTrigger: { trigger: labHeading, start: 'top 85%', toggleActions: 'play none none none' }
              }
            );
          }

          const labDesc = lab.querySelector('p');
          if (labDesc) {
            gsap.fromTo(labDesc,
              { opacity: 0, y: 24 },
              {
                opacity: 1, y: 0,
                duration: 0.9, delay: 0.25, ease: 'power3.out',
                scrollTrigger: { trigger: labDesc, start: 'top 88%', toggleActions: 'play none none none' }
              }
            );
          }

          const skillGrid = lab.querySelector('[class*="grid-cols-4"], [class*="md:grid-cols-2"]');
          if (skillGrid) {
            Array.from(skillGrid.children).forEach((card, i) => {
              if (card.dataset.anim) return;
              card.dataset.anim = '1';
              const fromLeft = i % 2 === 0;
              gsap.fromTo(card,
                { opacity: 0, x: fromLeft ? -70 : 70, y: 30 },
                {
                  opacity: 1, x: 0, y: 0,
                  duration: 1.0, delay: i * 0.07, ease: 'expo.out',
                  scrollTrigger: { trigger: skillGrid, start: 'top 85%', toggleActions: 'play none none none' }
                }
              );
            });
          }

          const achSection = lab.querySelector('[class*="grid-cols-5"]');
          if (achSection) {
            Array.from(achSection.children).forEach((card, i) => {
              if (card.dataset.anim) return;
              card.dataset.anim = '1';
              gsap.set(card, { transformPerspective: 800 });
              gsap.fromTo(card,
                { opacity: 0, y: 60, scale: 0.9, rotationY: i % 2 === 0 ? 15 : -15 },
                {
                  opacity: 1, y: 0, scale: 1, rotationY: 0,
                  duration: 0.9, delay: i * 0.09, ease: 'expo.out',
                  scrollTrigger: { trigger: achSection, start: 'top 88%', toggleActions: 'play none none none' }
                }
              );
            });
          }
        }

        // ──────────────────────────────────────────────
        // SECTION 7 — NEWSWIRE — Cascade card entrance
        // ──────────────────────────────────────────────
        const newswire = document.querySelector('#newswire');
        if (newswire) {
          const nwHeading = newswire.querySelector('h2');
          if (nwHeading) {
            gsap.fromTo(nwHeading,
              { opacity: 0, y: 40 },
              {
                opacity: 1, y: 0, duration: 1.0, ease: 'expo.out',
                scrollTrigger: { trigger: newswire, start: 'top 82%', toggleActions: 'play none none none' }
              }
            );
          }

          const nwGrid = newswire.querySelector('[class*="grid-cols-4"]');
          if (nwGrid) {
            Array.from(nwGrid.children).forEach((card, i) => {
              if (card.dataset.anim) return;
              card.dataset.anim = '1';
              gsap.fromTo(card,
                { opacity: 0, y: 65 + i * 12, scale: 0.93 },
                {
                  opacity: 1, y: 0, scale: 1,
                  duration: 1.0, delay: i * 0.12, ease: 'expo.out',
                  scrollTrigger: { trigger: newswire, start: 'top 82%', toggleActions: 'play none none none' }
                }
              );
            });
          }
        }

        // ──────────────────────────────────────────────
        // SECTION 8 — CONTACT FINALE
        // scrub palm removed; replaced with one-shot fade
        // ──────────────────────────────────────────────
        const contact = document.querySelector('#contact');
        if (contact) {
          const logo = contact.querySelector('[class*="mb-6"] img');
          if (logo?.parentElement) {
            gsap.fromTo(logo.parentElement,
              { opacity: 0, y: -60, scale: 0.75 },
              {
                opacity: 1, y: 0, scale: 1,
                duration: 1.2, ease: 'back.out(1.4)',
                scrollTrigger: { trigger: contact, start: 'top 75%', toggleActions: 'play none none none' }
              }
            );
          }

          const ctaHeading = contact.querySelector('h2');
          if (ctaHeading) {
            gsap.fromTo(ctaHeading,
              { opacity: 0, y: 50 },
              {
                opacity: 1, y: 0,
                duration: 1.1, ease: 'expo.out',
                scrollTrigger: { trigger: ctaHeading, start: 'top 85%', toggleActions: 'play none none none' }
              }
            );
          }

          // Palm — one-shot (scrub removed)
          const contactPalm = contact.querySelector('img[src*="art-left"]');
          if (contactPalm) {
            gsap.fromTo(contactPalm,
              { opacity: 0, y: 20 },
              {
                opacity: 0.06, y: 0,
                duration: 1.5, ease: 'power2.out',
                scrollTrigger: { trigger: contact, start: 'top 80%', toggleActions: 'play none none none' }
              }
            );
          }

          const cta = contact.querySelector('a[href*="mailto"]');
          if (cta) {
            gsap.fromTo(cta,
              { opacity: 0, scale: 0.8, y: 20 },
              {
                opacity: 1, scale: 1, y: 0,
                duration: 0.85, ease: 'back.out(2)',
                scrollTrigger: { trigger: cta, start: 'top 90%', toggleActions: 'play none none none' }
              }
            );
          }

          const contactCards = contact.querySelectorAll('[class*="grid-cols-3"] > div, [class*="grid-cols-3"] > [class*="motion"]');
          contactCards.forEach((card, i) => {
            if (card.dataset.anim) return;
            card.dataset.anim = '1';
            gsap.fromTo(card,
              { opacity: 0, y: 40, scale: 0.95 },
              {
                opacity: 1, y: 0, scale: 1,
                duration: 0.85, delay: i * 0.12, ease: 'expo.out',
                scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
              }
            );
          });
        }

        // ──────────────────────────────────────────────
        // GLOBAL — Divider line wipe
        // ──────────────────────────────────────────────
        const sectionDividers = document.querySelectorAll('#projects [class*="border-b"], #lab [class*="border-t"], #identity [class*="border-t"]');
        sectionDividers.forEach((div) => {
          if (div.dataset.anim) return;
          div.dataset.anim = '1';
          gsap.fromTo(div,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1, duration: 1.4, ease: 'expo.out',
              scrollTrigger: { trigger: div, start: 'top 92%', toggleActions: 'play none none none' }
            }
          );
        });

        ScrollTrigger.refresh();

      }); // end gsap.context

      return () => ctx.revert();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
