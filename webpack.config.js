module.exports = {
  context: __dirname + '/app',
  entry: './index.js',
  output: {
    path: __dirname + '/public/javascripts',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.html$/, loader: 'raw', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css', exclude: /node_modules/}
    ]
  }
};
