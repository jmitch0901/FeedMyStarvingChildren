var Passport = require('passport'),
    Express = require('express'),
    UserSchema = require('../../schemas/user'),
    Mongoose = require('mongoose');


var Middleware = {
  ensureHTTPS:function(req,res,next){
    // console.log("SECURE??? -> ");
    // console.log(req.secure);
    if(req.secure){
      return next();
    }

    var httpsPort = process.env.HTTPS_PORT || 3000;

    var redirString = 'https://'+req.host+':'+httpsPort+req.url;
    console.log("REDIRECTING YOU TO -> "+redirString);
    res.redirect(redirString);
  },
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
    // console.log(req.body);

    if(!potentialUser || !potentialUser.firstname || !potentialUser.lastname || !potentialUser.email || !potentialUser.password){
      res.status(400);
      console.log("Didnt send me good params!");
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
  },
  validateBuyPixels: function(req,res,next){
    var amount = req.body.amount,
        card = req.body.card;

    if(!card){
      return res.json(400,{success: false, error:'You must provide a credit card.'});
    }

    if(!amount || isNaN(amount) || Number(amount) < 10){
      return res.json(400,{success:false, error: 'You must provide a pixel (number) amount of either 10 or greater.'});
    }

    req.body.amount = Number(req.body.amount);

    var cardName = card.name,
        cardNum = card.number,
        cardMonth = card.month,
        cardYear = card.year,
        cardCVV = card.cvv;

    if(!cardName){
      return res.json(400,{success:false,error:'You must provide the name lisited on your credit card.'});
    }

    if(!cardNum || isNaN(cardNum)){
      return res.json(400,{success:false,error:'You must provide a valid card number.'});
    }

    if(!cardMonth){
      return res.json(400,{success:false,error:'You must provide a valid card expiration month.'});
    }

    if(!cardYear){
      return res.json(400,{success:false,error:'You must provide a valid card expiration year.'});
    }

    if(!cardCVV){
      return res.json(400,{success:false,error:'You must provide a valid CVV code.'});
    }

    next();
  },
  filterProfanity: function(req,res,next){
    if(!req.body.message){
      req.body.message = "Thanks for donating :)";
      return next();
    }
    next();

  }
};


module.exports = Middleware;
