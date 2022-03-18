const express = require("express");
const { getCategories, getCategoryPosts, getCategoryPost } = require('../controllers/elmaelma')

const router = express.Router()

router.get("/",getCategories)
router.get("/posts",getCategoryPosts)
router.get("/post",getCategoryPost)

module.exports = router ;