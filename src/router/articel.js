const express = require('express')
const schema = require('../schema/article')
const expressJoi = require('@escook/express-joi') // 表单校验中间件 
const router = express.Router()

const {getCateList,deleteCateById,addCate,getCateById} = require('./handler/articel')
router.get('/cates',getCateList)
router.delete('/delele/:id',deleteCateById)
router.post('/addCate',expressJoi(schema.reg_article_cate_schema),addCate)
router.get('/getCateById/:id',getCateById)
module.exports =router