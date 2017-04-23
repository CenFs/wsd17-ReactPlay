// In dev mode, we open a server for development
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config.js');

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    hot:true,
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    stats:{
        colors:true
    }
});

// listen on port 8080
server.listen(8080,'localhost',function(){});