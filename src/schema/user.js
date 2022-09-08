const joi = require('joi')
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则 
 */

// 用户名校验规则
const username = joi.string().alphanum().min(2).max(36).required()
// 密码校验规则
const password  =joi.string().pattern(/^[\S]{6,12}$/).min(6).max(36).required()
const id  =joi.number().integer().min(1).required()
const email  =joi.string().email()
const nickname = joi.string().min(2).max(36).required()

// 注册和登录表单验证规则对象
exports.reg_login_schema ={
  body :{
    username,
    password
  }
}

// 更新用户信息验证规则对象
exports.reg_update_schema ={
  body :{
    id,
    email,
    nickname,
  }
}


