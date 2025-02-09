/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#7da15b",
        bgColor: "#134E5E",
        textColor: "#134E5E",
        hoverColor: "#0F2E3D",
        transitionColor: "#71C9CE",
      },
    },
  },
  plugins: [],
};
