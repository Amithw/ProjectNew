const mongoose = require("mongoose");


const auth = new mongoose.Schema({
    username:  { type: String },
    googleId:  { type: String },
    thumbnail:  { type: String },
    status:  { type: String },
    student_id: { type: String },
    f_name: { type: String },
    l_name: { type: String },
    role: { type: String },
    nic: { type: String},
    phone_number: { type: Number },
    email_address: { type: Object, unique: true },
    cv: { type: String },
    technical_skills: { type: [String] },
    updated_at: { type: Date, default: Date.now }

});


module.exports = mongoose.model('auth',auth);

