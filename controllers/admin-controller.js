const User = require("../models/user");

// function for displaying  home

displayHome = function (req, res, next) {
    res.render("admin_home");
}

module.exports.displayHome = displayHome;

addUser = function (req, res, next) {
    console.log(req.body);
    var newUser = new User(req.body);

    console.log(newUser);

    newUser.save(function (err, user) {
        if (err) {
            console.log("err");
            res.status(401).send(err);
        } if (user) {
            console.log("er");
            res.status(200).send({ message: "user sucessfully created" });
        }
    });

}

module.exports.addUser = addUser;

user = function (req, res, next) {
    res.render("admin_adduser");
}
module.exports.user = user;