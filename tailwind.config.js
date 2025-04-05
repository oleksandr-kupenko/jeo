/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@spartan-ng/brain/hlm-tailwind-preset')],
  content: [
    './src/**/*.{html,ts}',
    './libs/**/*.{html,ts}',
    './node_modules/@spartan-ng/**/*.{html,ts,js,mjs}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  
  safelist: [
    'btn',
    'btn-primary',
    'btn-success'
  ]
};