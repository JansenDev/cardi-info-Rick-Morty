const path = require("path");
// ^Plugin para enpaquetar html
const HtmlWebpackPlugin = require("html-webpack-plugin");
// ^Plugin para enpaquetar css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// ^Plugin para enpaquetar y/o copias las imagenes a la carpeta de salida: 'dist'
const CopyPlugin = require("copy-webpack-plugin");
// ^Plugin para minimuzar y optimizar los css
const CssMinimixerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// ^VARIABLES DE ENTORNO
const Doten = require("dotenv-webpack");
//^ limpia los archivos sobrantes
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  //^ configuracion básica
  // *  index principal que da inicio a la aplicacion
  entry: "./src/index.js",
  //   *Salida del blundle
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  //   *archivos que va a resolver en la aplicacion
  resolve: {
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    // ^  Establece reglas de modulo
    rules: [
      // ^Añadiendo loader babel
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
        test: /\.png/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          },
        },
      },
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
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }),
    // ^plugin copy to assets
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    // ^Plugin Dotenv-webpack para las variables de entorno
    new Doten(),
    new CleanWebpackPlugin({
      verbose:true
    })
  ],
  // ^activar las opciones para minimizar
  optimization: {
    minimize: true,
    minimizer: [new CssMinimixerPlugin(), new TerserPlugin()],
  },
};
