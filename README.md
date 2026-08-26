# THE LAST LIGHTHOUSE — Masterclass Project

**IDEA BY RUBIK SOTA · 629554870**

A new cinematic web experience developed as the practical counterpart to the methodology extracted from Kage, MengTo Skills, Towers and related immersive-web references.

## Project authorship

The project must preserve the visible attribution **IDEA BY RUBIK SOTA · 629554870** across the public experience and project documentation. This credit is part of the project identity and must not be removed in future visual or runtime iterations.

## Languages

The public experience is bilingual:

- English (EN)
- Spanish (ES)

Language switching is handled by `i18n.js`, persists with `localStorage`, and updates navigation, narrative copy, metadata and accessibility labels without changing the approved WebGL runtime.

## Thesis

We are not cloning Kage's Japanese visual surface. We are reusing its methodology:

- story before shader
- a strict world bible and token system
- chapters as composed shots
- a fixed live WebGL environmental layer
- hybrid 2.5D composition: Three.js + generated plates + HTML + CSS grade
- restrained motion and post-processing
- procedural materials / geometry only where they add meaning
- a vertical-slice quality gate before scaling

## Demo narrative

1. **The Coast** — the lighthouse as a promise across distance.
2. **The Keeper** — memory reconstructed through objects, not portraits.
3. **The Machine** — the Fresnel lens and clockwork as the mechanical heart.
4. **The Beam** — scroll controls the signal azimuth.
5. **Afterlight** — the beam ends; the archive begins.

## Technical architecture

- Static HTML/CSS/JS, no framework required for the first slice.
- Three.js r149 as live atmospheric runtime.
- Original procedural sea shader, lighthouse geometry, Fresnel rings, beacon cone and salt-fog particles.
- GPT Image 2 generated scene plates used as cinematic material-rich layers.
- CSS grain, vignette, negative-space editorial system and responsive typography.
- IntersectionObserver for reveal choreography.
- Scroll-driven scene/camera state and beacon progression.
- Separate `i18n.js` + `i18n.css` layer so bilingual UI and authorship do not disturb the approved visual runtime.

## Visual tokens

- Atlantic black `#071015`
- Storm blue `#172a34`
- Chalk white `#e8ebe6`
- Sea-glass green `#719a95`
- Oxidized iron `#925b3c`
- Sodium amber `#d79a52`

Motion is deliberately slow and restrained. Decorative motion without narrative purpose is rejected.

## Quality gate

The project should not be called complete until:

- desktop and mobile are visually inspected
- one complete scroll is recorded/validated
- no critical console errors remain
- the Machine scene reads as a premium composition rather than a Three.js tech demo
- generated imagery, 3D and editorial layers feel like one world
- EN and ES can be switched without visual regression
- **IDEA BY RUBIK SOTA · 629554870** remains visible and documented

## Reference sources

- https://github.com/MengTo/kage
- https://github.com/MengTo/towers
- https://github.com/MengTo/Skills
- https://github.com/Juanmaes83/scroll-cinematic-claude
- https://github.com/Juanmaes83/aerosteon
- https://github.com/Juanmaes83/cinematic-site-components

This implementation is original and does not copy Kage source code or artwork.
