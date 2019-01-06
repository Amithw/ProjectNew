const mongoose = require("mongoose");


const authSchema = new mongoose.Schema({
    username:  { type: String },
    googleId:  { type: String},
    thumbnail:  { type: String },
    status:  { type: String }, 
    f_name: { type: String },
    l_name: { type: String },
    role: { type: String },
    phone_number: { type: Number,min: 10 },
    email_address: { type: Object },
    cv: { type: String },
    linkedin: { type: String },
    technical_skills: { type: [String] },
    university:{ type: String },
    description:{ type: String },
    job_title:  { type: String },
    updated_at: { type: Date, default: Date.now }

});


module.exports = mongoose.model('auth',authSchema);

