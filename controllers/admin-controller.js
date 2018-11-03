const User = require("../models/user");

// function for displaying  home

displayHome = function (req, res, next) {
    res.render("admin_home");
}

module.exports.displayHome = displayHome;

getUsers = function (req, res, next) {

    User.find({}, function(err, data) {
        // note that data is an array of objects, not a single object!
        res.render('admin_view_all', {
            user : req.user,
            practices: data
        });
    });
}

module.exports.getUsers = getUsers;



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