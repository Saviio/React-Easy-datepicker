var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin')


var env=process.env.NODE_ENV

var config={
    devtool: 'source-map',
    entry: [
        path.resolve(__dirname, 'app/main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].[hash].css', {
            disable: env==="development"
        })
    ],
    module: {
        loaders: [{
          test: /\.(js|jsx|es)$/,
          loaders: ['react-hot', 'babel'],
          exclude: /node_modules/
        },{
          test: /\.(woff|woff2|ttf|eot)$/,
          loader: 'file'
        },{
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
    ],
    devServer: {
        historyApiFallback: true,
        hot:true,
        publicPath:null,
        port:3000
    }
}


if(env==='development'){
    [
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server'
    ].forEach(function(e){
        config.entry.unshift(e)
    })

    config.devtool='inline-source-map'
}


if(env==='production'){
    [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template:'./app/index.html',
            inject:'body',
            minify:{}
        })
    ].forEach(function(e){ config.plugins.push(e) })
}



module.exports = config
