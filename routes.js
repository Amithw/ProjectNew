const express = require("express");
const router = express.Router();
const userController = require("./controllers/user-controller");
const adminController = require("./controllers/admin-controller");
const organizationController = require("./controllers/organization-controller");
const appController = require("./controllers/application-controller");


// indexx route
router.get("/", appController.appHome);

//routes for admin
router.get("/admin", adminController.displayHome);


//routes for user
router.get("/users", userController.displayHome);

//routes for organizations
router.get("/organizations", organizationController.displayHome);

router.use(function (req, res, next) {
    res.send("page not found");
});

module.exports = router;