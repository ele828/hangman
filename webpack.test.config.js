var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');
var TEST_PATH = path.resolve(ROOT_PATH, 'tests');

module.exports = {
  entry: 'mocha!./tests/test.js',
  output: {
    filename: 'test.build.js',
    path: TEST_PATH
  },
  //enable dev server
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
    },
    {
      test: /\.css$/,
      loaders: ['style', 'css', 'autoprefixer'],
      include: APP_PATH
    }
    ]
  },

  plugins: [
    new HtmlwebpackPlugin({
      title: 'Test Case',
      template: path.resolve(TEM_PATH, 'test.html'),
      inject: 'test'
    })
  ]
};
