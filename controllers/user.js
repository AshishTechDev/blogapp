const Blog = require('../models/blogs');

exports.getIndex = async (req, res, next) => {
    try {
      const blogs = await Blog.find();
      res.render("user/index", {
        pageTitle: "Home",
        title: "TRENDING BLOGS",
        path: "/",
        blogs: blogs,
      });
      } catch(err) {
          console.log(err.message);
      }
    }

  exports.getMyBlogs = async (req, res, next) => {
    try {
      const user = await req.user.populate("Blogs.BlogId");
      const blogs = user.Blogs;
      res.render("user/myblogs", {
        pageTitle: "my blogs",
        title: "MY BLOGS",
        path: "/myblogs",
        blogs: blogs,
      });
      } catch(err) {
          console.log(err.message);
      }
    }
exports.deleteBlog = async (req, res, next) => {
  try {
    const id = req.params.id ;
    const response = await req.user.removeFromBlog(id);
    // console.log(response);
      await Blog.findByIdAndDelete(id);
    res.redirect("/myblogs");
  } catch(err) {
          console.log(err.message);
  }
}

exports.editBlog = async (req, res, next) => {
      try {
        const id = req.params.id ;
        const blog = await Blog.findById(id);
        res.render("user/editblog", {
          pageTitle: "Edit Blog",
          path: "/edit-blog",
          blog: blog,
        });
 
      } catch(err) {
        console.log(err.message);
      }
}

exports.updateBlog = async (req, res, next) => {
  const {title, imageUrl, author, category, description, id} = req.body ;
  console.log(title, imageUrl, author, category, id) ;
  try {
    await Blog.findByIdAndUpdate(id, {
      title,
      imageUrl,
      author,
      category,
      description,
    });
    res.redirect('/myblogs');
} catch (err) {
      console.log(err) ;
}
   
}
  
    exports.addBlogForm = async (req, res, next) => {
      try {
        res.render("user/addblog", {
          pageTitle: "Add blogs",
          title: "Add your BLOGS",
          path: "/add-blogs",
        });
        } catch(err) {
            console.log(err.message);
        }
    }

    exports.postAddBlog = async (req, res, next) => {
      const { title, imageUrl, author, category, description } = req.body ;
   try {
      const response = await Blog.create({title, imageUrl, author, category, description});
    // console.log(response._id);
     await req.user.addToBlogs(response._id);
       res.redirect('/myblogs');
   } catch (err) {
      console.log(err.message);
   }
  }; 

  exports.getBlogDetails = async (req, res, next) => {
    const {id} = req.params ;
    try {
      const blog = await Blog.findById(id) ;
      res.render("user/blog-details", {
        pageTitle: "full blogs",
        title: "Blog Details",
        path: "/blog-details",
        blog: blog,
      });
    } catch (err) {
      console.log(err.message);
    }
  }