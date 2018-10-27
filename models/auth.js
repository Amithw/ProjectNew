const mongoose = require("mongoose");


const auth = new mongoose.Schema({
    email: String,
    username: String,
    googleId: String,
    thumbnail: String,
    role: String,
    status: String

});


module.exports = mongoose.model('auth',auth);