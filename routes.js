const express = require("express");
const router = express.Router();
//const passport = require('passport');
//const session = require('express-session');
const userController = require("./controllers/user-controller");
const adminController = require("./controllers/admin-controller");
const organizationController = require("./controllers/organization-controller");
const appController = require("./controllers/application-controller");
const passController = require("./controllers/passport-controller");


// index route
router.get("/", appController.appHome);
router.get("/login", appController.login);
router.get("/studentLogin", appController.studentLogin);


//routes for admin
router.get("/admin", adminController.displayHome);
router.get("/admin/user", adminController.user);
router.post("/admin/users", adminController.addUser);
router.get("/admin/edit", adminController.edit);
router.put("/admin/:id", adminController.userUpdate);
router.get("/admin/getUsers", adminController.getUsers);

//routes for user

router.get("/users", appController.userAuthentication, userController.displayHome);
router.post("/login", userController.authenticate);
router.get("/users/getUsers", userController.getUsers);
router.get("/users/edit", userController.edit);
router.get("/users/:id", userController.getUser);
router.put("/users/:id", userController.userUpdate);



//routes for organizations

router.get("/organizations", organizationController.displayHome);
router.get("/organizations/edit", organizationController.edit);
router.get("/organizations/viewCart", organizationController.viewCart);
router.get("/organizations/cart/:id", organizationController.getUser);
router.get("/organizations/:id", organizationController.getOrganization);
router.put("/organizations/:id", organizationController.organizationUpdate);
router.get("/organizations/getUsers", organizationController.getOrganization);
router.get("/organizations/profile/:id", organizationController.getUserprofile);

router.post("/organizations/:id", organizationController.add_cart);




// routes for passport
router.get('/student/login', passController.login);
router.get('/student/logout', passController.logout);
router.get('/google', passController.google);
router.get('/google/redirect',passController.google,passController.redirect);
router.get('/student/home',passController.home);
router.get('/student/edit/:id',passController.edit);
router.post('/student_edit/:id',passController.studentUpdate);
router.get('/google/student',passController.profile);
router.get('/student/vacancy',passController.viewVacancy);
router.get('/student/send/cv/:id',passController.sendCv);
router.post('/student/send/cv/:id',passController.sendCvDetails);

router.use(appController.pageNotFound);

module.exports = router;