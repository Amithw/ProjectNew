const jwt = require("jsonwebtoken");
const User = require("../models/organization");
const Auth = require("../models/auth");
const Cart = require("../models/cart");
const Box = require("../models/box");
const SECRET_KEY = "amith";
// function for displaying home



displayHome = function (req, res, next) {
  
    res.render("organization_home");
}

module.exports.displayHome = displayHome;

getOrganization = function (req, res, next) {

    Auth.find({}, function (err, data) {
        // note that data is an array of objects, not a single object!
        res.render('organization_view_all_student', {
            user: req.user,
            practices: data
        });
    });


}
module.exports.getOrganization = getOrganization;

edit = function (req, res, next) {
    res.render("organization_edit");
}
module.exports.edit = edit;



organizationUpdate = function (req, res, next) {
    var id = req.params.id;
    var organizationData = req.body;
    console.log("test organizationUpdate successfull");

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


addJob = function (req, res, next) {
    res.render("organization_add_job");
}
module.exports.addJob = addJob;


createJob = function (req, res, next) {
    var id = req.params.id;
    var organizationData = req.body;
    console.log("test organizationUpdate successfull");

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

module.exports.createJob = createJob;


getUserprofile = function (req, res, next) {
    var id = req.params.id;
    var studentData = req.body;

    console.log(id);
    console.log("test successfull");

    Auth.find({ _id: id }, function (err, studentData) {

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
            console.log("sucess");
            res.status(200).send({ message: "cart sucessfully created" });
        }
    });

}

module.exports.add_cart = add_cart;

viewCart = function (req, res, next) {
    id = req.params.id;
    console.log(id);
    Cart.find({ o_id: id }, function (err, cartData) {

        res.render('organization_cart', {
            user: req.user,
            practice: cartData
        });
        console.log(cartData);
        console.log("cartData");
       
        
    });
}
module.exports.viewCart = viewCart;

getUser = function (req, res, next) {
    var id = req.params.id;
    var cartData = req.body;
    // console.log(cartData);
    jwt.verify(id, SECRET_KEY, function (err, decode) {
        console.log(decode.id);
        Cart.find({ o_id: decode.id }, function (err, orgainization) {
            if (err) {
                res.status(400);
                res.send({ error: "no user can be found" });
            }
            if (orgainization) {
                res.status(200);
                //    console.log(orgainization.student_id);
                console.log(orgainization);
                res.send(orgainization);

            }
        });

    });


}

module.exports.getUser = getUser;

deleteCart = function (req, res, next) {
    var id = req.params.id;
    console.log(id);
    Cart.deleteOne({ _id: id }, function (err) {
        if (err) {
            res.status(500);
            res.send({ errors: "internal server errors" });
        }
        else {
            res.status(200);
            console.log("successfully deleted the Admin");
            res.redirect('/organizations');
        }
    });
}

module.exports.deleteCart = deleteCart;

viewRequest = function (req, res, next) {
    id = req.params.id;

    Box.find({ org_id: id }, function (err, boxData) {

        res.render('organization_view_request', {
            user: req.user,
            practices: boxData
        });
        console.log(boxData);
    });
}
module.exports.viewRequest = viewRequest;

deleteRequest = function (req, res, next) {
    var id = req.params.id;
    console.log(id);
    Box.deleteOne({ _id: id }, function (err) {
        if (err) {
            res.status(500);
            res.send({ errors: "internal server errors" });
        }
        else {
            res.status(200);
            console.log("successfully deleted the Admin");
            res.redirect('/organizations');
        }
    });
}

module.exports.deleteRequest = deleteRequest;