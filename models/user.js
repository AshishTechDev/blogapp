const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
        type: "String",
        required: false,
    },
    email: {
      type: "String",
      required: true,
      unique: true,
    },
    password: {
      type: "String",
      required: true,
    },
    role : {
      type: "String",
      required: false,
    },
    resetToken : String,
    resetTokenExpiration : Date,
    Blogs: [
      {
        BlogId: {
          type: Schema.Types.ObjectId,
          ref: "Blog",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.addToBlogs = function (blogId) {
  //  console.log(blogId.toString());
  // console.log(this);
  const updatedBlogItems = [...this.Blogs];
    updatedBlogItems.push({ BlogId: blogId});
  this.Blogs = updatedBlogItems;
  return this.save();
};

userSchema.methods.removeFromBlog = function (blogId) {
   
  const updatedblog = this.Blogs.filter((b) => {
    return b.BlogId.toString() !== blogId;
  });
  this.Blogs = updatedblog;
  return this.save();
};


module.exports = mongoose.model("User", userSchema);
