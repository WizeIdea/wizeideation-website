const config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                saltWhite: '#F8F9FA',
                burntOchre: '#B7410E',
                dpmOlive: '#4B5320',
                striationCharcoal: '#2E2E2E'
            },
            fontFamily: {
                'serif-primary': ['"Libre Baskerville"', 'serif'],
                'serif-secondary': ['"IBM Plex Serif"', 'serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
                'sans-ui': ['Inter', 'sans-serif']
            }
        }
    },
    plugins: [],
};
export default config;
