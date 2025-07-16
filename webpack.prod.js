const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin= require('mini-css-extract-plugin');
const CssMinimizerPlugin= require('css-minimizer-webpack-plugin');
const path = require('path');
const CopyPlugin= require('copy-webpack-plugin');
const TerserPlugin= require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    minimize: true,
  },
  entry: './src/index.js',
  output: {
    filename: 'main.[contenthash].js',
    clean: true,
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
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
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
      filename: '[name].[contenthash].css',
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [{from: './src/assets', to: 'assets/'}]
    }),
    new TerserPlugin(),
  ],
  
};