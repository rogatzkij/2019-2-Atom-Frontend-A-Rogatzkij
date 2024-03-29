'use strict';

const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');


const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'build');

module.exports = {
  context: SRC_PATH,
  entry: {
    index: './index.js',
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js$/,
        include: SRC_PATH,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: SRC_PATH+"/components/style/",
        use: [
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
      },
      {
        test: /index\.css$/,
        include: SRC_PATH,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'style.css',
    }),
    new CopyPlugin([
      { from: 'img', to: 'img' },
    ]),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    })
  ]
};
