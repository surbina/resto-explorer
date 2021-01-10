const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const proxyConfig = require('./proxyConfig');

module.exports = {
  entry: './src/index.tsx',
  target: 'web',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      'design-system': path.join(__dirname, 'src', 'design-system'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      base: '/',
    }),
    new MiniCssExtractPlugin({
      filename: './src/yourfile.css',
    }),
    new webpack.EnvironmentPlugin(['GOOGLE_MAPS_API_KEY']),
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': proxyConfig,
    },
  },
};
