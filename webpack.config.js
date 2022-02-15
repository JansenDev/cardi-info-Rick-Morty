const path = require("path");
// ^Plugin para enpaquetar html
const HtmlWebpackPlugin = require("html-webpack-plugin");
// ^Plugin para enpaquetar css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// ^Plugin para enpaquetar y/o copias las imagenes a la carpeta de salida: 'dist'
const CopyPlugin = require("copy-webpack-plugin");

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
    // ^  Establece reglas de modulo
    rules: [
      {
        test: /.\m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // ^Añadiendo loader css. Tambien se le puede agregar otros loadeas como sass, stylus y otros preprocesadores
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      // ^Nos permite trabajar las imagenes atravez de variables en js
      // ^ejmpl: import UserNotFound from "assets/myImage.png";
      // !Viene en webpack solo hay que configurarla
      {
        test:/\.png/,
        type:"asset/resource"
      }
    ],
  },
  // ^Agregando pluggin para renderizar HTML
  plugins: [
    // ^plugin html
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    // ^plugin css
    new MiniCssExtractPlugin(),
    // ^plugin copy to assets
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
  ],
};
