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
router.post("/admin/add_User", adminController.add_User);
router.get("/admin_user", adminController.user);
router.get("/admin/edit", adminController.edit);
router.put("/admin/:id", adminController.userUpdate);
router.get("/admin_getUsers", adminController.getUsers);
router.get("/admin_getAdmins", adminController.getAdmins);
router.get("/admin_getOrganizations", adminController.getOrganizations);
router.get("/admin/deleteUser/:id", adminController.deleteUser);
router.get("/admin/deleteAdmin/:id", adminController.deleteAdmin);
router.get("/admin/deleteOrganization/:id", adminController.deleteOrganization);


//routes for user

// router.get("/users", appController.userAuthentication, userController.displayHome);
router.post("/login", userController.authenticate);
// router.get("/users/getUsers", userController.getUsers);
// router.get("/users/edit", userController.edit);
router.get("/users/:id", userController.getUser);
// router.put("/users/:id", userController.userUpdate);



//routes for organizations

router.get("/organizations", organizationController.displayHome);
router.get("/organizations_edit", organizationController.edit);
router.post("/organizations/:id", organizationController.add_cart);
router.get("/organizations_viewCart/:id", organizationController.viewCart);
router.get("/organizations/deleteCart/:id", organizationController.deleteCart);
router.get("/organizations_viewRequest/:id", organizationController.viewRequest);
router.get("/organizations/deleteRequest/:id", organizationController.deleteRequest);
router.put("/organizations/:id", organizationController.organizationUpdate);
router.get("/organizations_getUsers", organizationController.getOrganization);
router.get("/organizations_profile/:id", organizationController.getUserprofile);
router.post("/organizations/:id", organizationController.add_cart);
router.get("/organizations_addJobs", organizationController.addJob);
router.put("/organizations_addJobs/:id", organizationController.createJob);


// routes for passport
router.get('/student/login', passController.login);
router.get('/student/logout', passController.logout);
router.get('/google', passController.google);
router.get('/google/redirect', passController.google, passController.redirect);
router.get('/student/home', passController.home);
router.get('/student_edit/:id', passController.edit);
router.post('/student_edit/:id', passController.studentUpdate);
router.get('/google/student', passController.profile);
router.get('/student_vacancy', passController.viewVacancy);
router.get('/student_send_cv/:id', passController.sendCv);
router.post('/student_send_cv/:id', passController.sendCvDetails);
router.get("/student/getOrganization", passController.getOrganizations);


router.use(appController.pageNotFound);

module.exports = router;