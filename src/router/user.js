const express = require('express')
const expressJoi = require('@escook/express-joi') // 表单校验中间件 
const hanlder =  require('./handler/user')
const userSchema =  require('../schema/user')
const router = express.Router()

// 登录
router.get('/api/user/login', expressJoi(userSchema.reg_login_schema), hanlder.login)

//注册 包含了表单校验中间件, 自定义的请求处理函数
router.post('/api/user/register',expressJoi(userSchema.reg_login_schema),hanlder.register)

//通过id获取用户信息
router.get('/api/user/:id', hanlder.getUserById)

//通过id删除用户
router.delete('/api/user/:id', hanlder.deleteUserById)

module.exports = router