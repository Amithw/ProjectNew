const User = require("../models/user");

// function for displaying  home

displayHome = function (req, res, next) {
    res.render("admin_home");
}

getUsers = function (req, res, next) {

    User.find({}, { student_id: 1,name:1, role: 1, nic: 1, phone_number: 1, email: 1, photo: 1, cv: 1, technical_skills: 1 }, function (err, users) {
        if (err) {
            res.status(500);
            res.send({ errors: "internal serve error" });
        }
        if (users) {
            res.status(200);
            res.send({ users });
        }
    });
}
module.exports.getUsers = getUsers;

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

edit = function (req, res, next) {
    res.render("admin_edit");
}
module.exports.edit = edit;

userUpdate = function (req, res, next) {
    var id = req.params.id;
    var studentData = req.body;
    
    console.log(req.params.id);
    User.findOneAndUpdate({ _id: id }, studentData, {new:true} ,function (err,user) {
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