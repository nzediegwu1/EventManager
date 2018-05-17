const webpack = require('webpack');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const common = require('./webpack.common.config');

module.exports = merge(common, {
  plugins: [
    new CompressionPlugin(),
    new BrotliPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      minimize: true,
      compress: {
        warnings: false,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
});
