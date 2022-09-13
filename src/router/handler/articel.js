const db = require('../../db/index')

exports.getCateList = (req, res) => {
  db.query('SELECT * from ev_article_cate where is_delete = 0 order by id asc', (err, result) => {
    if (err) return res.cc(err)
    res.cc('查询成功!', 0, result)
  })
}

exports.deleteCateById = (req, res) => {
  const { id } = req.params
  db.query('DELETE FROM  ev_article_cate where id = ? ', id, (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows !== 1) return res.cc('删除文章分类失败')
    res.cc('删除文章分类成功!', 0, result)
  })

}

exports.addCate = (req, res) => {
  const body = req.body
  db.query('SELECT * FROM ev_article_cate where name = ? or alias  =? ', [body.name, body.alias], (err, result) => {
    if (err) return res.cc(err)
    if (result.length > 0) return res.cc('分类名或别名已经存在!')
    db.query('INSERT INTO ev_article_cate set ? ', body, (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows != 1) return res.cc('新增文章分类失败!')  
      res.cc('新增文章分类成功!', 0, result)
    })
  })

}

exports.getCateById = (req, res) => {
  const { id } = req.params
  db.query('SELECT * FROM ev_article_cate where id =?', id, (err, result) => {
    if (err) return res.cc(err)
    if (result.length !== 1) res.cc('获取文章分类信息失败')
    res.cc('查询成功', 0, result)
  })

}