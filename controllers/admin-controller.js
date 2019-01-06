const User = require("../models/organization");
const Auth = require("../models/auth");
// var validator = require('validator');
const { check, validationResult } = require('express-validator/check');

// function for displaying  home

displayHome = function (req, res, next) {

    res.render("admin_home");
}

module.exports.displayHome = displayHome;

getUsers = function (req, res, next) {

    Auth.find({}, function (err, data) {
        // note that data is an array of objects, not a single object!
        res.render('admin_view_all', {
            user: req.user,
            practices: data
        });
    });
}

module.exports.getUsers = getUsers;

getAdmins = function (req, res, next) {

    User.find({ role: "admin" }, function (err, data) {
        // note that data is an array of objects, not a single object!
        res.render('admin_view_admin', {
            user: req.user,
            practices: data
        });
    });
}

module.exports.getAdmins = getAdmins;

getOrganizations = function (req, res, next) {

    User.find({ role: "organization" }, function (err, data) {
        // note that data is an array of objects, not a single object!
        res.render('admin_view_organization', {
            user: req.user,
            practices: data
        });
    });
}

module.exports.getOrganizations = getOrganizations;

user = function (req, res, next) {
    res.render("admin_adduser");
}

module.exports.user = user;





edit = function (req, res, next) {
    res.render("admin_edit");
}
module.exports.edit = edit;

userUpdate = function (req, res, next) {


    var id = req.params.id;
    var studentData = req.body;

    // console.log(req.params.id);

    console.log(studentData.email);

    User.findOneAndUpdate({ _id: id }, studentData, { new: true }, function (err, user) {
        if (err) {
            res.status(400);
            res.send({ errors: "Error occured when updating the student." });
            console.log("Error occured when updating the student.");
        }
        if (user) {

            res.status(200);
            res.send(user);
            console.log("update successful");

        }
    });


}

module.exports.userUpdate = userUpdate;

deleteUser = function (req, res, next) {
    var userData = req.params.id;
    console.log(userData);
    Auth.deleteOne({ _id: userData }, function (err) {
        if (err) {
            res.status(500);
            res.send({ errors: "internal server errors" });
        }
        else {
            res.status(200);
            console.log("successfully deleted the user");
            res.redirect('/admin_getUsers');
        }
    });
}

module.exports.deleteUser = deleteUser;

deleteAdmin = function (req, res, next) {
    var userData = req.params.id;
    console.log(userData);
    User.deleteOne({ _id: userData }, function (err) {
        if (err) {
            res.status(500);
            res.send({ errors: "internal server errors" });
        }
        else {
            res.status(200);
            console.log("successfully deleted the Admin");
            res.redirect('/admin_getAdmins');
        }
    });
}

module.exports.deleteAdmin = deleteAdmin;

deleteOrganization = function (req, res, next) {
    var userData = req.params.id;
    console.log(userData);
    User.deleteOne({ _id: userData }, function (err) {
        if (err) {
            res.status(500);
            res.send({ errors: "internal server errors" });
        }
        else {
            res.status(200);
            console.log("successfully deleted the Admin");
            res.redirect('/admin_getOrganizations');
        }
    });
}

module.exports.deleteOrganization = deleteOrganization;

add_User = function (req, res, next) {
    console.log(req.body);
    console.log("add user");

    var userData = req.body;
    User.findOne({ student_id: userData.studenid }, function (err, user) {
        if (err) {
            res.status(500);
            res.send({ errors: "Error when creating the user record." });
            return;
        }
        if (user) {
            res.status(500);
            res.send({ errors: "user is already exist." });
            return;
        }
        var newUser = new User(req.body);

        console.log(newUser);

        newUser.save(function (err, user) {

            if (err) {

                res.status(401).send(err);
                console.log(err);
                console.log("err method");
            }
            if (user) {
                console.log("sucessfully");
                res.status(200).send({ message: "user sucessfully created" });
            }
        });
    }
    )
}
module.exports.add_User = add_User;