const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const {validationResult} = require("express-validator");

const User = require("../models/user");
const { request } = require("http");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "superkingsuniverse1@gmail.com",
        pass: "xnnlixaxjkikxbeb"
    }
});

exports.getlogin = (req, res, next) => {
    res.render("auth/login", {
        pageTitle : "Login",
        path : "/login",
        title: "Login Page",
        errorMessage : req.flash("error"),
});
};

exports.getregister = (req, res, next) =>{
    res.render("auth/register", {
        pageTitle : "Sign Up",
        path : "/signup",
        errorMessage: req.flash("error"),
        title: "Signup Page"
    });
};

exports.postSignup = async (req, res, next) =>{
    const {name, email, password} = req.body ;

    // const errors = validationResult(req);

    // if(!errors.isEmpty()) {
    //     return res.render("auth/register", {
    //         pageTitle: "Sign Up",
    //         path : "/signup",
    //         errorMessage: errors.array()[0].msg,
    //         title : "Signup Page",
    //     });
    // }


    console.log(email, password);
    //1) check if the user already exists or not
    const user = await User.findOne({ email : email });
    // console.log(user);

    if(user){
        req.flash("error", "You already have an account");
        return res.redirect("/login");
    }
    //2) Encrypt the password of the user
    let hashedPassword;
    try{
         hashedPassword = await bcrypt.hash(password, 12);
        console.log(hashedPassword);
    } catch (err){
        console.log("unable to encrypt password") ;
        return next(err);
    }
   
    //3) Store the email and password in the database
    try {

        const users = await User.find();
        if(users.length == 0){
            const user = await User.create({
              name: name,
                email : email,
                password: hashedPassword,
                role: 'admin',
            });
        } else {
            const user = await User.create({
              name: name,
            email : email, 
            password: hashedPassword,
            role: 'customer',
         });
        }
    } catch(err){
        console.log("unable to create user", err);
        return next(err);
    }

    //4) Send the email to the user on successful login
    try{
        const mailSent = await transporter.sendMail({
            from: "superkingsuniverse1@gmail.con",
            to: email,
            subject: "Signup Successfully",
            html: "<h1>You have successfully Signed Up</h1>",
        });
        if(mailSent){
            res.redirect("/login");
        }
    } catch (err) {
        console.log("unable to send email", err);
        return next(err);
    }

};

exports.postLogin = async (req, res, next) => {
  const {email, password} = req.body ;
  console.log(email, password);

 const user = await User.findOne({ email: email});
 if(!user){
  // req.flash('error', "Invalid username or password") ;
    console.log("no user found");
      return res.redirect("/login");
 }

 try {
  const doMatches = await bcrypt.compare(password, user.password);
  if(doMatches){
      req.session.isLoggedIn = true;
      req.session.user = user._id;
      req.session.role = user.role;



      req.session.save(() => {
       return res.redirect("/");
      });
  } 
  else {
      // req.flash('error', "Invalid username or password") ;
      console.log("password incorrect");
       return res.redirect("/login");
  }
 }catch(e){
  console.log("Internal error");
 }
};


exports.Logout = (req, res,next) => {
    req.session.destroy(() => {
            res.redirect("/login");
        });
}

//34:00