import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
 * ScrollAnimations.jsx
 * ════════════════════
 * Cinematic GSAP ScrollTrigger animations inspired by:
 *  - worksruthi.com   → clip-path word-by-word reveals, scrubbed parallax
 *  - en.thenode.gg    → staggered panel entrances, rotationX card reveals
 *  - zperinatal.com   → luxury counter-scroll text, slow ambient parallax
 *  - Rockstar GTA VI  → bold full-bleed card burst, chapter section reveals
 *
 * Zero content, text, layout, or image changes.
 * All animations target semantic section IDs or data-anim attributes.
 */

export default function ScrollAnimations() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    initialized.current = true;

    const ctx = gsap.context(() => {
      // ══════════════════════════════════════════════
      // HELPER: wrap every word in a clip-reveal shell
      // ══════════════════════════════════════════════
      const clipWrap = (el) => {
        if (!el || el.dataset.clipDone) return [];
        el.dataset.clipDone = 'true';
        const original = el.innerHTML;

        // Flatten to plain text first
        const text = el.innerText;
        el.innerHTML = '';

        const spans = [];
        text.split(' ').forEach((word, i, arr) => {
          const outer = document.createElement('span');
          outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;';
          const inner = document.createElement('span');
          inner.style.cssText = 'display:inline-block;will-change:transform;';
          inner.textContent = word + (i < arr.length - 1 ? '\u00A0' : '');
          outer.appendChild(inner);
          el.appendChild(outer);
          spans.push(inner);
        });

        return spans;
      };

      // ══════════════════════════════════════════════════════════════
      // SECTION 1 — HERO CINEMATIC ENTRANCE
      // The hero video background does a slow Ken-Burns-style zoom out
      // while the TWK monogram drops in from the top.
      // ══════════════════════════════════════════════════════════════
      const heroVideo = document.querySelector('#hero video, #hero video');
      if (heroVideo) {
        gsap.fromTo(heroVideo,
          { scale: 1.08 },
          {
            scale: 1.0,
            duration: 2.2,
            ease: 'power2.out',
          }
        );
      }

      // ══════════════════════════════════════════════════════════════
      // SECTION 2 — EDITIONS KEY ART — Scale reveal from darkness
      // Like worksruthi.com project thumbnails emerging from black
      // ══════════════════════════════════════════════════════════════
      const editionsSection = document.querySelector('#editions');
      if (editionsSection) {
        // Central showcase image
        const showcase = editionsSection.querySelector('[class*="rounded-"][class*="overflow-hidden"] img');
        if (showcase) {
          const wrap = showcase.closest('[class*="rounded-"]');
          gsap.fromTo(wrap,
            { opacity: 0, scale: 0.88, y: 50 },
            {
              opacity: 1, scale: 1, y: 0,
              duration: 1.3,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: wrap,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            }
          );
        }

        // Edition detail cards (Ultimate Edition + Vintage Pack)
        const detailCards = editionsSection.querySelectorAll('[style*="radial-gradient"]');
        detailCards.forEach((card, i) => {
          if (card.dataset.anim) return;
          card.dataset.anim = '1';
          gsap.fromTo(card,
            { opacity: 0, y: 70, rotationX: 4, transformOrigin: 'top center' },
            {
              opacity: 1, y: 0, rotationX: 0,
              duration: 1.1,
              delay: i * 0.15,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none',
              }
            }
          );
        });
      }

      // ══════════════════════════════════════════════════════════════
      // SECTION 3 — BACKOFBOX NARRATIVE — Deep counter-scroll layers
      // zperinatal.com style: background moves one direction, text
      // content counter-moves the other. Creates cinematic depth.
      // ══════════════════════════════════════════════════════════════
      const narrative = document.querySelector('#narrative');
      if (narrative) {
        const bgImg = narrative.querySelector('img[alt=""]');
        if (bgImg) {
          gsap.to(bgImg, {
            yPercent: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: narrative,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            }
          });
        }

        // The headline words burst up — worksruthi clip-reveal style
        const headline = narrative.querySelector('h2');
        if (headline) {
          const spans = clipWrap(headline);
          if (spans.length) {
            gsap.fromTo(spans,
              { yPercent: 115, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 1.1,
                stagger: 0.06,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: narrative,
                  start: 'top 80%',
                  toggleActions: 'play none none none',
                }
              }
            );
          }
        }

        // Supporting text — slow fade ascend
        const body = narrative.querySelector('p');
        if (body) {
          gsap.fromTo(body,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0,
              duration: 1.0,
              delay: 0.3,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: body,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            }
          );
        }

        // Credential strip — slide in from left, staggered
        const creds = narrative.querySelectorAll('[class*="font-bold"]');
        if (creds.length) {
          gsap.fromTo(creds,
            { opacity: 0, x: -20 },
            {
              opacity: 1, x: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: narrative.querySelector('.flex.flex-wrap'),
                start: 'top 90%',
                toggleActions: 'play none none none',
              }
            }
          );
        }
      }

      // ══════════════════════════════════════════════════════════════
      // SECTION 4 — PROJECT CARDS — Cinematic surge from below
      // en.thenode.gg style: each card bursts up with rotationX tilt,
      // giving the impression they're rising from underground
      // ══════════════════════════════════════════════════════════════
      const projectsSection = document.querySelector('#projects');
      if (projectsSection) {
        // Header strip line wipe
        const headerLine = projectsSection.querySelector('[class*="border-b"]');
        if (headerLine) {
          gsap.fromTo(headerLine,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 1.2,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: headerLine,
                start: 'top 90%',
                toggleActions: 'play none none none',
              }
            }
          );
        }

        // Project promo cards
        const promoCards = projectsSection.querySelectorAll('[class*="rounded-"][class*="cursor-pointer"][class*="overflow-hidden"]');
        promoCards.forEach((card, i) => {
          if (card.dataset.anim) return;
          card.dataset.anim = '1';

          gsap.set(card, { transformPerspective: 1000 });
          gsap.fromTo(card,
            { opacity: 0, y: 90, rotationX: 8, scale: 0.95, transformOrigin: 'center bottom' },
            {
              opacity: 1, y: 0, rotationX: 0, scale: 1,
              duration: 1.2,
              delay: i * 0.1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none',
              }
            }
          );
        });
      }

      // ══════════════════════════════════════════════════════════════
      // SECTION 5 — EDITORIAL IDENTITY — Multi-layer depth parallax
      // Luxury parallax: palm decoration, portrait window, text layers
      // all moving at different speeds = convincing 3D depth
      // ══════════════════════════════════════════════════════════════
      const identity = document.querySelector('#identity');
      if (identity) {
        // Chapter label — slide from left with letter-spacing open
        const chapterLabel = identity.querySelector('[class*="tracking-"]');
        if (chapterLabel) {
          gsap.fromTo(chapterLabel,
            { opacity: 0, x: -30, letterSpacing: '0.6em' },
            {
              opacity: 1, x: 0, letterSpacing: '0.28em',
              duration: 1.0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: chapterLabel,
                start: 'top 88%',
                toggleActions: 'play none none none',
              }
            }
          );
        }

        // Huge heading — word-by-word clip reveal (worksruthi style)
        const heading = identity.querySelector('h2');
        if (heading) {
          const spans = clipWrap(heading);
          if (spans.length) {
            gsap.fromTo(spans,
              { yPercent: 110, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 1.05,
                stagger: 0.055,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: heading,
                  start: 'top 82%',
                  toggleActions: 'play none none none',
                }
              }
            );
          }
        }

        // Bio text paragraphs — slow staggered fade ascend
        const paras = identity.querySelectorAll('p');
        paras.forEach((p, i) => {
          if (p.dataset.anim) return;
          p.dataset.anim = '1';
          gsap.fromTo(p,
            { opacity: 0, y: 25 },
            {
              opacity: 1, y: 0,
              duration: 0.9,
              delay: i * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: p,
                start: 'top 90%',
                toggleActions: 'play none none none',
              }
            }
          );
        });

        // Credential cards — slide up from different depths
        const credCards = identity.querySelectorAll('[class*="rounded-\\[22px\\]"]');
        credCards.forEach((card, i) => {
          if (card.dataset.anim) return;
          card.dataset.anim = '1';
          gsap.fromTo(card,
            { opacity: 0, y: 50 + i * 10 },
            {
              opacity: 1, y: 0,
              duration: 0.95,
              delay: i * 0.12,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none',
              }
            }
          );
        });

        // Award photo strip — alternating tilt entrance (thenode.gg style)
        const photoStrip = identity.querySelector('[class*="grid-cols-2"]');
        if (photoStrip) {
          const photos = photoStrip.children;
          Array.from(photos).forEach((photo, i) => {
            if (photo.dataset.anim) return;
            photo.dataset.anim = '1';
            gsap.fromTo(photo,
              { opacity: 0, y: 55, rotation: i === 0 ? -3 : 3, scale: 0.94 },
              {
                opacity: 1, y: 0, rotation: 0, scale: 1,
                duration: 1.0,
                delay: 0.1 + i * 0.15,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: photoStrip,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                }
              }
            );
          });
        }

        // Palm background — dramatic counter-scroll
        const palm = identity.querySelector('img[src*="art-right"]');
        if (palm) {
          gsap.fromTo(palm,
            { yPercent: 20 },
            {
              yPercent: -20,
              ease: 'none',
              scrollTrigger: {
                trigger: identity,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2.5,
              }
            }
          );
        }
      }

      // ══════════════════════════════════════════════════════════════
      // SECTION 6 — THE LAB — Skill cards deal in alternating sides
      // Inspired by thenode.gg sequential stat panel reveal:
      // odd cards slide from left, even from right
      // ══════════════════════════════════════════════════════════════
      const lab = document.querySelector('#lab');
      if (lab) {
        // Lab heading — clip reveal
        const labHeading = lab.querySelector('h2');
        if (labHeading) {
          const spans = clipWrap(labHeading);
          if (spans.length) {
            gsap.fromTo(spans,
              { yPercent: 110, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 1.05,
                stagger: 0.06,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: labHeading,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                }
              }
            );
          }
        }

        // Supporting paragraph
        const labDesc = lab.querySelector('p');
        if (labDesc) {
          gsap.fromTo(labDesc,
            { opacity: 0, y: 24 },
            {
              opacity: 1, y: 0,
              duration: 0.9,
              delay: 0.25,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: labDesc,
                start: 'top 88%',
                toggleActions: 'play none none none',
              }
            }
          );
        }

        // Skill category cards — left/right alternating entrance
        const skillGrid = lab.querySelector('[class*="grid-cols-4"], [class*="md:grid-cols-2"]');
        if (skillGrid) {
          const cards = Array.from(skillGrid.children);
          cards.forEach((card, i) => {
            if (card.dataset.anim) return;
            card.dataset.anim = '1';
            const fromLeft = i % 2 === 0;
            gsap.fromTo(card,
              { opacity: 0, x: fromLeft ? -70 : 70, y: 30 },
              {
                opacity: 1, x: 0, y: 0,
                duration: 1.0,
                delay: i * 0.07,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: skillGrid,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                }
              }
            );
          });
        }

        // Achievement cards — cascade with Y-axis rotation (3D flip effect)
        const achSection = lab.querySelector('[class*="grid-cols-5"]');
        if (achSection) {
          const achCards = Array.from(achSection.children);
          achCards.forEach((card, i) => {
            if (card.dataset.anim) return;
            card.dataset.anim = '1';
            gsap.set(card, { transformPerspective: 800 });
            gsap.fromTo(card,
              { opacity: 0, y: 60, scale: 0.9, rotationY: i % 2 === 0 ? 15 : -15 },
              {
                opacity: 1, y: 0, scale: 1, rotationY: 0,
                duration: 0.9,
                delay: i * 0.09,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: achSection,
                  start: 'top 88%',
                  toggleActions: 'play none none none',
                }
              }
            );
          });
        }
      }

      // ══════════════════════════════════════════════════════════════
      // SECTION 7 — NEWSWIRE — Stagger-cascade card entrance
      // Like worksruthi.com portfolio grid: cards cascade up with
      // increasing delay, as if being dealt like playing cards
      // ══════════════════════════════════════════════════════════════
      const newswire = document.querySelector('#newswire');
      if (newswire) {
        // Heading with clip reveal
        const nwHeading = newswire.querySelector('h2');
        if (nwHeading) {
          const spans = clipWrap(nwHeading);
          if (spans.length) {
            gsap.fromTo(spans,
              { yPercent: 115, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 1.0,
                stagger: 0.07,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: newswire,
                  start: 'top 82%',
                  toggleActions: 'play none none none',
                }
              }
            );
          }
        }

        // The 4 news cards — cascade stagger, each from below
        const nwGrid = newswire.querySelector('[class*="grid-cols-4"]');
        if (nwGrid) {
          const nwCards = Array.from(nwGrid.children);
          nwCards.forEach((card, i) => {
            if (card.dataset.anim) return;
            card.dataset.anim = '1';
            gsap.fromTo(card,
              { opacity: 0, y: 65 + i * 12, scale: 0.93 },
              {
                opacity: 1, y: 0, scale: 1,
                duration: 1.0,
                delay: i * 0.12,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: newswire,
                  start: 'top 82%',
                  toggleActions: 'play none none none',
                }
              }
            );
          });
        }
      }

      // ══════════════════════════════════════════════════════════════
      // SECTION 8 — CONTACT FINALE — Dramatic emergence from dark
      // Like GTA VI outro-announcement: logo drops from above, then
      // headline words burst upward in sequence
      // ══════════════════════════════════════════════════════════════
      const contact = document.querySelector('#contact');
      if (contact) {
        // Logo — spring drop from above
        const logo = contact.querySelector('[class*="mb-6"] img');
        if (logo && logo.parentElement) {
          gsap.fromTo(logo.parentElement,
            { opacity: 0, y: -60, scale: 0.75 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 1.2,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: contact,
                start: 'top 75%',
                toggleActions: 'play none none none',
              }
            }
          );
        }

        // Headline words — dramatic upward burst (GTA VI style)
        const ctaHeading = contact.querySelector('h2');
        if (ctaHeading) {
          const spans = clipWrap(ctaHeading);
          if (spans.length) {
            gsap.fromTo(spans,
              { yPercent: 115, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 1.1,
                stagger: 0.065,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: ctaHeading,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                }
              }
            );
          }
        }

        // Palm silhouette — continuous luxury drift tied to scroll
        const contactPalm = contact.querySelector('img[src*="art-left"]');
        if (contactPalm) {
          gsap.fromTo(contactPalm,
            { yPercent: 10, opacity: 0 },
            {
              yPercent: -10,
              opacity: 0.06,
              ease: 'none',
              scrollTrigger: {
                trigger: contact,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2,
              }
            }
          );
        }

        // CTA button — scale pop with bounce
        const cta = contact.querySelector('a[href*="mailto"]');
        if (cta) {
          gsap.fromTo(cta,
            { opacity: 0, scale: 0.8, y: 20 },
            {
              opacity: 1, scale: 1, y: 0,
              duration: 0.85,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: cta,
                start: 'top 90%',
                toggleActions: 'play none none none',
              }
            }
          );
        }

        // Contact cards — staggered slide up from blur-out position
        const contactCards = contact.querySelectorAll('[class*="grid-cols-3"] > div, [class*="grid-cols-3"] > [class*="motion"]');
        contactCards.forEach((card, i) => {
          if (card.dataset.anim) return;
          card.dataset.anim = '1';
          gsap.fromTo(card,
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 0.85,
              delay: i * 0.12,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none',
              }
            }
          );
        });
      }

      // ══════════════════════════════════════════════════════════════
      // GLOBAL — Horizontal divider lines wipe from left
      // Every `border-t border-white/10` section divider animates
      // in as a sweeping line, like a cinematic scene cut indicator
      // ══════════════════════════════════════════════════════════════
      const sectionDividers = document.querySelectorAll('#projects [class*="border-b"], #lab [class*="border-t"], #identity [class*="border-t"]');
      sectionDividers.forEach((div) => {
        if (div.dataset.anim) return;
        div.dataset.anim = '1';
        gsap.fromTo(div,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: div,
              start: 'top 92%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      // ══════════════════════════════════════════════════════════════
      // GLOBAL — ScrollTrigger refresh after all animations set up
      // ══════════════════════════════════════════════════════════════
      ScrollTrigger.refresh();

    }); // end gsap.context

    return () => {
      ctx.revert();
    };
  }, []);

  return null;
}