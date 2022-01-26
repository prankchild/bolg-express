// const createError = require('http-errors');
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
// const logger = require('morgan');

const indexRouter = require('./routes/index')
// const usersRouter = require('./routes/users')

const app = express()
// 跨域
// app.all('*', function (req, res, next) {
//   // 设置允许跨域的域名，*代表允许任意域名跨域
//   res.header('Access-Control-Allow-Origin', '*')
//   // 允许的header类型
//   res.header('Access-Control-Allow-Headers', 'content-type')
//   // 跨域允许的请求方式
//   res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
//   if (req.method.toLowerCase() === 'options') {
//     res.send(200)
//   // eslint-disable-next-line brace-style
//   }
//
//   // 让options尝试请求快速结束
//   else {
//     next()
//   }
// })
// 设置跨域请求
app.all('*', function (req, res, next) {
  const originHeader = req.headers.origin
  console.log(originHeader)
  res.header('Access-Control-Allow-Origin', originHeader)
  // res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})
const http = require('http')
const server = http.createServer(app)

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// 静态资源
app.use(express.static(path.join(__dirname, 'public')))
// post请求
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(bodyParser.json())
app.use('/', indexRouter)
// app.use('/users', usersRouter)
server.listen(3000, () => {
  console.log('Server running at  http://localhost:3000/')
})
