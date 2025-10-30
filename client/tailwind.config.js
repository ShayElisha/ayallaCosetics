/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4f4',
          100: '#fbe8e8',
          200: '#f8d4d6',
          300: '#f2b3b7',
          400: '#ea8790',
          500: '#de5d6c',
          600: '#c93d54',
          700: '#a92f45',
          800: '#8d293e',
          900: '#78273a',
        },
        elegant: {
          50: '#f9f7f7',
          100: '#f0eaea',
          200: '#e4dbdb',
          300: '#d1c2c2',
          400: '#b8a1a1',
          500: '#9d8181',
          600: '#866d6d',
          700: '#6f5959',
          800: '#5d4c4c',
          900: '#4f4242',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

