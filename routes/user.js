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
    //res.send("Hit user post route.");
    var userBody = req.body.user;
    console.log(userBody);
    var user = {
      firstname: userBody.firstname,
      lastname: userBody.lastname,
      email: userBody.email
    }

    UserSchema.register(user,userBody.password,function(err,result){
      if(err){
        console.log(err);
        res.status(503);
        return res.json({error:err});
      }

      passport.authenticate("local")(req,res,function(){
        console.log("Just registered and authenticated new user: ");
        console.log(req.user);
        res.redirect('/user/'+req.user.id);
      });
    })

});

UserRouter.get('/user/:id_user',Middleware.isLoggedIn,function(req,res){
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
