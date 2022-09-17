const db = require('../../db/index')

exports.getActiclesList = (req, res) => {
  const body = req.body
  db.query('select * from ev_articles where is_delete = 0 ', body, (err, result) => {
    if (err) return res.cc(err)
    res.cc(result)
  })
}

exports.addActicle = (req, res) => {
  const body = req.body
  db.query('insert into ev_articles set ? ', body, (err, result) => {
    if (err) return res.cc(err)
    res.cc('新增成功!', 0, result)
  })
}

exports.deleteActicleById = (req, res) => {
  const { id } = req.params
  db.query('delete from ev_articles where id = ?', id, (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows!==1) return res.cc("删除失败")
    res.cc('删除成功!', 0, result)
  })
}

exports.getActicleInfo = (req, res) => {
  const { id } = req.params
  db.query('select *  from ev_articles where id = ?', id, (err, result) => {
    if (err) return res.cc(err)
    res.cc('查询成功!', 0, result)
  })
}
