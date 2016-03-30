var express = require("express"),
    UserRouter = express.Router({mergeParams:true}),
    UserSchema = require('../schemas/user'),
    Middleware = require('./middleware'),
    passport = require("passport"),
    PixelHandler = require("../factories/pixelHandlerv2"),
    Path = require("path");



//For debbuging only
UserRouter.get('/user',function(req,res){
    res.send("Hit the user route");
});


UserRouter.post('/user',Middleware.checkUserRegistry,function(req,res){
    var userBody = req.body.user;
    var user = {
      firstname: userBody.firstname,
      lastname: userBody.lastname,
      email: userBody.email
    }

    console.log("Registering user email: "+user.email);

    UserSchema.register(user,userBody.password,function(err,result){
      if(err){
        console.log(err);
        res.status(503);
        return res.json({error:err});
      }
        res.json({success:"You have successfully registered! You can now login with a POST request to /login."});
    });
});

// /me GET
UserRouter.get('/user/:id_user',Middleware.isLoggedIn,function(req,res){
    console.log("Got GET current user route!");
    res.json({me:req.user});
});

//TODO
// /me PUT
UserRouter.put('/user/:id_user',function(req,res){
    res.send("Hit user_id put route.");
});

// //TODO
// UserRouter.post('/user/:id_user/buy',function(req,res){
//     res.send("Hit buy post route.");
// });

//TODO
UserRouter.post('/user/:id_user/buy',Middleware.isLoggedIn,function(req,res){

  PixelHandler.buyPixels('100','suh dude',1000,function(err){
      if(err){
          console.log(err);
      }
      res.sendFile(Path.resolve(__dirname+'/../img/releasable-image.jpg'));
  });
});


//REDIRECTION
UserRouter.get('/me',Middleware.isLoggedIn,function(req,res){
  res.redirect('/user/'+req.user._id);
});

UserRouter.put('/me',Middleware.isLoggedIn,function(req,res){
  res.redirect('/user/'+req.user._id);
});

UserRouter.post('/me/buy',Middleware.isLoggedIn,function(req,res){
  res.redirect('/user/'+req.user._id+'/buy');
});


module.exports = UserRouter;
