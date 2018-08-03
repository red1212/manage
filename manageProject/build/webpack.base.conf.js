'use strict'
const path = require('path')        //引入nodeJs路径模块
const utils = require('./utils')    //utils主要用来处理css-loader和vue-style-loader的
const config = require('../config')  // 引入config目录下的index.js配置文件，主要用来定义一些开发和生产环境的属性
const vueLoaderConfig = require('./vue-loader.conf')    //解决css问题

function resolve (dir) {               //平行的目录
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {              //入口文件 src下面的main.js
    app: './src/main.js'
  },
  output: {            
    path: config.build.assetsRoot,  // 路径是config目录下的index.js中的build配置中的assetsRoot，也就是dist目录
    filename: '[name].js',      // 文件名称这里使用默认的name也就是main
    publicPath: process.env.NODE_ENV === 'production'  // 上线地址，也就是真正的文件引用路径，                
      ? config.build.assetsPublicPath                   // 如果是production生产环境，其实这里都是 '/'
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {   //解析不同的模板
    rules: [
      {
        test: /\.vue$/,    //vue
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,     //es6
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,    //文字处理
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
