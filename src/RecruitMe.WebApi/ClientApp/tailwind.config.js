/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(269.85deg, #54151C 0%, #121212 54.89%)",
      },
      boxShadow: {
        custom: "0px 4px 20px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
  corePlugins: {preflight: false},
};
