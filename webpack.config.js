const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    'main':  __dirname + '/src/main.ts',
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
        test: /\.ts$/,
        use: 'ts-loader'
      }]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [ '.ts', '.js'],
  }
};