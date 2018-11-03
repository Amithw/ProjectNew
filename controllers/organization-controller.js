const User = require("../models/user");
const Auth = require("../models/auth");
const Cart = require("../models/cart");
// function for displaying home



displayHome = function (req, res, next) {
    // res.send("orgainization home");
    res.render("organization_home");
}

module.exports.displayHome = displayHome;

edit = function (req, res, next) {
    res.render("organization_edit");
}
module.exports.edit = edit;

getOrganization = function (req, res, next) {

    Auth.find({}, function (err, data) {

        res.render('organization_view_all_student', {
            user: req.user,
            practices: data
        });
    });


}
module.exports.getOrganization = getOrganization;

organizationUpdate = function (req, res, next) {
    var id = req.params.id;
    var organizationData = req.body;
    console.log("test userupdate successfull");

    User.findOneAndUpdate({ _id: id }, organizationData, { new: true }, function (err, user) {
        if (err) {
            res.status(400);
            res.send({ errors: "Error occured when updating the organization." });
            console.log("Error occured when updating the organization.");
        }
        if (user) {

            res.status(200);
            res.send(user);
            console.log("update successful");

        }
    });
}

module.exports.organizationUpdate = organizationUpdate;



getUserprofile = function (req, res, next) {
    var id = req.params.id;
    var studentData = req.body;
    console.log(id);
    console.log("test successfull");

    Auth.find({_id:id}, function (err, studentData) {

        res.render('organization_view_student_profile', {
            user: req.user,
            practices: studentData
        });
        console.log(studentData); 
    });

}
module.exports.getUserprofile = getUserprofile;

add_cart = function (req, res, next) {
    console.log(req.body);
    var newCart = new Cart(req.body);

    console.log(newCart);

    newCart.save(function (err, cart) {
        if (err) {
            console.log("err");
            res.status(401).send(err);
        } if (cart) {
            console.log("er");
            res.status(200).send({ message: "cart sucessfully created" });
        }
    });

}

module.exports.add_cart = add_cart;


viewCart = function (req, res, next) {

        res.render('organization_cart');
}
module.exports.viewCart = viewCart;

viewCartA = function (req, res, next) {

    var id = req.params.id;
    var cartData = req.body;
    console.log(id);
    console.log("test successfull");

    Cart.find({o_id:id}, function (err, cartData) {

        res.render('organization_cart', {
            user: req.user,
            practices: cartData
        });
        console.log(cartData); 
    });

}

module.exports.viewCartA = viewCartA ;