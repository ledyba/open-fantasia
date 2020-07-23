const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    'main': './src/main.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    publicPath: '/dist/'
  },
  plugins: [
    new WriteFilePlugin(),
  ],
  module: {
    rules: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ["@babel/env"]
      },
    }]
  }
};