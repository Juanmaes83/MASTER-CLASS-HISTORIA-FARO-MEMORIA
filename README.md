# THE LAST LIGHTHOUSE — Masterclass Project

**IDEA BY RUBIK SOTA · 629554870**

A cinematic WebGL lighthouse experience developed from the methodology extracted from Kage and adapted into two official narrative editions that share the same visual/runtime DNA.

## Replication master

The complete reusable process — from the original The Last Lighthouse baseline through LAB work, Kage parity, root fixes, validation, storytelling consolidation and the final replication pipeline — is documented here:

- **FARO Master Replication Process:** `docs/FARO-MASTER-REPLICATION-PROCESS.md`
- **Method:** `METHOD.md`
- **Kage parity:** `PHASE-2-KAGE-PARITY.md`
- **Kage root fix:** `PHASE-3-KAGE-ROOT-FIX.md`
- **Quality gate:** `QUALITY-GATE.md`

Future agents and contributors must read the replication master before reconstructing, porting or visually upgrading this project. The objective is to reproduce the method and preserve approved behavior, not merely copy the final appearance.

## Official editions

Both editions are part of the same project and must continue to exist:

1. **Original Edition** — `index.html`
   - Approved lighthouse narrative.
   - English / Spanish.
   - Same WebGL world and visual system.

2. **Double Storytelling Edition** — `storytelling.html`
   - Same approved visual/runtime foundation.
   - Double reading: lighthouse + loneliness / depression / disorientation / signal / asking for help.
   - English / Spanish.
   - Uses larger storytelling body text for improved emotional readability.

The UI exposes an **ORIGINAL / STORYTELLING** switch so users can move between both readings without duplicating the runtime.

Frozen backup branches also remain available:

- `faro-approved-bilingual`
- `faro-double-storytelling`

## Social experience master

The living product/documentation source for the support layer is:

- **Master:** `docs/LIGHT-SIGNAL-ANSWER-CONNECTION/MASTER.md`
- **Original source preserved:** `docs/LIGHT-SIGNAL-ANSWER-CONNECTION/SOURCE-ORIGINAL.txt`

The master organizes the project around:

**LIGHT → SIGNAL → ANSWER → CONNECTION**

and the five core doors:

**EXPERIENCE → LISTEN → LEARN → SIGNAL → CONNECT**

All future support, podcast, workshop, participation and institutional improvements should be added to the MASTER using its improvement template rather than appended as loose notes.

## Project authorship

The project must preserve the visible attribution **IDEA BY RUBIK SOTA · 629554870** across the public experience and project documentation. This credit is part of the project identity and must not be removed in future visual or runtime iterations.

## Languages

Both public editions are bilingual:

- English (EN)
- Spanish (ES)

The Original Edition uses `i18n.js`. The Double Storytelling Edition uses `i18n-storytelling.js`. Language choice persists through `localStorage` and does not alter the approved WebGL runtime.

## Thesis

We are not cloning Kage's Japanese visual surface. We are reusing its methodology:

- story before shader
- a strict world bible and token system
- chapters as composed shots
- a fixed live WebGL environmental layer
- hybrid composition: Three.js + local generated media + HTML + CSS grade
- restrained motion and post-processing
- procedural materials / geometry only where they add meaning
- a vertical-slice quality gate before scaling

## Double-storytelling thesis

The second edition must work first as a lighthouse story and only progressively reveal the human reading. The narrative arc is:

**DISTANCE → SOLITUDE → EFFORT → ORIENTATION → SIGNAL → ANSWER**

The emotional reading must not romanticize depression, must not become clinical exposition, and must resolve toward connection and asking for help rather than melancholy alone.

Core line:

> A lighthouse can stop shining before it stops guiding.

Supporting ideas:

> Being lost is not the same as being unreachable.

> Even a lighthouse needs someone watching for its signal.

## Demo narrative

1. **The Coast** — distance.
2. **The Keeper** — solitude.
3. **The Ascent** — effort.
4. **The Machine** — orientation and invisible work.
5. **The Beam** — signal.
6. **Afterlight** — answer, memory and connection.

## Technical architecture

- Static HTML/CSS/JS.
- Three.js r149 as live atmospheric runtime.
- One shared approved WebGL world for both editions.
- Original procedural sea shader, lighthouse geometry, Fresnel rings, beacon cone and salt-fog particles.
- Generated scene media used locally rather than as a full-screen replacement world.
- CSS grain, vignette, negative-space editorial system and responsive typography.
- IntersectionObserver for reveal choreography.
- Scroll-driven scene/camera state and beacon progression.
- Shared `app.js`; editions differ only in editorial copy and scoped storytelling typography.

## Quality gate

The project should not be called complete until:

- desktop and mobile are visually inspected
- one complete scroll is recorded/validated
- no critical console errors remain
- the Machine scene reads as a premium composition rather than a Three.js tech demo
- generated imagery, 3D and editorial layers feel like one world
- EN and ES can be switched without visual regression
- both Original and Storytelling editions remain independently accessible
- **IDEA BY RUBIK SOTA · 629554870** remains visible and documented

## Reference sources

- https://github.com/MengTo/kage
- https://github.com/MengTo/towers
- https://github.com/MengTo/Skills
- https://github.com/Juanmaes83/scroll-cinematic-claude
- https://github.com/Juanmaes83/aerosteon
- https://github.com/Juanmaes83/cinematic-site-components

This implementation is original and does not copy Kage source code or artwork.
