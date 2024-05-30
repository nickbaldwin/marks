/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './content.html',
        './content-script.tsx',
        './popup.html',
        './popup.tsx',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
