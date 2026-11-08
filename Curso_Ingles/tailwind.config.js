/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./assets/js/*.js"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fredoka", "Nunito", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Nunito", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  }
};
