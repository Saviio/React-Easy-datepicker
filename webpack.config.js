var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'app/main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].[hash].css', {
            disable: true
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template:'./app/index.html',
            inject:'body',
            minify:{}
        })
    ],
    module: {
        loaders: [{
          test: /\.(js|jsx|es)$/,
          loaders: ['react-hot', 'babel'],
          exclude: /node_modules/
        }, {
          test: /\.(woff|woff2|ttf|eot)$/,
          loader: 'file'
        }, {
          test: /\.(png|jpg|jpeg|git|svg)$/,
          loader:'url-loader?limit=8192'
        },{
          test: /\.html$/,
          loader: 'raw'
        },{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss!sass?sourceMap&sourceMapContents")
        },{
            test:/\.json$/,
            loader:'json'
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss")
        }]
    },
    postcss:[
        autoprefixer({
          browsers: ['last 2 version']
        })
    ]
}
