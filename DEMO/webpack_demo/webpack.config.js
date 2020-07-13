// webpack是node写出来的，支持node语法
let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let {CleanWebpackPlugin} = require('clean-webpack-plugin')

// path.join: 把参数一一拼接，成为合规的地址，../../是前面拼好的地址上上层级
// console.log(path.join(__dirname, '../../', 'dist'))
module.exports = {
  optimization:{ // 优化项 (开发环境不执行优化项) 
    // minimize: true,
    minimizer:[
      new UglifyJsPlugin({
        cache: true,
        // 并行压缩多个
        parallel: true,
        sourceMap: true
      })
    ]
  },
  resolve:{
    // 解析第三方包找的路径 common
    modules:[path.resolve('node_modules')],
    extensions:['.js','.css','.json','.vue'],
    // 别名
    alias:{
      'bootstrap':'bootstrap/dist/css/bootstrap.css'
    }
  },
  devServer:{ // 开发服务器的配置
    // port:3000,
    progress:true,//进度条
    contentBase:'./dist',
    compress:true,

    // 3)有自己写的服务端

    // // 2) mock数据
    // before(app){ // 钩子
    //   app.get('/api/user', (req, res) => {
    //     console.log('请求成功22')
    //     res.json({name:'跨域成功22'})
    //   })
    // }
    // 1)服务端是别人的
    proxy: {
      '/api':{
        // target: 'https://crmdemo.nexttao.com:4000',
        // secure: false,
        target: 'http://localhost:3000',
        // pathRewrite: {"^/api" : ""}
      }
    }
  },
  devtool:'source-map',
  // development/production
  mode:'development',
  entry:'./src/index.js',
  output:{
    filename:'bundle.[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname + '/dist')
    // path: path.join(__dirname, '..', 'dist')
  },
  // externals:{
  //   // 不需要打包的插件（scrip引入）
  //   jquery: '$'
  // },
  plugins:[ 
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html',
      // filename:'index-out.html',
      // hash:true, // 引入的bundle加hash
      // minify:{
      //   removeAttributeQuotes:true, // 去掉双引号
      //   collapseWhitespace:true  // 去空格
      // }
    }),
    new MiniCssExtractPlugin({
      filename:'main.css'
    }),
    // new CleanWebpackPlugin({}),
    // 定义环境变量
    new webpack.DefinePlugin({
      DEV:JSON.stringify('production'),
      FLAG:'true',
      EXPRESSION:JSON.stringify('1+1')
    }),
    new webpack.ProvidePlugin({
      $:'jquery'
    })
  ],
  module:{ // 模块
    noParse:/jquery/,// 不去解析jQuery中的依赖库
    rules:[
      // {
      //   test:require.resolve('jquery'),
      //   use:'expose-loader?$'
      // },
      // {
      //   test:/\.js$/,
      //   use:['eslint-loader'],
      //   options:{
      //     enforce:'pre'
      //   }
      // },
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:[
              '@babel/preset-env'
              // es7（class）一些兼容。。
            ]
          }
        },
        include:path.resolve('src'),
        exclude:/node_module/
      },
      {
        test: /\.css$/,
        // 从右向左(从下到上)执行
        use: [
          // styel-loader把css转换成<style>插入页面
          // {
          //   loader: 'style-loader',
          //   options:{
          //     insert:'meta'
          //   }
          // },
          // 抽离成main.css文件
          MiniCssExtractPlugin.loader,
          // css-loader解析@import
          'css-loader',
          // 加浏览器前缀
          'postcss-loader'
        ]
      },
      {
        // npm i less less-loader / node-sass sass-loader / stylus stylus-loader
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          // 加浏览器前缀
          // 'postcss-loader',
          {
            loader: 'postcss-loader',
            // options:
            // {
            //   plugins:[require("autoprefixer")("last 100 versions")]
            // }
          },
          'less-loader'
        ]
      }
    ]
  }
}