const User = require("../models/auth");
const passport = require('passport');
const session = require('express-session');

login = function (req, res) {
    res.render('student_login', { user: req.user });
};

module.exports.login = login;

logout =  function (req, res) {

    req.logout();
    res.redirect("login");
};

module.exports.logout = logout;

student = function (req, res) {
    res.render('student_home');
};

module.exports.student = student;

google = passport.authenticate('google', {
   
    scope: ['email']

    
});

module.exports.google = google;

profile = function (req, res) {
    res.render('student_profile', { user: req.user });
    console.log("email123");
    // res.send('You are logged in, this is your profile-' + req.user.username);
};

module.exports.profile = profile;

home = function (req, res) {
    res.render('student_home', { user: req.user });
    console.log("email123");
    // res.send('You are logged in, this is your profile-' + req.user.username);
};

module.exports.home = home;


// call back route for google to redirect to
redirect = function (req, res) {
    console.log("ohh");
    // res.send(req.user);
    res.redirect('student');
};

module.exports.redirect = redirect;

authCheck = function (req, res, next) {
    if (!req.user) {
        // if is not logged in
        res.redirect('/student_login');
    } else {
        // if loggin
        next();
    }
};

module.exports.authCheck = authCheck;


