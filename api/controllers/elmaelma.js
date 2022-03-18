const {categoryList } = require('../puppeteers/elmaelma/categories');
const {postList } = require('../puppeteers/elmaelma/categoryPosts');
const {post } = require('../puppeteers/elmaelma/categoryPost');

const getCategories = async (req, res, next) => {

  let result = await categoryList("https://www.elmaelma.com/");
  res.status(200).json(result);

};

const getCategoryPosts = async (req, res, next) => {

  let link = req.query.link
  let result = await postList(link);
  res.status(200).json(result);

};


const getCategoryPost = async (req, res, next) => {

  let link = req.query.link
  let result = await post(link);
  res.status(200).json(result);

};

module.exports = { getCategories, getCategoryPosts, getCategoryPost };
