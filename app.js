const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const routes = require("./routes");
const mongoose =require("mongoose");
const db=require("./config/db");

const multer = require('multer');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const CookieSession = require('cookie-session');
const passport = require('passport');
const session = require('express-session');

const app = express();
const config = require("./config/config.json")[app.get("env")];

db.connect(config.mongourl);

app.set("views",[
    path.resolve(path.join(__dirname,"views"),"application"),
    path.resolve(path.join(__dirname,"views"),"users"),
    path.resolve(path.join(__dirname,"views"),"admin"),
    path.resolve(path.join(__dirname,"views"),"organizations"),
    path.resolve(path.join(__dirname,"views"),"partials"),
    path.resolve(path.join(__dirname,"views"),"student"),
]);

app.set("view engine","ejs");
app.use(express.static(path.resolve(__dirname,"public")));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(CookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());



// create home route
// app.get('/',function(req,res){
//     res.render('home',{user:req.user});
// });

app.use(routes);

app.listen(3000,function(){
    console.log("app is listnenig on port 3000");
});