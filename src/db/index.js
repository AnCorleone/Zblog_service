const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  // port:'3306',
  user:'root',
  password:'ef123456',
  database:'z_blog'
})

// const db = mysql.createPool({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'ef123456',
//   database: 'test'
// })
// db.query('SELECT * FROM `ev_user`',(err,res)=>{
//   console.log('----',res);
// })
module.exports =db