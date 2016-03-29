var Passport = require('passport'),
    Express = require('express'),
    UserSchema = require('../../schemas/user'),
    Mongoose = require('mongoose');


var Middleware = {
  isLoggedIn: function(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.status(401);
    res.json({error:"Not Authenticated."});
  },
  checkUserRegistry: function(req,res,next){
    if(req.isAuthenticated()){
      res.status(403);
      return res.json({error:"You must logout first!"});
    }
    console.log(req.body);
    var potentialUser = req.body.user;

    if(!potentialUser || !potentialUser.firstname || !potentialUser.lastname || !potentialUser.email || !potentialUser.password){
      res.status(400);
      return res.json({error:"Bad POST parameters while registering."});
    }

    UserSchema.find({email:potentialUser.email},function(err,result){
      if(err){
        res.status(503);
        return res.json({error:err});
      }

      if(result.length > 0){
        res.status(409);
        return res.json({error:"Someone with that email already exists!"});
      }

      next();
    });
  }
};


module.exports = Middleware;
