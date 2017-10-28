module.exports = {
  context: __dirname,
  entry: {
    'main': './main.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader", 
        query:{
          presets: ['env']
        }
      }
    ]
  }
};