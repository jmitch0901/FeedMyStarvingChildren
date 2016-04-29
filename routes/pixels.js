var express = require('express'),
    Mongoose = require('mongoose'),
    JSONStream = require('JSONStream'),
    PixelSchema = require('../schemas/pixel'),
    PixelHandler = require('../factories/pixelHandlerv2'),
    PixelRouter = express.Router({mergeParams:true});


/*
  This is INCREDIBLY expensive.
  THIS is my culprit
*/


PixelRouter.get('/',function(req,res){
  //console.log('Hitting pixel metadata route!');

  if(!req.query.x || !req.query.y){
    return res.json(400,{success:false});
  }

  var x = req.query.x;
  var y = req.query.y;

  PixelSchema
  .findOne({'pixel.x':x,'pixel.y':y})
  .lean()
  .populate('buyer.id')
  .exec(function(err,result){
    //console.log(result);
    if(err){
      console.error(err);
      return res.json({success:false});
    }

    if(!result){
      return res.json({success:false});
    }

    if(result.isBought && result.buyer){
      result.buyer = {
        firstname: result.buyer.id.firstname
      };
    }

    return res.json({success:true,pixelInfo:result});
  });
});

PixelRouter.get('/percentage',function(req,res){

  res.json({percentage: PixelHandler.getPurchasePercent()});

});

PixelRouter.get('/bought',function(req,res){

  res.json({bought: PixelHandler.getPixelsBoughtCount()});

});


module.exports = PixelRouter;
