# YatraSetu — Design Team Handover Guide

> **Last updated:** 2026-09-19 | **Maintained by:** Engineering Team

---

## 🎯 Purpose of This Document

This guide is for the design team to:
1. Understand how this frontend is structured so designs don't break backend data flow
2. Know exactly **where** to experiment with layouts and hero sections
3. Understand which parts are **wired to real data** (must preserve element shapes) vs **purely visual** (free to redesign completely)
4. Know how to hand new designs back to the engineering team cleanly

---

## 🗂️ Project Structure at a Glance

```
web/
├── src/
│   ├── context/         ← Global reactive state (don't touch — data plumbing)
│   │   └── AppContext.tsx
│   ├── data/            ← Seed data (fake API responses — safe to read)
│   │   └── seed.ts
│   ├── layouts/         ← 🎨 DESIGN ZONE: Sidebar, Shell, navigation layout
│   │   ├── AppShell.tsx
│   │   └── AppShell.css
│   ├── pages/           ← 🎨 DESIGN ZONE: Every page (Hero, cards, forms)
│   │   ├── Dashboard.tsx + Dashboard.css
│   │   ├── Discover.tsx + Discover.css
│   │   ├── Mobility.tsx + Mobility.css
│   │   ├── Safety.tsx   + Safety.css
│   │   ├── Trust.tsx    + Trust.css
│   │   └── Gov.tsx      + Gov.css
│   ├── services/        ← Backend services (DO NOT touch — backend plumbing)
│   │   ├── decisionService.ts
│   │   ├── mobilityService.ts
│   │   ├── safetyService.ts
│   │   ├── trustService.ts
│   │   └── govService.ts
│   ├── index.css        ← 🎨 DESIGN ZONE: Global design tokens (colors, fonts)
│   └── main.tsx         ← App root (don't touch)
```

---

## 🔴 DO NOT TOUCH — Backend Contract Boundaries

These are the data-bound parts of every page. They are like **API contracts** — if you change the HTML element type or remove them, the backend data won't sync correctly.

### Rule: Preserve Data-Bound `{variable}` JSX blocks
Every `{curly brace}` in `.tsx` files is a **live data bind**. You MUST NOT:
- Remove a `{variable}` block (it will blank out when real data arrives)
- Rename a `className` that is referenced in a `.tsx` file's logic (conditional classes like `badge-${decision}` must stay)
- Remove `onClick`, `onChange`, or form `onSubmit` handlers

### Critical data-bound elements per page:

| Page | Data-bound element | What it feeds |
|------|---|---|
| Dashboard | `{selectedDestination.name}` | Active destination name |
| Dashboard | `{evaluation?.decision}` | GO/MODIFY/ALTERNATIVE pill |
| Dashboard | `{evaluation?.suitabilityScore}` | Suitability gauge bar width |
| Discover | `<select value={selectedId}>` | Destination switcher dropdown |
| Discover | `evaluation?.reasons.map(...)` | AI reason list items |
| Mobility | `routePlan?.segments.map(...)` | Route timeline legs |
| Mobility | `rentals.map(...)` | Rental cards list |
| Safety | `safety.factors.map(...)` | Risk factor rows |
| Safety | `mechanics.map(...)` | Mechanic cards |
| Trust | `stays.map(...)` | Verified stay listings |
| Trust | `stay.reviews.map(...)` | Review list |
| Gov | `data?.regions.map(...)` | Heatmap table rows |

---

## 🟢 DESIGN FREE ZONE — Fully Redesignable

These areas have **no backend data binding**. They are purely visual. You can change the layout, add patterns, swap images, use Figma components — anything.

### 1. `index.css` — Design System Tokens
This is the **single source of truth** for colors and typography. Change only this file to apply a new theme globally. No other files need editing.

```css
/* ✅ Change these freely for any new theme */
:root {
  --bg-primary: ...;        /* Main background */
  --bg-sidebar: ...;        /* Sidebar background */
  --accent-saffron: ...;    /* Primary brand accent */
  --accent-gold: ...;       /* Secondary accent */
  --text-primary: ...;      /* Body text */
  --font-heading: ...;      /* Heading typeface */
  --font-body: ...;         /* Body typeface */
  --border-color: ...;      /* Panel borders */
  --glass-blur: ...;        /* Backdrop blur level */
}
```

