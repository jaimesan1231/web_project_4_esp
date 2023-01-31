const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  // conecta los plugins a PostCSS
  plugins: [
    // conecta el autoprefixer
    autoprefixer,
    // pasa un objeto con distintas opciones al conectar cssnano:
    cssnano({ preset: "default" }), // establece la configuración de minificación por defecto
  ],
};
