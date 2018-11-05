const mongoose = require("mongoose");


const authSchema = new mongoose.Schema({
    username:  { type: String },
    googleId:  { type: String, unique: true },
    thumbnail:  { type: String },
    status:  { type: String }, 
    f_name: { type: String },
    l_name: { type: String },
    role: { type: String },
    phone_number: { type: Number, unique: true },
    email_address: { type: Object, unique: true },
    cv: { type: String },
    linkedid: { type: String , unique: true},
    technical_skills: { type: [String] },
    university:{ type: String },
    description:{ type: String },
    updated_at: { type: Date, default: Date.now }

});


module.exports = mongoose.model('auth',authSchema);

