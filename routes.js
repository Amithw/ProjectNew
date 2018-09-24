const express = require("express");
const router = express.Router();
const userController = require("./controllers/user-controller");
const adminController = require("./controllers/admin-controller");
const organizationController = require("./controllers/organization-controller");
const appController = require("./controllers/application-controller");


// index route
router.get("/", appController.appHome);
router.get("/login",appController.login);



//routes for admin
router.get("/admin", adminController.displayHome);
router.get("/admin/user",adminController.user);
router.post("/admin/users",adminController.addUser);


//routes for user
router.get("/users", userController.displayHome);
router.get("/users/:id",userController.getUser);
router.post("/login",userController.authenticate);
    

//routes for organizations
router.get("/organizations", organizationController.displayHome);

router.use(appController.pageNotFound);

module.exports = router;