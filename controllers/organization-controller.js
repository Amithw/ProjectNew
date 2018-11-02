const User = require("../models/user");
// function for displaying home



displayHome= function(req,res,next){
   // res.send("orgainization home");
    res.render("organization_home");
}

module.exports.displayHome=displayHome;