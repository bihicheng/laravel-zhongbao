var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        tasks: path.resolve(__dirname, 'entrys/tasks.js'),
        task: path.resolve(__dirname, 'entrys/task.js')
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
