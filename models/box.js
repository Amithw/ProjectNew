const mongoose = require("mongoose");


const boxSchema = new mongoose.Schema({
    org_id:  { type: String },
    std_id:  { type: String },
    f_name:  { type: String },
    l_name:  { type: String },
    view:  { type: String },
    cv:  { type: String },
    job_title:  { type: String },
    email:  { type: String },
    phone_number:  { type: String,min: 10 },
    skills:  { type: String }, 
    updated_at: { type: Date, default: Date.now }

});


module.exports = mongoose.model('box',boxSchema);