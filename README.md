# Mellow OS — Percy Mawela

> A living personal operating system. Calm power. Technical precision. Living minimalism.

Mellow OS is an interactive React + Vite experience built around multiple operating modes for focus, creativity, security thinking, and personal workflow experimentation.

![Mellow OS Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)

## ✨ Core Experience

- Mode selector with 6 operating modes
- Mode boot transitions and animated backgrounds
- Mode persistence using localStorage
- Responsive UI optimized for desktop and mobile layouts
- Framer Motion-driven interactions and transitions

## 🧭 Modes

### ☯ FLOW

- Neural network visualization with animated skill nodes
- Dynamic visual motion and connection effects
- Cinematic hero intro and ambient interface styling

### ◈ FOCUS

- Portfolio landing interface
- Cybersecurity + systems positioning and quick contact links
- Mode exploration hints and About MellowOS narrative section

### ❄ FREEZE (Neural Core)

- Neural Core boot sequence (session-aware)
- Minimal Interval Timer with configurable:
  - focus duration
  - break duration
  - rounds/cycles
- Full-screen timing experience with progress ring and work/break phases

### 🌬 FLOAT

- Guided breathing mode for calm and concentration
- Built-in frameworks:
  - Box Breathing
  - 4-7-8 Breathing
  - Focus Pulse
  - Custom rhythm editor
- Animated breathing phases with visual timing cues

### 🛠 FIX

- Local script/automation scratchpad
- Create, edit, preview, and organize script notes
- Sticky-wall style cards with drag-and-drop reordering
- Import/export scripts as JSON
- Data persistence in localStorage

### 🛡 SOC

- Security Operations Center simulation dashboard
- Live-updating SOC metrics and network telemetry
- Alert triage queue with severity/status filters
- Expandable incident details and triage actions
- Security systems status panel (Firewall, IDS/IPS, SIEM, EDR)

## 🆕 Recent Updates

- Expanded from dual-mode design to 6-mode architecture
- Added FLOAT mode breathing frameworks and custom pattern controls
- Added FIX mode script wall with JSON import/export support
- Added SOC mode with triage workflow and real-time dashboard simulation
- Added mode-specific boot flow and improved mode switch UX

## 🚀 Quick Start

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open http://localhost:5173

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
npm run test
```

## 🛠 Tech Stack

- React 18
- Vite 5
- TailwindCSS 3
- Framer Motion 10
- Vitest + Testing Library
- Vercel deployment config

## 📁 Project Structure

```text
src/
  App.jsx
  main.jsx
  styles.css
  components/
    MainInterface.jsx
    ModeSelector.jsx
    ModeToggle.jsx
    BootSequence.jsx
    CursorTrail.jsx
    NeuralNetwork.jsx
    TerminalBackground.jsx
    NeuralCore.jsx
    MinimalIntervalTimer.jsx
    FloatBreather.jsx
    FixMode.jsx
    SOCDashboard.jsx
    ErrorBoundary.jsx
    __tests__/
      FixMode.test.jsx
  workers/
    fixRunner.worker.js
```

## 🚢 Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

Or connect the GitHub repository for automatic deployments.

## 📝 License

MIT

## 🤝 Connect

- LinkedIn: https://www.linkedin.com/in/percy-mawela-925425271
- Instagram: https://www.instagram.com/mellow.malik
- Email: percyvilyc@gmail.com

---

Built with calm power. Technical precision. Living minimalism.
