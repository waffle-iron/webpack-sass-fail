var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: { style: './styles.scss' },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader') }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],
  sassLoader: {
    includePaths: [ path.join(__dirname, '..', 'patterns', 'globals') ]
  }
};