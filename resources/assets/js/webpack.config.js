var webpack = require('webpack');
var path = require('path');

var entryCommon = [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8085'
];

module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: './',
        port: 8085
    },
    entry: {
        tasks: entryCommon.concat([path.resolve(__dirname, 'entrys/tasks.js')])
    },
    output: {
        //path: path.resolve(__dirname, 'build'),
        path: '/home/mugeda/mugeda-card-proxy/assets',
        publicPath: '/assets/',
        filename: './[name].bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css/, include: path.resolve(__dirname, './'), loader: 'style-loader!css-loader'},    
            {test: /\.js[x]?$/, include: path.resolve(__dirname, './'), exclude: /node_modules/, loader: 'babel-loader?presets[]=react'}   
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
