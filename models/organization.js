const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_FACTOR = 10;

const OrgSchema = new mongoose.Schema({
    student_id: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String, required: true, min: 4 },
    role: { type: String },
    phone_number: { type: Number,unique: true,min: 10 },
    email: { type: String,unique: true },
    web: { type: String },
    nic: { type: String },
    vacancy: { type: String },
    Availability:{ type: String },
    description:{ type: String },
    job_title:{ type: String },
    technology:{type:String},
    vacancy_amount:{ type: String },
    closing_date: { type: String },
    job_title2:{ type: String },
    technology2:{type:String},
    vacancy_amount2:{ type: String },
    closing_date2: { type: String },
    updated_at: { type: Date, default: Date.now }

});



OrgSchema.pre("save", function (done) {
    console.log("user .pre works");
    var user = this;
    
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            console.log("err");
            return done(err);
        }
        else {

            bcrypt.hash(user.password, salt, function (err, hashedPassword) {
                if (err) {
                    console.log("hash err");
                    return done(err);
                }
                else {
                    console.log(hashedPassword);
                    console.log("hashedPassword");
                    user.password = hashedPassword;
                    done();
                }
            });
        }
    });
});



OrgSchema.methods.checkPassword = function (password, done) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
}

module.exports = mongoose.model("Organization", OrgSchema);







