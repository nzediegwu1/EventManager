const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:9876',
    'webpack/hot/only-dev-server',
    './Client/src/app.js',
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'Client/dist'),
    publicPath: '/',
    port: 9876,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './Client/dist'),
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, './Client/src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['react', 'env', 'stage-1'],
          },
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
