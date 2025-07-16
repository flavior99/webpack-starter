const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin= require('mini-css-extract-plugin');
const CssMinimizerPlugin= require('css-minimizer-webpack-plugin');
const path = require('path');
const CopyPlugin= require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    minimize: true,
  },
  entry: './src/index.js', // 👈 ESTA LÍNEA ES CLAVE
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /styles\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /styles\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: false,
          minimize: false,
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)/i,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false,
          }
        }]
      }
    ],
  },
  devServer: {
    static: './dist',
    port: 8080,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [{from: './src/assets', to: 'assets/'}]
    })
  ],
  
};
