# THE LAST LIGHTHOUSE — CURRENT APPROVED DECISIONS

**Project:** THE LAST LIGHTHOUSE  
**Authorship:** **IDEA BY RUBIK SOTA · 629554870**  
**Status:** CANONICAL / APPROVED  
**Date:** 2026-08-27

> This document records the current approved product decisions. When an older note in `MASTER.md` conflicts with this file, **this file takes precedence until MASTER.md is consolidated again**.

---

## 1. NORTH STAR

THE LAST LIGHTHOUSE is not a lighthouse demo with institutional resources added on top.

It is a **storytelling and listening experience** built as one continuous journey:

# **LIGHT → SIGNAL → ANSWER → CONNECTION**

# **story → metaphor → participation → education → signal → real person**

The long-term product architecture has five doors:

1. **EXPERIENCE** — the cinematic lighthouse story.
2. **LISTEN** — Lighthouse Radio / real stories / Listening Room.
3. **LEARN** — micro-workshops / Lighthouse Sessions / listening skills.
4. **SIGNAL** — tools that help someone begin a human conversation.
5. **CONNECT** — real human/professional help, including Proyecto Hombre and Teléfono de la Esperanza where appropriate and formally agreed.

The current lighthouse experience is **01 — EXPERIENCE** and progressively reveals SIGNAL and CONNECT. LISTEN and LEARN are the next priority expansion.

---

## 2. RULE 0 — FROZEN FARO CORE

The approved visual lighthouse remains protected.

Support features must not modify the cinematic scene layout, WebGL world, camera choreography, sticky timing, section heights or approved visual composition.

Support is a separate functional layer that observes the current chapter and appears around the lighthouse rather than rebuilding it.

**Support closed = visually identical to the approved frozen Faro.**

---

## 3. FIVE SUPPORT ACTIONS = FOUR ACTIVATORS + ONE CINEMATIC EVENT

There are five support actions, but **only four clickable activators**.

This is intentional and approved.

### COAST
**01 · WEATHER INSIDE →**

### KEEPER
No support activator. Let the story breathe.

### STAIR
**02 · ONE STEP →**

### MACHINE
No support activator. Let the story breathe.

### BEAM
**03 · SEND A SIGNAL →**

### AFTER SEND A SIGNAL
**04 · ANOTHER LIGHT ANSWERS** is **not a button**. It is a cinematic consequence/event.

### AFTERLIGHT
**05 · ANOTHER STATION →**

Therefore the user should see **four calls to action and one memorable visual response**.

---

## 4. ACTIVATOR VISIBILITY — APPROVED IMPROVEMENT

The current activators are too easy to miss.

Approved change:

- increase their visual size moderately (approximately +25–35% over the current implementation),
- preserve premium restraint,
- add a lighthouse-like light cue rather than a commercial CTA effect,
- first appearance: short flash + subtle halo,
- optional second reminder flash if the user has not interacted,
- then settle into a stable state,
- no continuous blinking or advertising-like pulsing.

Desired feeling:

> **“I just noticed a signal.”**

not:

> “A button popped up.”

The progressive reveal remains mandatory:

**Coast → signal / Keeper → silence / Stair → signal / Machine → silence / Beam → signal / Afterlight → station.**

---

## 5. ANOTHER LIGHT ANSWERS — APPROVED HERO MOMENT

This is one of the central emotional WOW moments of THE LAST LIGHTHOUSE.

After the user prepares/copies/shares a signal:

1. brief silence, approximately **500–700 ms**;
2. very far away: **FLASH**;
3. darkness;
4. second **FLASH**;
5. the distant light grows slightly;
6. a very subtle second beam may cross the horizon;
7. no explosion, fireworks or celebratory effect.

The emotional idea is:

> **There was one light. Now there are two.**

The user should remember:

> **“When I asked for help, another light appeared.”**

Then reveal:

### ANOTHER LIGHT

