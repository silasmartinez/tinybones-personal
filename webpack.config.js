var webpack = require('webpack')
var config = {
  context: __dirname + '/app',
  entry: './index.js',
  output: {
    path: __dirname + '/public/javascripts',
    filename: 'main.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      ON_TEST: process.env.NODE_ENV === 'test'
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, loader: 'ng-annotate!babel', exclude: /node_modules/},
      {test: /\.html$/, loader: 'raw', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css', exclude: /node_modules/}
    ]
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;