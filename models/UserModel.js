var mongoose = require('mongoose');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

//Schema Design
var UserSchema = new Schema({
    id    : ObjectId,
    first_name     : String,
    last_name      : String,
    Enrollment_no      : Number,
    career : String
});

var UserModel = mongoose.model('users', UserSchema);  //Attaching UserSchema with the users Collection in mongodb
module.exports = UserModel;   //Making UserModel public so it can be accessed by anyone
