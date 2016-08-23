var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './client.js',
    style: './styles.scss'
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', ['css', 'resolve-url', 'sass']) }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],
  resolveUrlLoader: {
    root: path.join(__dirname, '..', 'patterns', 'globals')
  },
  sassLoader: {
    includePaths: [ path.join(__dirname, '..', 'patterns', 'globals') ]
  },
  resolve: {
    extensions: [
      '.scss',
      '.js',
      ''
    ]
  }
};