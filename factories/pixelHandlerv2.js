var Mongoose = require("mongoose"),
    PixelSchema = require("../schemas/pixel"),
    Path = require("path"),
    fs = require("fs.extra"),
    Jimp = require('jimp');

var imagePaths = {
  secretPath : Path.resolve(__dirname+'/../img/secret-image.png'),
  mainPath: Path.resolve(__dirname+'/../img/releasable-image.png'),
  backupPath : Path.resolve(__dirname+'/../img/releasable-image-2.png')
};

var intervalTime = 60000 / 6; //1 minute
var isEditing = false;
var percentage = 0.0;
var pixelsBoughtCount = 0;

function initializeInterval(){
  console.log("Interval Set for "+intervalTime+" ms");

  setInterval(function(){

    if(isEditing)
      return;

    console.log('Updating image from Interval');

    return fs.copy(imagePaths.mainPath,imagePaths.backupPath,{replace:true},function(err){
      if(err){
        console.error('There was an error copying the file!');
        console.error(err);
        return;
      }

      isEditing = true;
      return reloadImage(function(){
        isEditing = false;
      });
    });

  },intervalTime);
};

function reloadImage(callbacks){

     return Jimp.read(imagePaths.secretPath)
    .then(function(secretPic){

        console.log("Reading secret image!");

        Jimp.read(imagePaths.mainPath)
        .then(function(releasedPic){

            console.log("Writing to Releasable image!");
            var count = 0;

            PixelSchema.find({})
              .lean()
              .stream()
              .on('data',function(pixelObj){


                var hex = pixelObj.isBought ? secretPic.getPixelColor(pixelObj.pixel.x,pixelObj.pixel.y)
                                            : 0xFFFFFFFF;

                if(pixelObj.isBought){
                  count++;
                }

                releasedPic.setPixelColor(hex,pixelObj.pixel.x,pixelObj.pixel.y);

              })
              .on('error',function(err){
                console.error("Error streaming the data!");
                console.error(err);
              })
              .on('close',function(){
                console.log('Done streaming the pixel data!');
                percentage = count / 1000000.0;
                pixelsBoughtCount = count;
                releasedPic.write(imagePaths.mainPath,function(){
                  console.log("done writing new image after bought pixels!");
                  if(callbacks){
                    return callbacks();
                  }
              });
            });
        });
    });
};


var PixelHandler = {

  init: function(){
    return reloadImage(initializeInterval);
  },
  getReleasableImagePath: function(){
    return isEditing ? imagePaths.mainPath : imagePaths.backupPath;
  },

  getPurchasePercent: function(){
    return percentage * 100;
  },

  getPixelsRemainingCount: function(){
    return 1000000 - new Number(pixelsBoughtCount);
  },

  buyPixels: function(userID,message,amount,callbacks){

    var self = this;

    return PixelSchema
    .findRandom({isBought:false},{},{limit:amount},function(err,pixelObjs){

        if(err){
          console.error(err);
          return callbacks(err);
        }

        pixelObjs.forEach(function(pix){
          pix.buyer.id = Mongoose.Types.ObjectId(userID);
          pix.message = message;
          pix.isBought = true;
          pix.save(function(err){
            if(err){
              console.error(err);
            }
          });
         });

      console.log("Done buying " + amount + " random pixels.");
      return callbacks();

    });
  }
};



module.exports = PixelHandler;
