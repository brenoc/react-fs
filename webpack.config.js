var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  colors: true,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    }, {
      test: /\.json$/,
      loaders: ['json'],
      exclude: /node_modules/,
    }]
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  node: {
    fs: 'empty',
    fsevents: 'empty',
    console: 'empty',
    net: 'empty',
    tls: 'empty',
  }
}