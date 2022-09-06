const express = require('express')
const router = express.Router()

// 登录
router.get('/api/user/login', (req, res) => {
  res.json({
    code: 200,
    message: '请求成功!',
    data: '登录'
  })
})

//注册
router.post('/api/user/register', (req, res) => {
  res.json({
    code: 200,
    message: '请求成功了!',
    data: '注册'
  })
})

//通过id获取用户信息
router.get('/api/user/:id', (req, res) => {
  res.json({
    code: 200,
    message: '请求成功!',
    data: '通过id获取用户信息'
  })
})

//通过id删除用户
router.delete('/api/user/:id', (req, res) => {
  res.json({
    code: 200,
    message: '请求成功!',
    data: '通过id删除用户'
  })
})

module.exports = router