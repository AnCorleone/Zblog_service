const express = require('express')
const userRouter =  require('./src/router/user')
// const mysql = require('mysql')
const cors = require('cors')
// const session = require('express-session')
// const { expressjwt: jwt } = require("express-jwt");

const app  = express()
// 配置跨域中间件
app.use(cors())
//配置表单解析中间件
app.use(express.urlencoded({extended:false}))
// 配置路由中间件
app.use(userRouter)
app.get('/',(req,res)=>{
  res.json ({
    code: 200,
    message:'请求成功!',
    data: '绿蚁新醅酒，红泥小火炉。晚来天欲雪，能饮一杯无？' 
  })
})
app.listen('3007',()=>{
  console.log(' 🚗🚗🚗   express start successful on 127.0.0.1:3007  🚗🚗🚗  ');
})
