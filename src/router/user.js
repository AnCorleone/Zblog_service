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

//通过用户信息
router.get('/api/user', hanlder.getUser)

//通过id删除用户
router.delete('/api/user/:id', hanlder.deleteUserById)

//更新用户信息
router.put('/api/user/update',expressJoi(userSchema.reg_update_schema), hanlder.updateUser)

// 重置密码
router.put('/api/user/reset',expressJoi(userSchema.reg_reset_schema), hanlder.resetPassword)

// 更新用户头像
router.put('/api/update/avatar', expressJoi(userSchema.update_avatar_schema), hanlder.updateAvatar)
// router.put('/api/update/avatar', hanlder.updateAvatar)

module.exports = router