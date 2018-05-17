const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: {
    app: path.resolve(__dirname, './client/src/app.js'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist'),
    publicPath: '/',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      UPLOAD_PRESET: process.env.UPLOAD_PRESET, // cloudinary configs
      API_KEY: process.env.API_KEY,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
  ],

  module: {
    rules: [
      {
        test: /\js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['stage-2', 'react', 'env'],
          plugins: ['transform-class-properties'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000 },
          },
        ],
      },
    ],
  },
};
