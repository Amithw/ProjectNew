const User = require("../models/auth");
const passport = require('passport');
const session = require('express-session');

login = function (req, res) {
    res.render('student_login', { user: req.user });
};

module.exports.login = login;

logout = function (req, res) {

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

edit = function (req, res) {

    User.findOne({ id: req.params.id }).exec(function (err, user) {
        if (err) {
            console.log("error");

        }
        else {
            console.log(req.user.id);
            res.render("student_edit", { user: req.user });

        }
    })

    //  res.render('student_edit', { user: req.user });
    console.log("edit page loading");
    // res.send('You are logged in, this is your profile-' + req.user.username);
};

module.exports.edit = edit;

studentUpdate = function (req, res) {

    User.findByIdAndUpdate( req.body.id, {
        $set: {
            student_id: req.body.student_id, f_name: req.body.f_name, l_name: req.body.l_name, nic: req.body.nic, phone_number: req.body.phone_number, email: req.body.email, cv: req.body.cv, technical_skills: req.body.technical_skills,
        }
    }, { new: true }, function (err, user) {
        if (err) {
            console.log(err);
            res.render("student_edit", { user: req.body });
        }
        res.redirect("student_profile");
    })
}

module.exports.studentUpdate = studentUpdate;


