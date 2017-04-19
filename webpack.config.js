var webpack = require('webpack');

module.exports = {
    externals:{
        'jquery':'jQuery'
    },
    entry:['./gamestore/static/js/index.js'],
    module:{
        loaders:[{
            test:/\.js$/,
            loaders:['babel-loader'],
            exclude:'/node_modules/'
        }]
    },
    output:{
        path:__dirname + '/gamestore/static/js/dist',
        filename:'bundle.js'
    }
}