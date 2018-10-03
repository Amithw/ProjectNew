const User = require("../models/user");
const jwt = require("jsonwebtoken");
// display the home of the application
appHome = function (req, res, next) {
    res.render("index")
}

module.exports.appHome = appHome;

pageNotFound = function (req, res, next) {
    res.status(404).render("404");
}

module.exports.pageNotFound = pageNotFound;

login = function (req, res, next) {
    res.status(200).render("login");
}

module.exports.login = login;

userAuthentication = function (req, res, next) {
    
    next();
}



module.exports.userAuthentication = userAuthentication;