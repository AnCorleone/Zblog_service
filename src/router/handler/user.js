const db = require('../../db/index')
const bcrypt = require('bcryptjs')

exports.login = (req, res) => {
  console.log('req: ', req);
  res.json({
    code: 200,
    message: '请求成功!',
    data: '登录啦' + req
  })
}

//注册
exports.register = (req, res) => {
  const body = req.body
  if (!body.username || !body.password) {
    return res.send({ code: 200, status: 1, messge: '用户名或密码不能为空!' })
  }
  db.query("SELECT *  from ev_user WHERE username = ? ", body.username, (err, result) => {
    if (err) return res.send({ status: 1, message: 'SQL查询错误!' })
    if (result.length > 0) return res.send({ status: 1, message: '用户名已存在!' })
    const bcryptPassword = bcrypt.hashSync(body.password, 10)
    //  插入新用户
    // const insertSql = 'INSERT INTO ev_user (username, password, nickname) VALUES (?, ?, ?)'
    const insertSql = 'INSERT INTO ev_user set ?'
    db.query(insertSql, { username: body.username, password: bcryptPassword }, (err, result) => {
      console.log('err --', err);
      if (err) return res.send({ status: 1, message: 'SQL查询错误!' })
      if (result.affectedRows !== 1) return res.send({ status: 1, message: 'SQL查询错误!' })
      res.send({
        status: 0, message: '注册成功了!', data: {
          ...body,
          password: bcryptPassword
        }
      })
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
