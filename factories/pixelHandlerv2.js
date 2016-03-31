var Mongoose = require("mongoose"),
    PixelSchema = require("../schemas/pixel"),
    Jimp = require('jimp');



function reloadImage(callbacks){

     Jimp.read(__dirname+"/../img/secret-image.jpg")
    .then(function(secretPic){

        console.log("Reading secret image!");

        Jimp.read(__dirname+"/../img/releasable-image.jpg")
        .then(function(releasedPic){

            console.log("Writing to Releasable image!");

            PixelSchema.find({})
              .lean()
              .stream()
              .on('data',function(pixelObj){

                  var hex = pixelObj.isBought ? secretPic.getPixelColor(pixelObj.pixel.x,pixelObj.pixel.y)
                                              : 0xFFFFFFFF;

                  releasedPic.setPixelColor(hex,pixelObj.pixel.x,pixelObj.pixel.y);
              })
              .on('error',function(err){
                console.log("Error streaming the data!");
                console.log(err);
              })
              .on('close',function(){
                console.log('done with Mongo init.');
                releasedPic.write(__dirname+"/../img/releasable-image.jpg",function(){
                console.log("done writing new image after bought pixels!");
                if(callbacks){
                  callbacks();
                }
              });
            });
        });
    });
};


module.exports = {
  init: function(){
    reloadImage();
  },
  buyPixels: function(userID,message,amount,callbacks){

    var self = this;

    PixelSchema
    .findRandom({isBought:false},{},{limit:amount},function(err,pixelObjs){

        if(err){
          console.log(err);
          return callbacks();
        }

        pixelObjs.forEach(function(pix){
          pix.buyer.id = Mongoose.Types.ObjectId();
          pix.message = message;
          pix.isBought = true;
          pix.save(function(err){
            if(err){
              console.log(err);
            }
          });
         });

      console.log("Done altering bought values in DB.");
      reloadImage(callbacks);
    });
  }
};
