var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'main': './app/index.js'
    },
    watch: false,
    mode: "development",
    output: {
        path: __dirname + '/public',
        filename: './js/app.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'env', 'stage-2']
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            },
            {
                test: /\.(ttf|otf|gif|svg|jpg|png)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: './resources/',
                    publicPath: './resources/'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ]
};