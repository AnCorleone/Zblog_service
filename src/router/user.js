const express = require('express')
const hanlder =  require('./handler/user')
const router = express.Router()

// 登录
router.get('/api/user/login', hanlder.login)

//注册
router.post('/api/user/register',hanlder.register)

//通过id获取用户信息
router.get('/api/user/:id', hanlder.getUserById)

//通过id删除用户
router.delete('/api/user/:id', hanlder.deleteUserById)

module.exports = router