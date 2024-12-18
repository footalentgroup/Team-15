import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
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
        'pink-100': '#FDB0D9',
        'pink-500': '#EB3883',
        'yellow-light': '#F6FFDC',
        'yellow-100': '#FEEEBE',
        'yellow-500': '#FBC82D',
        'green-100': '#B0F0D7',
        'green-500': '#00CF7F',
        'grey-500': '#3A3838',
        'lime-100': '#F8FFE4',
      },
    },
  },
  plugins: [],
} satisfies Config
