const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    username : String,
    password : String,
    email : String,
    type : String,
    date : Date
})
module.exports = User = mongoose.model('User',UserSchema)