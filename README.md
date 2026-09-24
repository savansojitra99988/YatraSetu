# 🧭 YatraSetu — Adaptive Travel Intelligence Platform

> **SIH 2026 · Problem Statement ID: 26204**  
> *Not another destination list. A better decision engine.*

![YatraSetu Banner](web/public/yatrasetu-liquid.html)

**YatraSetu** (यात्रासेतु) is an intelligent, real-time travel decision and mobility platform designed for high-pressure tourist ecosystems across India (starting with the Gujarat Pilot). It harmonizes personal traveller intent with real-ground footfall pressure, connectivity telemetry, and safety indicators to output deterministic **GO**, **MODIFY**, or **ALTERNATIVE** guidance.

---

## 🌟 Key Features & Visual Experiences

* **🎨 SVG Liquid Morphing & Parallax Experience (`yatrasetu-liquid.html`)**  
  Fluid liquid blob SVG morphing with `feTurbulence` displacement maps, real-time cursor mouse-parallax physics, animated text-path marquee, and warm golden-hour sunset palettes.
* **🌐 3D Fibonacci Sphere Gallery (`yatrasetu-sphere.html`)**  
  3D card placement along a mathematical Fibonacci sphere with GSAP `ScrollTrigger` rotation and dynamic text panels.
* **📐 HyperLink Graphic Theme (`yatrasetu-hyperlink.html`)**  
  Diagonal hatch patterns, offset 3D shadow boxes, Poppins brutalist typography, and 18 customizable color themes (Sunrise, Monsoon, Peacock, Spice Route, etc.).
* **🤖 AI Reality Decision Engine (`/discover`)**  
  Transparent ruleset evaluation without black-box opacity. Matches traveler intent with footfall telemetry and proposes experience-equivalent alternatives.
* **🚌 Smart Arrival Points & Mobility (`/mobility`)**  
  Multimodal route planning that identifies the optimal drop-off point to minimize congestion and walk times.
* **🛡️ Roadside Resilience & Emergency SOS (`/safety`)**  
  Live ground telemetry, one-tap simulated satellite emergency sharing, and verified local mechanic standby.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 19 + TypeScript 6 + Vite 8
* **Routing:** React Router DOM 7
* **Animations:** GSAP 3 + ScrollTrigger + SVG Displacement Filters
* **Icons:** Lucide React & Phosphor Icons
* **Styling:** CSS3 Custom Properties (Liquid Glassmorphism & Claymorphism)

---

## 🚀 Quick Start Guide

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/YatraSetu.git
cd YatraSetu/web
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📂 Standalone Live Demo Pages

The repository includes standalone HTML showcase files inside `web/public/`:

| Page | Description | Direct Link |
| :--- | :--- | :--- |
| **Aurora Liquid Morphing** | Sunset golden-hour SVG liquid morphing & mouse parallax | [`public/yatrasetu-liquid.html`](web/public/yatrasetu-liquid.html) |
| **3D Fibonacci Gallery** | GSAP ScrollTrigger 3D rotating Fibonacci sphere | [`public/yatrasetu-sphere.html`](web/public/yatrasetu-sphere.html) |
| **HyperLink Skin** | Diagonal hatch graphics, sticky nav, 18 color palettes | [`public/yatrasetu-hyperlink.html`](web/public/yatrasetu-hyperlink.html) |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
