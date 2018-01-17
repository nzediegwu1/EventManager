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
        contentBase: './Client/dist',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './Client/dist'),
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\js?$/,
            include: [path.resolve(__dirname, './Client/src')],
            exclude: [path.resolve(__dirname, 'node_modules')],
            loader: 'babel-loader'
        }]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'Client/dist'),
        publicPath: '/',
        port: '9876'
    }
};