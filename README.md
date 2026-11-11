# THE LAND REMEMBERS
### Environmental Crisis in Kazakhstan in the 20th Century

An interactive digital museum and historical documentary built for a university history research project and live classroom defense. Designed with a **National Geographic × Digital Museum × Apple** editorial aesthetic.

---

## Key Features & Sections

1. **Section 1 — Cinematic Intro (`THE LAND REMEMBERS.`)**
   - Full-screen documentary opening featuring the Aral Sea ship graveyard, coordinates, animated entrance, and direct launch into Presentation Mode.
2. **Section 2 — Kazakhstan Before the Crisis (`BEFORE EVERYTHING CHANGED`)**
   - Ecological baseline cards (Saryarka Steppe, Blue Aral Basin, Irtysh & Chagan Valleys) and an interactive 1949–1991 milestone archive viewer (`1949`, `1960s`, `1989`, `1991`).
3. **Section 3 — The Aral Sea (`THE SEA THAT DISAPPEARED`)**
   - Interactive drag/keyboard before-and-after satellite comparison slider (`1960` vs. `2024`).
   - Documented hydrological data chart (`1960–2024` surface area, volume, and salinity) and explanation of the **2005 Kok-Aral Dam** that saved and partially restored the North Aral Sea in Kazakhstan.
4. **Section 4 — Semipalatinsk (`456 TESTS. GENERATIONS OF CONSEQUENCES.`)**
   - Verified historical breakdown of the **456 nuclear tests** (`116` atmospheric/surface, `340` underground) between 1949 and 1989, cartographic sector map, the 1989 **Nevada–Semipalatinsk** movement, and the August 29, 1991 closure.
5. **Section 5 — Interactive Environmental Map (`THE MAP OF CONSEQUENCES`)**
   - Dual-mode map of Kazakhstan: **Interactive Leaflet Map** (no paid API key required) + **100% Offline Classroom Projector Vector Map** with markers for the North Aral Sea, Semipalatinsk Polygon, Caspian Sea, Lake Balkhash, and Baikonur Steppe.
6. **Section 6 — What Do Students Know? (`THE NEXT GENERATION SPEAKS`)**
   - Dedicated interview video player for **Aruzhan & Madina's** student interviews (with custom thumbnail, play/pause, subtitle track, fullscreen, and one-click local `.mp4` file loader) + 4-question interactive classroom quiz.
7. **Section 7 — History Simulation (`WHAT WOULD YOU HAVE DONE?`)**
   - 3 interactive decision-making scenarios with trade-off analysis and comparisons to documented history (clearly labeled as simplified hypothetical classroom scenarios).
8. **Section 8 — The Future Is Still Ours (`HISTORY CANNOT BE REWRITTEN. THE FUTURE CAN.`)**
   - Hopeful restoration initiatives (Kok-Aral Dam, 1.1M ha Saxaul afforestation, NNC RK remediation, Altyn Dala Saiga recovery) and clickable **Sources & References** (NASA Earth Observatory, IAEA, World Bank, UN).

---

## Presentation Mode (For Live Defense)

Click **"Presentation Mode"** in the top navigation bar (or on the opening hero screen):
- **Keyboard Controls**: Use `←` / `→` arrow keys or `PageUp` / `PageDown` to move between chapters like slides, or press `Esc` to exit.
- **Slide HUD**: Displays current slide counter (`SLIDE 1 / 8`), quick chapter dots, `Prev`/`Next` buttons, and a one-click **Fullscreen Projector** toggle.
- **Offline Ready**: All historical data, SVG satellite maps, charts, and quizzes are bundled locally so the presentation works reliably even if classroom Wi-Fi drops.

---

## How to Add Aruzhan & Madina's Real Interview Video

You can load the interview video in two ways:
1. **Instant Live Selection (No Rebuild Needed)**: Scroll to **Section 6 (`THE NEXT GENERATION SPEAKS`)** and click the **"Load Interview .MP4"** button in the video player bar to pick the `.mp4` file directly from your laptop before the presentation begins.
2. **Permanent File Placement**: Place your video file in `public/videos/student-interview.mp4` and update `localVideoUrl` default state in `src/components/StudentVoicesSection.tsx`.

---

## Photographs & Source Assets

- `public/images/` holds the web-ready photographs (capped at 2400 px on the long edge, JPEG quality 82) so the museum loads quickly on classroom Wi-Fi.
- `assets-src/originals/` keeps the full-resolution originals of every photo that was downscaled. It is not part of the build; keep it for re-exports or delete it if you need the disk space.

## Design System

Global tokens live in `src/index.css` (`@theme`): `ink`, `forest`, `ivory`, `sage`, `sand`, `ember`, `aqua` colours and the serif / sans / mono font stacks. Shared editorial building blocks live in `src/components/CinematicPrimitives.tsx`: `ChapterOpener` (full-bleed chapter title over a photograph), `SectionHeader` (in-page header with a ghosted chapter numeral), `StatStrip` / `Stat`, `Eyebrow`, and `ArchivalPhotoCard`.

## Local Development & Build Instructions

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Create offline-ready production build in ./dist
npm run build

# 4. Preview the production build locally
npm run preview
```

### Deployment (Vercel / GitHub Pages)
- **Vercel**: Import the repository into Vercel; it automatically detects Vite (`npm run build`, output directory `dist`).
- **GitHub Pages**: `vite.config.ts` is pre-configured with `base: './'` so all assets resolve with relative paths on any static host.
