var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
   firstname: String,
   lastname: String,
   email: String,
   password: String
});
// passportLocalMongoose(UserSchema,{usernameField:'email'});
UserSchema.plugin(passportLocalMongoose,{usernameField:"email"});
module.exports = mongoose.model("User",UserSchema);
