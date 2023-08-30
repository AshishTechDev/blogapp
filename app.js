const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const app = express();

const MONGODB_URI = `mongodb+srv://superkingsashish:${encodeURIComponent('Ashishb18')}@cluster0.27sicvx.mongodb.net/blogapp?retryWrites=true&w=majority` ;

const User = require("./models/user");

app.set("view engine", "ejs");

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

//IMPORTING ROUTES
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");





app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/uploads/images", express.static("uploads/images"));

app.use(session({ 
    secret: 'It is a secret key', 
    resave: false, 
    saveUninitialized: false,
    store: store,
  })
  );

  app.use(flash());

  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.isAdmin = req.session.role == 'admin' ? true : false;
    if(!req.session.isLoggedIn) {
     return next();
    }
     User.findById(req.session.user)
     .then((user) => {
       req.user = user;
       next();
     })
     .catch((err) => console.log(err));
   });



app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use(userRoutes);


mongoose
.connect(MONGODB_URI)
.then(()=>{
    app.listen(5000,'localhost', ()=>{
        console.log('Server listening on 5000') ;
    });
})
.catch(err => console.log(err));




