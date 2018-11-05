const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_FACTOR = 10;

const userSchema = new mongoose.Schema({
    student_id: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String, required: true, min: 5 },
    role: { type: String },
    phone_number: { type: Number,unique: true },
    email: { type: String,unique: true },
    web: { type: String },
    vacancy: { type: String },
    Availability:{ type: String },
    description:{ type: String },
    job_title:{ type: String },
    closing_date: { type: Date },
    updated_at: { type: Date, default: Date.now }



});



userSchema.pre("save", function (done) {
    console.log("user .pre works");
    var user = this;

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        else {

            bcrypt.hash(user.password, salt, function (err, hashedPassword) {
                if (err) {
                    return done(err);
                }
                else {
                    console.log(hashedPassword);
                    user.password = hashedPassword;
                    done();
                }
            });
        }
    });
});



userSchema.methods.checkPassword = function (password, done) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
}

module.exports = mongoose.model("Organization", userSchema);







