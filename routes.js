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
router.get("/users",appController.userAuthentication,userController.displayHome);
router.post("/login",userController.authenticate);
router.get("/users/edit",userController.edit); 
router.get("/users/:id",userController.getUser);
router.put("/users/:id",userController.userUpdate); 
 

//routes for organizations
router.get("/organizations", organizationController.displayHome);

router.use(appController.pageNotFound);

module.exports = router;