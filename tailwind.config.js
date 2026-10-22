/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ibm: {
          blue: '#0f62fe',
          cyan: '#1192e8',
          teal: '#0072c3',
          neon: '#42beef',
          glow: '#0043ce',
          dark90: '#161616',
          dark80: '#262626',
          dark70: '#393939',
          dark60: '#525252',
          dark100: '#111111',
          black: '#0a0a0c',
          alert: '#fa4d56',
          warning: '#f1c21b',
          success: '#42be65',
          purple: '#8a3ffc',
          magenta: '#ee5396',
          gray10: '#f4f4f4',
          gray20: '#e0e0e0',
          gray30: '#c6c6c6',
          gray50: '#8d8d8d',
        }
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"IBM Plex Sans JP"', 'sans-serif'],
        jp: ['"IBM Plex Sans JP"', '"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        display: ['"IBM Plex Mono"', '"IBM Plex Sans"', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
        'radar': 'radar 4s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 5px rgba(15, 98, 254, 0.4), inset 0 0 5px rgba(15, 98, 254, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(66, 190, 239, 0.8), inset 0 0 10px rgba(66, 190, 239, 0.4)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}
