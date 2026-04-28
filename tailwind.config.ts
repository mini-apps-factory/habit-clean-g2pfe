import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}','./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: { primary:'#2D7D6E', bg:'#F8F4E9', dark:'#1A1A1A' },
        tg: {
          bg:'var(--tg-theme-bg-color,#F8F4E9)',
          text:'var(--tg-theme-text-color,#1A1A1A)',
          button:'var(--tg-theme-button-color,#2D7D6E)',
          'button-text':'var(--tg-theme-button-text-color,#ffffff)',
          'secondary-bg':'var(--tg-theme-secondary-bg-color,#f0f0f0)',
          hint:'var(--tg-theme-hint-color,#999999)',
        },
      },
      fontFamily:{sans:['-apple-system','BlinkMacSystemFont','Segoe UI','Roboto','sans-serif']},
      borderRadius:{tg:'12px'},
      spacing:{safe:'env(safe-area-inset-bottom,0px)'},
    },
  },
  plugins:[],
};
export default config;