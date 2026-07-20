export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8B5CF6", // violet
        secondary: "#F59E0B", // amber
        success: "#34D399", // green
        accent: "#F472B6", // pink
        sky: "#60A5FA", // blue
        softbg: "#F9FAFB", // light gray bg
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