> **A second light appears.**

And explicitly:

> **This light is symbolic. It is not a real reply from another person.**

The project must never simulate a real human answer when no real person has responded.

---

## 6. ANOTHER STATION — APPROVED NIGHT NAVIGATION CARDS

ANOTHER STATION must not look like an administrative list of phone numbers.

It becomes a **night navigation chart / constellation of human stations**.

Each support route is represented as a luminous navigation card / beacon while remaining immediately understandable and actionable.

Current conceptual stations:

- **LISTEN** → Teléfono de la Esperanza.
- **LOCAL LIGHT / ALICANTE** → Teléfono de la Esperanza Alicante.
- **RECOVERY / ADDICTIONS + MENTAL HEALTH** → Proyecto Hombre Alicante.
- **CRISIS** → Línea 024.
- **EMERGENCY** → 112.

Urgent resources must remain visually clear and usable, but the overall composition should belong to the same lighthouse world.

All critical contact details must be reverified from official sources before production/public launch.

---

## 7. DATA / RESPONSE LEVELS — DEFERRED

The previously discussed multi-level model for storing/using responses is **not part of the current implementation**.

Decision for now:

- do not add CRM-style emotional profiles,
- do not add server-side storage of intimate answers,
- do not add personalization based on emotional-state history,
- do not add contact-me workflows yet,
- keep the current privacy-first behavior.

Current behavior remains:

- WEATHER INSIDE / ONE STEP may use session-local state only where needed for immediate UI behavior;
- SEND A SIGNAL is not stored or sent by Faro;
- the symbolic light is only a visual state;
- ANOTHER STATION routes the user to real external support resources.

Any future data model requires a separate explicit product, privacy, safeguarding and institutional decision.

---

## 8. SCROLL LOCK — APPROVED

When a support action opens:

- freeze user scrolling,
- do not advance the camera,
- preserve exact scroll position,
- preserve exact scene/camera state,
- closing returns the user to the same place.

The support layer must never change section height or cinematic timing.

---

## 9. QA — NON-NEGOTIABLE

Before Support changes can merge:

1. compare frozen Faro vs Support for section geometry;
2. compare total scroll height;
3. check Hero / Coast / Keeper / Stair / Machine / Beam / Afterlight;
4. capture representative scroll positions (0 / 20 / 40 / 60 / 80 / 100%);
5. verify desktop and mobile;
6. verify EN and ES;
7. verify support-open scroll lock and exact return position;
8. verify progressive trigger visibility;
9. verify Another Light event;
10. verify Another Station resources;
11. visually inspect the preview before merge.

**Any structural visual regression = FAIL / NO MERGE.**

Playwright + Chromium remains the automated browser QA path, with human visual validation required before merge.

---

## 10. NEXT PRIORITY — COMPLETE LISTEN + LEARN

The next product phase is approved:

# **02 — LISTEN**

Priority candidates:

- **Lighthouse Radio / Voces desde el Faro**
- **The Listening Room**
- real stories from multiple perspectives:
  - I'VE BEEN THE LIGHTHOUSE
  - I'VE SEEN THE SIGNAL
  - I ANSWER SIGNALS
  - I'M STILL FINDING MY WAY
- 6 Second Signals

# **03 — LEARN**

Priority candidates:

- **Listening Is a Skill**
- micro-workshops integrated into the lighthouse metaphor
- **Lighthouse Sessions**
- asking for help when you do not know what to say
- listening without trying to fix everything
- loneliness
- grief
- addictions + emotional health
- relapse
- accompanying another person

These modules must feel like rooms/signals/stations within THE LAST LIGHTHOUSE, not like a separate online course bolted onto the experience.

---

## 11. PRODUCT TEST

Every future feature must answer this question:

> **Does this make THE LAST LIGHTHOUSE a stronger single journey from story to real human connection without breaking the cinematic Faro?**

If not, it does not belong in the core experience.
