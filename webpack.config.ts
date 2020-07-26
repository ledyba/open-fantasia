import WriteFilePlugin from 'write-file-webpack-plugin';
import webpack from 'webpack';

const conf: webpack.Configuration = {
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

export default conf;
