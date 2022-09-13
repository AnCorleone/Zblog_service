const joi = require('joi')
const name = joi.string().required()
const id = joi.number().integer().min(1).required()
// 新增文章分类的校验
exports.reg_article_cate_schema ={
  body :{
    name
  }
}
