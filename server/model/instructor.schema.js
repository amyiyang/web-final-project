// const Schema = require('mongoose').Schema;
//
// const bcrypt = require('bcryptjs');
//
// const InstructorSchema = new Schema({
//     _id: String,
//     username: { type: String, index: true },
//     password: String,
// }, { collection : 'instructors' });
//
// // Save is a MongoDB API, that is called by 'create'
// InstructorSchema.pre("save", function(next) {
//     // this logic below allows us to protect the password
//     // in the case of a user update, but
//     // where the password
//     if(!this.isModified("password")) {
//         return next();
//     }
//     this.password = bcrypt.hashSync(this.password, 10);
//     next();
// });
//
// InstructorSchema.methods.comparePassword = function(plaintext, callback) {
//     return callback(null, bcrypt.compareSync(plaintext, this.password));
// };
//
// module.exports = InstructorSchema;


const Schema = require('mongoose').Schema;
const bcrypt = require('bcryptjs');

const InstructorSchema = new Schema({
    _id: String,
    username: { type: String, index: true },
    password: String,
}, { collection : 'instructors' });

InstructorSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

// InstructorSchema.pre('updateOne', function(next) {
//     // if(!this.isModified("password")) {
//     //     return next();
//     // }
//     this.password = bcrypt.hashSync(this.password, 10);
//     next();
// });

InstructorSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

module.exports = InstructorSchema;