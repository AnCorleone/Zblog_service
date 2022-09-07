const db = require('../../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const  {expiresIn,secretKey} = require('../../utils/config')
exports.login = (req, res) => {
  const body =  req.body
  // 生成token
  const payload = { username:body.username}
  const token =  jwt.sign(payload,secretKey,{expiresIn})
  const data  ={
    message: '请求成功!',
    token
  }
  res.cc('登录成功!',0, data)
}

//注册
exports.register = (req, res) => {
  const body = req.body
  if (!body.username || !body.password) {
    return res.cc('用户名或密码不能为空!', 1)
  }
  db.query("SELECT * from ev_user WHERE username = ? ", body.username, (err, result) => {
    // if (err) return res.send({ status: 1, message: 'SQL查询错误!' })
    if (err) return res.cc(err)
    if (result.length > 0) return res.cc('用户名已存在!')
    const bcryptPassword = bcrypt.hashSync(body.password, 10) 
    //  插入新用户
    // const insertSql = 'INSERT INTO ev_user (username, password, nickname) VALUES (?, ?, ?)'
    const insertSql = 'INSERT INTO ev_user set ?'
    db.query(insertSql, { username: body.username, password: bcryptPassword }, (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc('SQL查询错误!')
      res.cc('注册成功了!', 0, { ...body, password: bcryptPassword })
    })

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
  console.log('req---', req.params);
  const id = req.params.id
  if (id) {
    db.query('DELETE FROM ev_user WHERE id = ?', id, (err, result) => {
      if (err) return res.send('删除失败')
      res.json({
        status: 0,
        message: '请求成功!',
        data: result
      })
    })
  } else {
    res.json({
      code: 300,
      message: '获取id失败!'
    })
  }


}
