const joi = require('joi')
const name = joi.string().required()
const id = joi.string().required()
// 新增文章分类的校验
exports.reg_article_cate_schema ={
  body :{
    name
  }
}

// 更新文章分类的校验
exports.reg_article_cate_schema_update ={
  body :{
    id
  }
}
