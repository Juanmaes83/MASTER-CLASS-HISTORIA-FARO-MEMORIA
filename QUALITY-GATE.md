# QUALITY GATE — THE LAST LIGHTHOUSE

## Current status

**VERTICAL SLICE IMPLEMENTED — VISUAL SIGN-OFF PENDING**

This repository is deliberately not marked as finished yet.

The first implementation now contains the complete visual grammar required to judge the direction:

- cinematic generated plates for Coast, Keeper, Machine and Afterlight
- live Three.js atmospheric world
- procedural sea shader
- lighthouse, gallery, lantern room and Fresnel abstraction
- scroll-driven chapter camera targets
- live beacon / azimuth logic
- salt-fog particles
- editorial typography and navigation
- grain / vignette / color grade
- sticky Machine composition as the primary quality slice
- responsive and reduced-motion rules

## Why the project stops here before scaling

The methodology requires a visual gate before additional production. The next chapters should only be expanded once the opening shot and **Scene 03 — The Machine** are judged against the same premium perceptual bar as the reference work.

## Sign-off questions

### 1. Opening shot
Does the first viewport immediately read as a cinematic world rather than a WebGL demo?

### 2. Machine
Does the Fresnel scene feel material, editorial and physically credible before its technical implementation becomes noticeable?

### 3. Cohesion
Do generated imagery, HTML typography and the live 3D layer feel authored as one visual system?

### 4. Restraint
Is the motion supporting navigation, memory and light rather than advertising the effects themselves?

### 5. Difference from Kage
Does this clearly inherit methodology while establishing its own Atlantic / maritime identity?

## Required evidence before FINAL

- desktop visual inspection of hero, Coast, Keeper, Machine, Beam and Afterlight
- mobile visual inspection around 390 × 844
- full-scroll recording or equivalent sequence of screenshots
- browser console inspection
- asset / network check
- performance check
- final visual score >= 80/100, with Art Direction and Composition explicitly passing

## Known production hardening still pending

- move generated plates from external generation URLs into repository-owned local assets
- vendor Three.js locally instead of relying on a CDN
- deploy through a stable Pages/Vercel endpoint
- add final ambient sound design only after the visual slice is signed off

The project should not be described as complete until these gates pass.
