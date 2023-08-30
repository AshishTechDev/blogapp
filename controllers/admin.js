const User = require('../models/user');

exports.manageUser = async (req, res, next) => {
    try {
      users = await User.find();
      console.log(users);
      res.render("admin/manageuser", {
        pageTitle: "Admin Panel",
        title: "Manage User",
        path: "/admin/manageuser",
        users: users,
      });
      } catch(err) {
          console.log(err.message);
      }
    }

    exports.userblogs = async (req, res, next) => {
        try {
          res.render("admin/userblogs", {
            pageTitle: "Admin Panel",
            title: "Manage User Blogs",
            path: "/admin/userblogs",
          });
          } catch(err) {
              console.log(err.message);
          }
        }