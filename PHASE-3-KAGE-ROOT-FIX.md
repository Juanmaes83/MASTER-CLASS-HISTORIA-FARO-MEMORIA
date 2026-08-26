# PHASE 3 — KAGE ROOT-FIX CONTRACT

**IDEA BY RUBIK SOTA · 629554870**

## Permanent project identity
- Public experience must support **English (EN)** and **Spanish (ES)**.
- **IDEA BY RUBIK SOTA · 629554870** must remain visible across the experience and present in project documentation.
- Language and authorship layers must not replace or destabilize the approved WebGL runtime.

## Source of truth
When implementation is ambiguous, inspect `MengTo/kage` first. Do not invent a Faro-specific workaround until the Kage mechanism is understood.

## Architectural rule
**THREE = WORLD. GENERATED MEDIA = LOCAL ART DIRECTION. FOREGROUND = DEPTH/COMPOSITION. HTML = EDITORIAL.**

The Phase 2 full-screen `plateA/plateB` crossfade architecture is retired.

## The 12 root problems and direct Kage-derived fixes

1. **Translucent background** → WebGL canvas is the primary world; no permanent full-screen photographic overlay.
2. **Spatial registration / duplicate lighthouse** → one hero object, one spatial source. Lighthouse is WebGL only in spatial chapters.
3. **Weak foreground** → dual foreground system: real WebGL near/far planes + section-specific editorial foreground stages.
4. **Broken alpha / rectangular cutouts** → procedural transparent canvases, `transparent:true`, `alphaTest`, depth write, shader edge feather.
5. **Three too dark / ghost-like** → scene exposure and tonal separation authored per chapter; Three must remain readable.
6. **Global generic lighting** → chapter light tokens control moon, practical, lantern, machine spot, exposure and fog.
7. **Camera moving behind a plate** → camera travels inside the same WebGL world; no full-screen image blocks the path.
8. **Crossfade transitions** → physical occlusion and foreground retirement/activation replace global image dissolves.
9. **Machine split between image and 3D** → Machine is owned by WebGL; a secondary live Three camera provides the editorial close view.
10. **Beam lacks depth** → beam crosses glass, railing/foreground, fog/spray and sea in shared world space.
11. **Foreground trapped in section stacking context** → active foreground stage is re-parented into global `#fg-sky`, then retired and parked home.
12. **Layers look like layers** → scene ownership: every visible element has one owner and one depth role.

## Scene ownership

### Coast
- Lighthouse: WebGL / MID / HERO
- Keeper house: WebGL / MID
- Cliff: WebGL / MID+NEAR
- Sea: WebGL / FAR
- Sky: WebGL shader / FAR
- Grass/rocks: WebGL cutouts + editorial FG / NEAR/VERY NEAR
- Generated coast plate: **not used full-screen**

### Keeper
- Room reconstruction: generated media / LOCAL WINDOW / MID
- Exterior world: WebGL / FAR continuity only
- Door occluder: editorial foreground / VERY NEAR
- No second lighthouse or second room in Three.

### Stair
- Stair/rail/wall relationship: WebGL / MID+NEAR
- Editorial rail: foreground occluder / VERY NEAR
- No photographic dissolve.

### Machine
- Fresnel: WebGL / HERO
- Brass supports/gears: WebGL / MID
- Lantern glazing/gallery: WebGL / MID+NEAR
- Live close viewport: second camera into the same WebGL world
- Generated Machine plate: reference only, not compositor layer.

### Beam
- Beam: WebGL / HERO
- Fog + salt spray: WebGL / MID+NEAR
- Glass/rail: WebGL + editorial foreground / NEAR
- Sea/sky: WebGL / FAR

### Afterlight
- Same world; dawn is a lighting/sky-state transition, not a second full-screen photograph.

## Kage mechanisms explicitly ported
- fixed WebGL world at z=0
- restrained vignette + grain only
- section `data-cam` states
- continuous camera interpolation
- section foreground stages
- `#fg-sky` reparenting of active stage
- active → retiring → parked foreground lifecycle
- transparent WebGL cutouts with alphaTest + feather
- far/mid/near/very-near world layers
- procedural material texture generation
- local live viewports / second Three camera
- world-owned light sources and atmosphere
- reduced-motion fallback

## Non-negotiable QA
Do not merge this branch until video evidence proves:
1. Lighthouse is clearly visible as a world, not a ghost.
2. No duplicate lighthouse image exists over the WebGL lighthouse.
3. No white/rectangular foreground artifacts.
4. Camera movement reads spatially.
5. Coast → Keeper → Stair is motivated by occlusion/space, not dissolve.
6. Machine is visibly 3D but does not read as primitive Three.js.
7. Beam has near/mid/far depth.
8. Foreground crosses typography naturally and retires cleanly.
9. No full-screen photographic opacity stack returns.
10. Mobile has no horizontal overflow or broken nav.
11. Reduced motion keeps content accessible.
12. Side-by-side video comparison with Kage reaches the agreed perceptual threshold.
13. EN/ES switching preserves layout, hierarchy and accessibility.
14. **IDEA BY RUBIK SOTA · 629554870** remains visible throughout the experience and documented in the repository.
