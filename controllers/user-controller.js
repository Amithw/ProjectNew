const jwt = require("jsonwebtoken");
const User = require("../models/user");
const SECRET_KEY = "sathira";
// function for displaying  home

displayHome = function (req, res, next) {
   
    res.render("user_home");
}

module.exports.displayHome = displayHome;

authenticate = function (req, res, next) {
    var userData = req.body;
    console.log(userData);
    User.findOne({ student_id: userData.student_id }, function (err, user) {
        if (err) {
            res.status(403).send({ message: "forbidden" });
        }
        if (!user) {
            console.log("err");

            res.status(403);
            res.send({ error: "invalid username or password" });


        }
        if (user) {
            user.checkPassword(userData.password, function (err, isMatched) {
                console.log(isMatched);
                if (err) {
                    res.status(500).send({ error: "internal server error" });
                    return next(err);
                }
                if (isMatched) {
                    const token = jwt.sign({ id: user._id }, SECRET_KEY);
                    res.status(200);
                    res.send({ token: token, role: user.role });

                }
                else {
                    res.status(403).send({ error: "user not found" });

                }
            });
        }
    });
}

module.exports.authenticate = authenticate;
getUser = function (req, res, next) {
    var id = req.params.id;
    jwt.verify(id, SECRET_KEY, function (err, decode) {
        console.log(decode);
        User.findById(decode.id, { student_id: 1,name:1, role: 1, nic: 1, phone_number: 1, email: 1, photo: 1, cv: 1, technical_skills: 1 }, function (err, user) {
            if (err) {
                res.status(400);
                res.send({ error: "no user can be found" });
            }
            if (user) {
                res.status(200);
                res.send(user);

            }
        });

    });


}

module.exports.getUser = getUser;

edit = function (req, res, next) {
    res.render("user_edit");
}
module.exports.edit = edit;

userUpdate = function (req, res, next) {
    var id = req.params.id;
    var studentData = req.body;
    
    console.log(req.body);
    User.findOneAndUpdate({ _id: id }, studentData, function (err, user) {
        if (err) {
            res.status(400);
            res.send({ errors: "Error occured when updating the student." });
        }
        if (user) {
            
            User.findOne({ _id: id }).then(function (user) {
                res.status(200);
                res.send(user);
            });
            
        }
    });
}

module.exports.userUpdate = userUpdate;