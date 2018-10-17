const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const routes = require("./routes");
const mongoose =require("mongoose");
const db=require("./config/db");
const app = express();
const config = require("./config/config.json")[app.get("env")];
const multer = require('multer');
const upload = multer({dest: './uploads'});

db.connect(config.mongourl);

app.set("views",[
    path.resolve(path.join(__dirname,"views"),"application"),
    path.resolve(path.join(__dirname,"views"),"users"),
    path.resolve(path.join(__dirname,"views"),"admin"),
    path.resolve(path.join(__dirname,"views"),"organizations"),
    path.resolve(path.join(__dirname,"views"),"partials"),

]);

app.set("view engine","ejs");
app.use(express.static(path.resolve(__dirname,"public")));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.use(routes);



app.listen(3000,function(){
    console.log("app is listnenig on port 3000");
});