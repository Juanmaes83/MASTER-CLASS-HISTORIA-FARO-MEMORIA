# PHASE II — KAGE PARITY

> Status: **IMPLEMENTATION ACTIVE / NOT APPROVED FOR MAIN**

The benchmark is not “better than V1”. The benchmark is perceptual parity with Kage while preserving an original Atlantic lighthouse world.

## Baseline

User assessment of Lighthouse V1: **36 / 100 vs Kage = 100**.

## Non-negotiable rule

**DON'T SHOW THE THREE.JS. SHOW THE WORLD.**

If the viewer can identify the experience as text + generated plate + obvious primitives, the build fails the gate regardless of code quality.

## A→J execution

### A — Kage archaeology
- [x] chapter/camera-state grammar audited
- [x] foreground / midground / background composition identified
- [x] procedural world + generated plates hybrid identified
- [x] restrained post / editorial typography / negative space identified
- [x] handoff and continuity principle extracted

### B — Skills map
- [x] Three.js skill mapped to world/camera/material/performance
- [x] GSAP/ScrollTrigger mapped to pin/scrub/choreography
- [x] falling-leaves mechanics adapted to salt spray
- [x] progressive-blur adapted to depth handoffs
- [x] animation-systems rules adopted
- [x] pointer emitter reserved for subtle atmospheric interaction only

### C — World 3D V2
- [x] monolithic cylinder rejected
- [x] segmented lighthouse tower
- [x] windows + sills
- [x] keeper house + roof + practical window
- [x] gallery + railings
- [x] lantern room + mullions + crown
- [x] Fresnel + brass cage + gears
- [x] spiral stair
- [x] irregular cliff kit

### D — Material system
- [x] procedural stone map
- [x] procedural oxidized iron map
- [x] procedural dark rock map
- [x] transmissive Fresnel glass
- [x] aged brass material
- [x] chapter-specific exposure/light/fog
- [ ] final visual calibration against screenshots

### E — Foreground library
- [x] large Fresnel edge foreground generated
- [x] iron railing foreground generated
- [x] salt-spray near/mid/far system
- [ ] final alpha extraction / edge cleanup
- [ ] coastal grass / rocks / rope integrated if they improve composition

### F — Camera rail
- [x] discrete camera targets removed
- [x] CatmullRom camera path
- [x] independent look-at path
- [x] authored progress mapping
- [x] scene-dependent FOV
- [x] subtle pointer micro-parallax

### G — Chapter timelines
- [x] GSAP + ScrollTrigger installed
- [x] hero ghost typography parallax
- [x] keeper occlusion timeline
- [x] keeper log emergence
- [x] stair foreground travel
- [x] sticky Machine timeline
- [x] Fresnel HUD / 22 NM choreography
- [x] Afterlight typography travel

### H — Cinematic handoffs
- [x] Coast → Keeper: architectural occlusion concept implemented
- [x] Keeper → Stair: climb bridge scene added
- [x] Stair → Machine: foreground rail + Fresnel takeover
- [x] Machine → Beam: optical flash transition
- [x] Beam → Afterlight: grade/exposure/plate transition
- [ ] validate timings by full-scroll capture

### I — Postprocessing / compositor
- [x] ACES tone mapping
- [x] vignette
- [x] film grain
- [x] depth grade
- [x] progressive blur
- [x] volumetric-style beam shader
- [x] glow isolated to Fresnel source
- [x] dual full-viewport plate crossfader

### J — Visual QA
- [ ] desktop full-scroll visual capture
- [ ] Machine close inspection
- [ ] mobile 390×844 capture
- [ ] console clean
- [ ] no broken assets
- [ ] compare side-by-side with Kage video
- [ ] score each category against 100-point benchmark
- [ ] only then approve / merge

## Final parity criteria

The build is **not accepted** unless all of these are true:

1. **WORLD, NOT WEBSITE** — frames read as places/shots before they read as sections.
2. **NO VISIBLE PRIMITIVE LANGUAGE** — cylinder/box/cone construction is hidden by composition, light, material and occlusion.
3. **THREE DEPTH PLANES MINIMUM** — foreground crosses the frame, midground carries subject, background creates atmosphere.
4. **CAMERA CONTINUITY** — no perceptual teleport between chapters.
5. **SHOT VARIETY** — wide / intimate / climb / macro-machine / beam / afterlight have different spatial grammar.
6. **MATERIAL CREDIBILITY** — stone, iron, brass and glass are visually differentiated.
7. **LIGHT AS NARRATIVE** — cold exterior, warm keeper practical, optical machine, final beam, dawn inversion.
8. **HANDOFFS HAVE MOTIVATION** — transitions use wall/door/stair/lens/light, never generic fades alone.
9. **TYPOGRAPHY IS ARCHITECTURAL** — it participates in composition and scale, not floating UI cards.
10. **MOTION IS RESTRAINED** — every animation guides attention or maintains continuity.
11. **MOBILE RETAINS THE STORY** — not merely stacked desktop content.
12. **PERFORMANCE DOES NOT BREAK THE ILLUSION** — DPR capped, instancing used, reduced motion supported.

## Merge policy

`phase-2-kage-parity` stays isolated until J passes. Do not merge because implementation is complete. Merge only when visual evidence passes the benchmark.
