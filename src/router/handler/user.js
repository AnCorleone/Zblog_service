const db = require('../../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { expiresIn, secretKey } = require('../../utils/config')
exports.login = (req, res) => {
  const user = req.body
  const { username, password } = user
  db.query('SELECT * FROM  ev_user  WHERE username = ?', username, (err, result) => {
    if (err) return res.cc(err, 1)
    if (result.length > 0) {
      const isCompare = bcrypt.compareSync(password, result[0].password)
      if (isCompare) {
        // 生成token ,为了安全,密码和头像不参与token生成
        const payload = { ...result[0], password:'',user_pic:'' }
        const token = "Bearer "+ jwt.sign(payload, secretKey, { expiresIn }) 
        const data = {
          message: '请求成功!',
          token
        }
        res.cc('登录成功!', 0, data)
      }else {
        res.cc('密码错误!')
      }
    } else {
      return res.cc("用户不存在!")
    }

  })

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
  const {id } = req.params
  db.query("SELECT * FROM  ev_user  WHERE id =  ?", id,(err,result)=>{
    if (err) return res.cc(err)
    if (result.length!==1) return res.cc('获取用户信息失败!')
    const user =  result[0]
    const data  ={
      data :user
    }
    res.cc("获取成功!",1,data)
  })
  
}

// 获取用户信息
exports.getUser = (req,res)=>{
  const auth = req.auth
  db.query('SELECT * from ev_user WHERE id = ?',auth.id,(err,result)=>{
      if (err) return res.cc(err)
      if (result.length!==1) return res.cc('获取用户信息失败!')
      const user = result[0]
      delete user.password
      const data  ={
        data :{
          ...user
        }
      }
      res.cc("successful",1 ,data)
  })
  
} 

// 更新用户信息
exports.updateUser =(req,res) =>{
    const user =  req.body
    delete user.id  // id 不做修改
    db.query('update ev_user set ? where id=?',[user ,user.id], (err,result)=>{
      if (err) return res.cc(err)
      if (!result) return res.cc('更新用户信息失败!')
      res.cc('update ok !',1,result)
    })
}

// 重置密码
exports.resetPassword =(req,res) =>{
  const {id,oldPassword,password }  =  req.body
  // 1. 查询用户是否存在 , 应该不需要,因为有token信息,但是为了获取密码和传入的秘密进行比较需要此操作
  db.query('SELECT * from ev_user where id = ?',id, (err,result)=>{
    if (err) return res.cc(err)
    if (result.length!==1) return res.cc('用户不存在!') 
    // 2. 比较旧密码是否正确
    const isCompare =  bcrypt.compareSync(oldPassword, result[0].password)
    if(!isCompare) return res.cc('旧密码错误!')
      // 3. 对新密码加密之后存入数据库
    const bcryptPassword = bcrypt.hashSync(password, 10)
    const info = {
      password :bcryptPassword
    }
    db.query('update ev_user set ? where id = ? ',[info,id] ,(err,result)=>{
      if (err) return res.cc(err)
      res.cc("重置密码成功",0 ,result) 
    })
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

// 更新用户头像
exports.updateAvatar = (req,res)=>{
  const {id, avatar} =  req.body
  console.log('更新用户头像',req.body);
  db.query('update ev_user set user_pic = ? where id = ?  ',[avatar,id], (err,result)=>{
    if(err) return res.cc(err)
    if (result.affectedRows!==1)  return res.cc('更新用户头像失败!')  
    res.cc('更新用户头像成功!',0,{...req.body,...result})  
  })
  
}
