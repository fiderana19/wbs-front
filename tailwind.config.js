/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans'],
        latobold: ['LatoBold', 'sans'],
        geist: ['Geist','sans'],
        hostgrotesk: ['HostGrotesk','sans'],
      },
      colors: {
        'primary': '#29ADB2',
        'second': '#508C9B',
        'third': '#8ed1fc',
        'four':'#EEEEEE',
        'five':'#468585',
        'six':'#7FC8A9',
        'seven':'#E5E4E2',
      },
      keyframes: {
        wrapper: {
          '50%': { transform: 'translateY(-48px)' },
          '100%': {  transform: 'translateY(-96px)'},
        }
      },
      animation: {
        wrapper: 'wrapper 5s ease-in-out infinite alternate',
      },
      gridTemplateColumns: {
        customized: 'repeat(auto-fill , minmax(280px,295px))',
        customizedAudience: 'repeat(auto-fill , minmax(310px,320px))',
      },
    },
    clipPath: {
      mypolygon: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
    },
  },
  plugins: [
    require('tailwind-clip-path'),
  ],
}