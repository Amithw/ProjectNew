const jwt = require("jsonwebtoken");
const User = require("../models/organization");
const SECRET_KEY = "amith";
// function for displaying  home

// displayHome = function (req, res, next) {

//     res.render("user_home");
// }

// module.exports.displayHome = displayHome;

authenticate = function (req, res, next) {
    var userData = req.body;

    console.log("userData");
    console.log(userData);
    User.findOne({ student_id: userData.student_id }, function (err, user) {
        if (err) {
            res.status(403).send({ message: "forbidden" });
        }
        if (!user) {
            console.log("err");

            res.status(403);
            res.send({ error: "invalid userId or password" });


        }
        if (user) {
            user.checkPassword(userData.password, function (err, isMatched) {
                console.log(isMatched);
                if (err) {
                    console.log("err1");
                    res.status(500).send({ error: "internal server error" });
                    return next(err);
                }
                if (isMatched) {
                    const token = jwt.sign({ id: user._id }, SECRET_KEY);
                    res.status(200);
                    res.send({ token: token, role: user.role, id: user.student_id });

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
        User.findById(decode.id, { student_id: 1, name: 1, role: 1, phone_number: 1, email: 1, web: 1,nic:1, availability: 1, closing_date: 1, description: 1, job_title: 1, technology: 1, vacancy_amount: 1 }, function (err, user) {
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

// getUsers = function (req, res, next) {

//     User.find({}, function (err, data) {

//         res.render('user_all', {
//             user: req.user,
//             practices: data
//         });
//     });

// }
// module.exports.getUsers = getUsers;

// edit = function (req, res, next) {
//     res.render("user_edit");
// }
// module.exports.edit = edit;


// userUpdate = function (req, res, next) {
//     var id = req.params.id;
//     var studentData = req.body;
//     console.log("test userupdate successfull");

//     User.findOneAndUpdate({ _id: id }, studentData, { new: true }, function (err, user) {
//         if (err) {
//             res.status(400);
//             res.send({ errors: "Error occured when updating the student." });
//             console.log("Error occured when updating the student.");
//         }
//         if (user) {

//             res.status(200);
//             res.send(user);
//             console.log("update successful");

//         }
//     });
// }

// module.exports.userUpdate = userUpdate;



