exports.login = (req, res) => {
  res.json({
    code: 200,
    message: '请求成功!',
    data: '登录啦'
  })
}

//注册
exports.register = (req, res) => {
  res.json({
    code: 200,
    message: '请求成功了!',
    data: '注册'
  })
}


//通过id获取用户信息
exports.getUserById = (req, res) => {
  res.json({
    code: 200,
    message: '请求成功!',
    data: '通过id获取用户信息'
  })
}

//通过id删除用户
exports.deleteUserById = (req, res) => {
  res.json({
    code: 200,
    message: '请求成功!',
    data: '通过id删除用户'
  })
}
