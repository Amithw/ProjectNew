const mongoose = require("mongoose");

connect=function(url){
    mongoose.connect(url,function(err){
        if(err){
            console.log(err);
            console.log("cannot connect to mongo");
            process.exit(1);
        }
    });
}

module.exports.connect= connect;