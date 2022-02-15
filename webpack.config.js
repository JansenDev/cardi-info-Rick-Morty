const path = require("path");

module.exports = {
  //^ configuracion básica
  // *  index principal que da inicio a la aplicacion
  entry: "./src/index.js",
  //   *Salida del blundle
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  //   *archivos que va a resolver en la aplicacion
  resolve: {
    extensions: [".js"],
  },
  module: {
    // *  Establece reglas de modulo
    rules: [
      {
        test: /.\m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
