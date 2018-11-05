const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    o_id: { type: String },
    s_id: { type: String },
    view: { type: String },
    selection: { type: String },
    s_name: { type: String },
    cv: { type: String },
    job_title: { type: String },
    updated_at: { type: Date, default: Date.now }

});


module.exports = mongoose.model('cart', cartSchema);