
const express = require("express");

const {
    getlogin,
    getregister,
  postLogin,
  Logout,
  postSignup,
} = require("../controllers/auth");

const {body, check} = require("express-validator");

const router = express.Router();

router.post("/signup",
            [
              check("email").notEmpty().isEmail().withMessage("Invalid Email-Id"),
              body("password", "Invalid Password").matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[$#@]).{8,24}$/   //regex101.com
              ),
              body("confirmPassword").custom((value, {req}) =>  {
                if(value !== req.body.password){
                  throw new Error("Passwords do not match");
                }
                return true;
              }),
            ],
            postSignup
            );
    

router.get("/login", getlogin);

router.post("/login", postLogin);

router.get("/logout", Logout);

router.get("/register", getregister);

// router.get("/reset", getReset);

// router.post("/reset", postReset);

// router.get("/reset/:token", getNewPassword);

// router.post("/new-password", postNewPassword);


module.exports = router;
