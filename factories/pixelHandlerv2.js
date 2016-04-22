var Mongoose = require("mongoose"),
    PixelSchema = require("../schemas/pixel"),
    Jimp = require('jimp');


var queue = [];

function initializeInterval(){


  setInterval(function(){
    console.log("Interval Set for 30000 ms");




  },300);



};


function reloadImage(params,callbacks){

     Jimp.read(__dirname+"/../img/secret-image.png")
    .then(function(secretPic){

        console.log("Reading secret image!");

        Jimp.read(__dirname+"/../img/releasable-image.png")
        .then(function(releasedPic){

            console.log("Writing to Releasable image!");


            PixelSchema.find(params)
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
                console.log('Done streaming the pixel data!');

                releasedPic.resize(1000,1000).quality(100).write(__dirname+"/../img/releasable-image.png",function(){
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
    reloadImage({});
    initializeInterval();
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
          pix.buyer.id = Mongoose.Types.ObjectId(userID);
          pix.message = message;
          pix.isBought = true;
          pix.save(function(err){
            if(err){
              console.log(err);
            }
          });
         });

      console.log("Done buying " + amount + " random pixels.");
      reloadImage({isBought:true},callbacks);
    });
  }
};
