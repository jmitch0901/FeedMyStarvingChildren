var express = require("express"),
    UserRouter = express.Router({mergeParams:true}),
    UserSchema = require('../schemas/user'),
    Middleware = require('./middleware'),
    passport = require("passport");



//For debbuging only
UserRouter.get('/user',function(req,res){
    res.send("Hit the user route");
});


//TODO
UserRouter.post('/user',Middleware.checkUserRegistry,function(req,res){
    console.log("Hit user post route.");
    var userBody = req.body.user;
    //console.log(userBody);
    var user = {
      firstname: userBody.firstname,
      lastname: userBody.lastname,
      email: userBody.email
    }

    console.log("Registering User...YOUR PASS!");
    console.log(userBody.password);
    UserSchema.register(user,userBody.password,function(err,result){
      if(err){
        console.log(err);
        res.status(503);
        return res.json({error:err});
      }

      console.log("YOUR RESULT AFTER REGISTER!");
      console.log(result._id.toString());

      // passport.authenticate("local")(req,res,function(){
      //   console.log("Just registered and authenticated new user: ");
      //   console.log(req.user);
        res.json({success:"You have successfully registered! You can now login with a POST request to /login."});
    });

});

UserRouter.get('/user/:id_user',Middleware.isLoggedIn,function(req,res){
    console.log("Got GET current user route!");
    res.json({me:req.user});
});

//TODO
UserRouter.put('/user/:id_user',function(req,res){
    res.send("Hit user_id put route.");
});

//TODO
UserRouter.post('/user/:id_user/buy',function(req,res){
    res.send("Hit buy post route.");
});


module.exports = UserRouter;
