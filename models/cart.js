const mongoose = require("mongoose");


const cart = new mongoose.Schema({
    o_id:  { type: String },
    s_id:  { type: String },
    view:  { type: String },
    selection:  { type: String }, 
    updated_at: { type: Date, default: Date.now }

});


module.exports = mongoose.model('cart',cart);