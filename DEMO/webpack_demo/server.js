let express = require('express')

let app = express()

// // 3)
// let webpack = require('webpack')
// // 中间件
// let middle = require('webpack-dev-middleware')
// let config = require('./webpack.config.js')
// let compiler = webpack(config)
// app.use(middle(compiler))

app.get('/api/user', (req, res) => {
  console.log('请求成功1')
  res.json({name:'跨域成功1'})
})

app.listen(3000)
