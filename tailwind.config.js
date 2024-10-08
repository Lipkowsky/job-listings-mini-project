module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["League Spartan", "sans-serif"],
      },
      fontSize: {
        'base': '15px', // Zdefiniuj rozmiar bazowy
      },
      colors: {
        "desaturated-dark-cyan": "hsl(180, 29%, 50%)",
        "light-grayish-cyan": "hsl(180, 52%, 96%)",
        "light-grayish-cyan-filter": "hsl(180, 31%, 95%)",
        "dark-grayish-cyan": "hsl(180, 8%, 52%)",
        "very-dark-grayish-cyan": "hsl(180, 14%, 20%)",
      },
    },
  },
  plugins: [],
};