### 2. Hero Section in `Dashboard.css` — Primary Experimental Canvas
The `dashboard-hero` block in `Dashboard.tsx` is the **hero section** and is the most impactful redesign surface. You can change:
- The two-column layout → single wide hero, full-bleed image, split vertical, centered magazine, etc.
- The background gradient / pattern / illustration
- Font sizes, heading copy, badge styling
- Button shapes, icon usage

The only constraint: the hero must still **contain the two React data-binding blocks** (`hero-content` with the CTA button, and `hero-trip-card` with the decision pill). You can style them any way — just don't remove them.

### 3. `AppShell.css` — Navigation Layout
Free to redesign the sidebar into:
- A top navbar
- A bottom mobile tab bar
- A collapsible hamburger drawer
- A minimal floating panel

The only constraint: preserve `<NavLink>` elements and their `to=""` paths so routing keeps working.

### 4. Page-level CSS files — Card & Panel Aesthetics
Every `*.css` file under `pages/` controls the aesthetic layer only. You can:
- Change card shapes, radii, shadows
- Add Indian motif borders (jaali, mandala, torana-arch shapes via `clip-path`)
- Add decorative SVG backgrounds
- Animate section entries with `@keyframes`

---

## 🎨 How to Experiment with a New Layout

### Step 1: Fork the CSS only
To try a completely new hero layout, **only edit** `Dashboard.css`. The `.tsx` file stays untouched.

### Step 2: Use CSS variables from `index.css`
Always use `var(--variable-name)` rather than hardcoded hex values. This ensures:
- Night/day mode switches work automatically later
- Backend team can swap theme tokens without touching component files

### Step 3: Wrap new layout blocks inside existing containers
If you want to add a decorative background illustration to the hero, wrap it inside the existing element:

```jsx
<!-- EXISTING in Dashboard.tsx — do not change the classNames -->
<header className="dashboard-hero glass-panel">
  <!-- ✅ You CAN add decorative elements INSIDE here -->
  <div className="hero-mandala-bg"></div>   <!-- purely decorative -->
  
  <div className="hero-content"> ... </div>  <!-- keep this -->
  <div className="hero-trip-card"> ... </div>  <!-- keep this -->
</header>
```

Then style `.hero-mandala-bg` in `Dashboard.css` freely.

### Step 4: Test it
Run the dev server:
```powershell
cd web
npm run dev
```
Open `http://localhost:5173` and see changes live.

### Step 5: Hand back to engineering
When your design experiment is ready:
1. Only commit changed `*.css` files and `index.css`
2. If structural changes are needed in a `.tsx` file, add a `<!-- DESIGN REQUEST -->` comment explaining what HTML you need added and where
3. Engineering adds the HTML shell; design then styles it

---

## 🔌 How Backend Will Plug In (What Stays the Same)

When real APIs are connected, every `*.ts` file in `services/` will be replaced with real `fetch()` calls. The `*.tsx` and `*.css` files **will not change at all**. This is why:

- The service functions already have the same **async/await shape**
- Each service already returns the same **TypeScript interface** the UI expects
- The `AppContext.tsx` stores and distributes the data using the same state variables

**For the designer:** When backend connects, the UI will automatically populate with real live data — no CSS changes needed.

---

## 🏛️ Current Theme: Indian Heritage

The active theme uses an Indian heritage palette:

| Token | Value | Meaning |
|---|---|---|
| `--bg-primary` | `#1a0e05` | Deep Neem bark brown |
| `--accent-saffron` | `#f97316` | Saffron orange |
| `--accent-gold` | `#d4a017` | Temple gold |
| `--accent-teal` | `#0d9488` | Peacock teal |
| `--accent-crimson` | `#b91c1c` | Royal crimson |
| `--font-heading` | `Playfair Display` | Serif heritage heading |
| `--font-body` | `DM Sans` | Clean readable body |

To try a new theme (e.g. "Modern Rajasthani" or "Coastal Kerala"), simply override these tokens in `index.css`.

---

## 📦 Design Deliverable Checklist

When handing off a new design to engineering:

- [ ] Provide a Figma link or screenshot
- [ ] List all **new CSS classes** added and which file they live in
- [ ] List any **new HTML elements** needed (add as a `DESIGN REQUEST` comment in the `.tsx` file)
- [ ] Confirm which `data-bound` elements were preserved (use the table above)
- [ ] Verify the build compiles: `npm run build` in the `web/` folder
- [ ] Note any new Google Fonts or icon libraries needed

---

*Questions? Contact the YatraSetu engineering team. This guide is versioned in the repo.*
