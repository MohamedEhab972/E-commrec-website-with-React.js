const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  plugins: [require("flowbite/plugin"), flowbite.plugin()],
};
