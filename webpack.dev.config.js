const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = merge(common, {
  entry: [
    'react-hot-loader/patch',
    './client/src/app.js',
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'client/dist'),
    publicPath: '/',
    port: 9876,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});
