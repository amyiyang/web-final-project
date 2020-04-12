const Schema = require('mongoose').Schema;

const bcrypt = require('bcryptjs');

const StudentSchema = new Schema({
    _id: String,
    availableCredits: Number,
    username: { type: String, index: true },
    password: String,
    bundle: []
}, { collection : 'students' });

StudentSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});


StudentSchema.pre("update", function(next) {
    // this logic below allows us to protect the password
    // in the case of a user update, but
    // where the password
    if(!this.isModified("password")) {
        console.log("hi");
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});



StudentSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

module.exports = StudentSchema;