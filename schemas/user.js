var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose-email");

var UserSchema = new mongoose.Schema({
   firstname: String,
   lastname: String,
   email: String,
   password: String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);
