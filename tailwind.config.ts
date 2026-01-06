// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales basados en el logo
        primary: {
          50: '#f0fdf4',   // Verde muy claro
          100: '#dcfce7',  // Verde claro suave
          200: '#bbf7d0',  // Verde menta
          300: '#86efac',  // Verde suave
          400: '#4ade80',  // Verde medio (logo claro)
          500: '#22c55e',  // Verde principal
          600: '#16a34a',  // Verde intenso
          700: '#15803d',  // Verde oscuro
          800: '#166534',  // Verde muy oscuro
          900: '#14532d',  // Verde profundo
          950: '#052e16',  // Verde casi negro
        },
        
        // Colores secundarios (naranja/amarillo para contraste)
        secondary: {
          50: '#fff7ed',   // Naranja muy claro
          100: '#ffedd5',  // Naranja claro
          200: '#fed7aa',  // Naranja suave
          300: '#fdba74',  // Naranja medio
          400: '#fb923c',  // Naranja
          500: '#f97316',  // Naranja intenso
          600: '#ea580c',  // Naranja oscuro
          700: '#c2410c',  // Naranja muy oscuro
          800: '#9a3412',  // Naranja profundo
          900: '#7c2d12',  // Naranja casi negro
        },
        
        // Colores neutros
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        
        // Colores semánticos para la app
        success: {
          light: '#86efac',  // primary-300
          DEFAULT: '#22c55e', // primary-500
          dark: '#15803d',   // primary-700
        },
        warning: {
          light: '#fde68a',
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
        error: {
          light: '#fca5a5',
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        info: {
          light: '#93c5fd',
          DEFAULT: '#3b82f6',
          dark: '#1d4ed8',
        },
        
        // Colores específicos de la app
        background: {
          DEFAULT: '#ffffff',
          secondary: '#f0fdf4', // primary-50
          tertiary: '#fafafa',  // neutral-50
        },
        surface: {
          DEFAULT: '#ffffff',
          elevated: '#fafafa',
          hover: '#f5f5f5',
        },
        border: {
          DEFAULT: '#e5e5e5',  // neutral-200
          light: '#f5f5f5',    // neutral-100
          dark: '#d4d4d4',     // neutral-300
        },
      },
      
      // Gradientes personalizados
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
        'gradient-hero': 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(34,197,94,0.05) 100%)',
      },
      
      // Sombras personalizadas
      boxShadow: {
        'card': '0 1px 3px 0 rgba(34, 197, 94, 0.1), 0 1px 2px 0 rgba(34, 197, 94, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(34, 197, 94, 0.1), 0 4px 6px -2px rgba(34, 197, 94, 0.05)',
        'button': '0 2px 4px 0 rgba(34, 197, 94, 0.2)',
        'button-hover': '0 4px 6px -1px rgba(34, 197, 94, 0.3)',
      },
      
      // Animaciones
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

export default config;