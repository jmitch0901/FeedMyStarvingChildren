var Mongoose = require("mongoose"),
    PixelSchema = require("../schemas/pixel");
    
    
    
module.exports = {
  
  init: function(){
      
      PixelSchema.find({isBought:false},function(err,pixels){
         if(err){
             return console.log(err);
         } 
         
         
         console.log("done");
         
         
      });
      
      
      
  }  
    
    
    
    
    
    
    
    
    
    
    
};