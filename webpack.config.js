/*
    ./webpack.config.js
*/


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});

const CopyWebpackPluginConfig = new CopyWebpackPlugin([
    { from: 'src/assets', to: path.join(__dirname, 'dist/assets') },
]);

const ExtractTextPluginConfig = new ExtractTextPlugin('src/grumpywizards.css');
module.exports = {
    entry: path.join(__dirname, 'src'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[hash].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
            },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, include: /src/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, include: /src/ },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    name: "files/[name].[ext]",
                },
            },

        ],

    },
    // add this line
    plugins: [HtmlWebpackPluginConfig, CopyWebpackPluginConfig]
};