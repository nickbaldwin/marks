import defaultTheme from 'tailwindcss/defaultTheme';

console.log(defaultTheme);

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
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
