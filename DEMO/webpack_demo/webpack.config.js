const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  mode: 'production',
  entry: './src/index.js',
  output:{
    // path:__dirname,
    // filename:'./build.js'
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      { test:/\.vue$/, use:'vue-loader'},
      // { test: /\.html$/, use: 'vue-template-compiler' },
      // {
      //   test: /\.html$/,
      //   use: 'vue-template-loader'
      // },
      { 
        test:/\.js$/, 
        use:['cache-loader', 'babel-loader'], 
        exclude:/node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ]
      },
      {
        test: /\.(png|jpg)/,
        loader: 'file-loader',
        options: {
          // ...
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // new HtmlWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   template: "./index.html" //new 一个这个插件的实例，并传入相关的参数
    // }),
    new HtmlWebpackPlugin({
      title: 'Development'
    }),
    new webpack.HotModuleReplacementPlugin({
      // Options...
    })
  ],

  devServer:{
    // client:168 Invalid Host/Origin header
    disableHostCheck: true
  },
  performance: {
    // hints:false
    hints: "warning", // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
    // 提供资源文件名的断言函数
    return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    
    }
  }  
  // babel:{
  //   presets:['es2015'],
  //   plugins:['transform-runtime']
  // }
}
module.exports = config