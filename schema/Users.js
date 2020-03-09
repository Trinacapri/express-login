const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    phoneNo: {type: Number}
})

module.exports = mongoose.model("users", UserSchema) 
