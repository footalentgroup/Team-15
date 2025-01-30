import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@fortawesome/fontawesome-free/**/*',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        white: '#FFFFFD',
        'pink-700': '#32091F',
        'black-500': '#121703',
        'black-300': '#191F2B',
        'blue-light-100': '#B0EFFD',
        'blue-light-500': '#01CAF8',
        'blue-800': '#0488A6',
        'pink-50': '#FEE6F3',
        'pink-100': '#FDB0D9',
        'pink-500': '#CD0052',
        'yellow-light-100': '#FFFAEB',
        'yellow-light': '#F6FFDC',
        'yellow-100': '#FEEEBE',
        'yellow-200': '#FDE69E',
        'yellow-500': '#FBC82D',
        'green-100': '#B0F0D7',
        'green-500': '#00CF7F',
        'grey-500': '#3A3838',
        'lime-100': '#F8FFE4',
      },
      dropShadow: {
        modal: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        general: '4px 4px 0px rgb(122, 148, 186)',
        light: '4px 4px 0px rgb(217, 217, 217)',
        generalBlue: '4px 4px 0px rgb(1, 143, 176)',
      },
    },
  },
  plugins: [],
} satisfies Config
