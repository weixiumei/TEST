// https://segmentfault.com/a/1190000016405768#articleHeader2
const path = require('path')
const webpack = require('webpack');
// const config = require('config');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'first_webpack.js'
  },
  
  plugins: [
    // html-webpack-plugin:会生成一个包含引入js的文件 dist/index.html
    new HtmlWebpackPlugin(),
    // 移动入口chunk引入的css文件到styles.css，比较大时CSS bundle 会跟 JS bundle 并行加载
    new ExtractTextPlugin("styles.css"),
    // // 提出公共模块
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   filename: 'js/base.js'
    // })
  ],
  // optimization:{
  //   splitChunks:{
  //     cacheGroups:{
  //       commnons:{
  //         name:'commons',
  //         filename:'js/base.js',
  //         chunk:'initial',
  //         minChunks:2
  //       }
  //     }
  //   }
  // },
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       uglifyOptions: {
  //         compress: false
  //       }
  //     })
  //   ],
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         name: 'vendor',
  //         chunks: 'initial',
  //         minChunks: 2,
  //         maxInitialRequests: 5,
  //         minSize: 0,
  //         priority: 10,
  //         enforce: true
          
  //         // chunks: "async",
  //         // minSize: 30000, // 模块的最小体积
  //         // minChunks: 1, // 模块的最小被引用次数
  //         // maxAsyncRequests: 5, // 按需加载的最大并行请求数
  //         // maxInitialRequests: 3, // 一个入口最大并行请求数
  //         // automaticNameDelimiter: '~', // 文件名的连接符
  //       }
  //     }
  //   }
  // },
  devServer: {
    // contentBase: './dist'
    port: 8086,
    hot:true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          // es6-es5
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env']
            presets: ['env']
          }
        }
      },{
        test: /\.css$/,
        use: [
          'css-loader',
          'style-loader'
        ]
      },{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: ['css-loader', 'sass-loader']
        })
      },{
        test: /\.(png|jpg|gif)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      // 字体图标的处理
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}