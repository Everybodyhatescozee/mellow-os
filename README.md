# Mellow OS — Percy Mawela

> A living personal operating system. Calm power. Technical precision. Living minimalism.

An interactive one-page portfolio featuring dual modes: **Flow Mode** with a neural network visualization of skills, and **Focus Mode** with detailed project information. Built with React, Vite, TailwindCSS, and Framer Motion.

![Mellow OS Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)

## ✨ Features

### 🌊 Flow Mode
- **Neural Network Visualization** - Interactive web of skills and technologies
- Animated nodes with physics-based movement
- Dynamic connections between related skills
- Glowing effects and smooth transitions
- Immersive full-screen experience

### 🎯 Focus Mode
- **Matrix-style Terminal Background** - Sophisticated dark aesthetic
- **Interactive Tiles** - About, Projects, Contact sections
- 3D hover effects and fluid animations
- Glass morphism design
- Full content and information display

### 🎨 Design Highlights
- Boot sequence animation on load
- Mode persistence via localStorage
- Cursor ripple trail effects
- SF Pro Display typography
- Responsive design
- Smooth spring animations

## 🚀 Quick Start

### Installation

```powershell
npm install
```

### Development

```powershell
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```powershell
npm run build
```

### Preview Production Build

```powershell
npm run preview
```

## 🛠 Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** TailwindCSS 3
- **Animation:** Framer Motion 10
- **Typography:** SF Pro Display, Space Grotesk, IBM Plex Mono
- **Deployment:** Vercel-ready

## 📦 Project Structure

```
mellow-os/
├── src/
│   ├── components/
│   │   ├── App.jsx              # Main app component
│   │   ├── BootSequence.jsx     # Boot animation
│   │   ├── MainInterface.jsx    # Main UI with mode switching
│   │   ├── NeuralNetwork.jsx    # Flow mode visualization
│   │   ├── TerminalBackground.jsx # Focus mode background
│   │   ├── Tile.jsx             # Content tile component
│   │   ├── ModeToggle.jsx       # Mode switch button
│   │   └── CursorTrail.jsx      # Cursor effects
│   ├── fonts/                   # Custom fonts
│   ├── styles.css               # Global styles
│   └── main.jsx                 # Entry point
├── index.html
├── vite.config.js
├── tailwind.config.cjs
└── package.json
```

## 🎨 Customization

### Add Your Own Skills
Edit `src/components/NeuralNetwork.jsx` and update the `skills` array:

```javascript
const skills = [
  'Your Skill 1', 'Your Skill 2', 'Your Skill 3',
  // Add more...
]
```

### Update Content
- **About:** Edit `src/components/MainInterface.jsx` - About Tile section
- **Projects:** Update the Card components in Projects Tile
- **Contact:** Modify ContactForm with your links

### Font Setup
The project uses SF Pro Display. To use the actual font:
1. Download from [Apple Developer](https://developer.apple.com/fonts/)
2. Replace `src/fonts/SF-Pro-Display-Regular.woff2` with actual font file

Or keep the system font fallback (works great!).

## 🚢 Deployment

### Deploy to Vercel

```powershell
npm i -g vercel
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Deploy to Netlify

```powershell
npm run build
netlify deploy --prod --dir=dist
```

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Connect

- **Portfolio:** [Your URL]
- **LinkedIn:** [linkedin.com/in/percy-mawela-925425271](https://www.linkedin.com/in/percy-mawela-925425271)
- **Instagram:** [@mellow.malik](https://www.instagram.com/mellow.malik)
- **Email:** percyvilyc@gmail.com

---

**Built with calm power. Technical precision. Living minimalism.**
