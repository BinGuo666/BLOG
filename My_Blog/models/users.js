let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    "userId":String,
    "userPwd":String,
    "userName":String,
    "userImg":String,
    "userAge":String,
    "userAddress":String,
    "userSaying":String,
    "userHobby":String,
    "userQQ":String,
    "userMail":String

});
module.exports = mongoose.model('users',userSchema);