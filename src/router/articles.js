const express = require('express')

const handler = require('./handler/articles')
const router = express.Router()

// 获取文章列表
router.get('/list',handler.getActiclesList)

// 新增文章
router.put('/add',handler.addActicle)

// 删除文章
router.delete('/delete/:id',handler.deleteActicleById)

// 获取文章信息
router.get('/getInfo/:id',handler.getActicleInfo) 

module.exports =router