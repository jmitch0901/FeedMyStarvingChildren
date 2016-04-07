var express = require('express'),
    Mongoose = require('mongoose'),
    PixelSchema = require('../schemas/pixel'),
    PixelRouter = express.Router({mergeParams:true});

PixelRouter.get('/',function(req,res){

  PixelSchema.find({})
  .lean()
  .stream()
  .exec(function(err,result){
    //console.log(result);
    if(err){
      console.log(err);
      //res.json({error:err});
      return;
    }
  //  res.json(result);
  });

});

module.exports = PixelRouter;
