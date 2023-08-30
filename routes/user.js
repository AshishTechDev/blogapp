const express = require('express');
const router = express.Router();
const { getIndex, getMyBlogs, deleteBlog, editBlog, updateBlog,  addBlogForm, postAddBlog, getBlogDetails} = require("../controllers/user");

router.get("/",getIndex);
router.get("/myblogs",getMyBlogs);
router.get("/Delete-blog/:id",deleteBlog);
router.get("/edit-blog/:id",editBlog);
router.get("/addblog", addBlogForm);
router.post("/addblog", postAddBlog);
router.post("/updateblog", updateBlog);
router.get("/blog-details/:id", getBlogDetails);


module.exports = router;