module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mellowBlack: '#0A0A0A',
        mellowOff: '#F5F5F2',
        mellowPurple: '#5C4B8A',
        mellowGreen: '#00B894'
      },
      fontFamily: {
        heading: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        sans: ['Space Grotesk', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
};