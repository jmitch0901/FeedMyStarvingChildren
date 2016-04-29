var express = require("express"),
    UserRouter = express.Router({mergeParams:true}),
    UserSchema = require('../schemas/user'),
    Middleware = require('./middleware'),
    passport = require("passport"),
    PixelSchema = require('../schemas/pixel'),
    Mongoose = require('mongoose'),
    PixelHandler = require("../factories/pixelHandlerv2"),
    Path = require("path");



//For debbuging only
UserRouter.get('/user',function(req,res){
    res.send("Hit the user route");
});


UserRouter.post('/user',Middleware.checkUserRegistry,Middleware.filterNames,function(req,res){
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
// UserRouter.get('/user/:id_user/bought',Middleware.isLoggedIn,function(req,res){
//   var first = true;
//   res.set('Content-Type', 'application/json');
//   res.write('[')
//   PixelSchema.find({isBought:true,'buyer.id':Mongoose.Types.ObjectId(req.user.id)},'pixel')
//   .lean()
//   .stream()
//   .on('data',function(data){
//     //console.log(data);
//     if(first){
//       first = false;
//       res.write(JSON.stringify(data))
//     } else
//       res.write(","+JSON.stringify(data));
//     //res.pipe(data);
//   })
//   .on('error',function(err){
//     throw err;
//   })
//   .on('close',function(){
//     res.write(']');
//     res.end();
//     console.log('Done getting my bought pixels');
//   });
// });

//TODO
// /me PUT
UserRouter.put('/user/:id_user',function(req,res){
    res.send("Hit user_id put route.");
});


//TODO
UserRouter.post('/user/:id_user/buy',
  Middleware.isLoggedIn,
  Middleware.validateBuyPixels,
  Middleware.filterProfanity,
  function(req,res){


  PixelHandler.buyPixels(req.user.id,req.body.message,req.body.amount,function(err){
      if(err){
          console.log(err);
          res.json({error:err});
          return;
      }
      res.json({success:true,message:'You have successfully purchased ' + req.body.amount + ' pixels! Your payment is now being processed. Your pixels will appear afterwards. Thank you!'});
      //res.sendFile(Path.resolve(__dirname+'/../img/releasable-image.png'));
  });
});


//REDIRECTION
UserRouter.get('/me',Middleware.isLoggedIn,function(req,res){
  res.redirect('user/'+req.user._id);
});

UserRouter.put('/me',Middleware.isLoggedIn,function(req,res){
  res.redirect('user/'+req.user._id);
});

//TODO -> BAD ROUTE
// UserRouter.post('/me/buy',Middleware.isLoggedIn,function(req,res){
//   res.redirect('user/'+req.user._id+'/buy');
// });


module.exports = UserRouter;
