const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");


const app = express();

app.set("views",[
    path.resolve(__dirname,"views"),
    path.resolve(path.join(__dirname,"views"),"users"),
    path.resolve(path.join(__dirname,"views"),"admin"),
    path.resolve(path.join(__dirname,"views"),"organizations"),
]);

app.set("view engine","ejs");
app.use(express.static(path.resolve(__dirname,"public")));



app.listen(3000,function(){
    console.log("app is listnenig on port 3000");
})