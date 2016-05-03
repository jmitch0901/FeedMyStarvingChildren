var Mongoose = require("mongoose"),
    PixelSchema = require("../schemas/pixel"),
    Path = require("path"),
    fs = require("fs.extra"),
    Jimp = require('jimp');

var imagePaths = {
  secretPath : Path.resolve(__dirname+'/../img/secret-image.png'),
  mainPath: Path.resolve(__dirname+'/../img/releasable-image.png'),
  backupPath : Path.resolve(__dirname+'/../img/releasable-image-backup.png')
};

var intervalTime = 30000 * 2; //1 minute
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
      return reloadImagev2(function(){
        isEditing = false;
      });
    });

  },intervalTime);
};

function reloadImagev2(callbacks){

  return Jimp.read(imagePaths.secretPath)
  .then(function(secretPic){

    var count = 0;

    var copy = secretPic.clone();
    PixelSchema.find({})
    .lean()
    .stream()
    .on('error',function(err){
      console.error(err);
      //throw err;
    })
    .on('data',function(pixelObj){

      if(!pixelObj.isBought){
        count++;
        copy.setPixelColor(0xFFFFFFFF,pixelObj.pixel.x,pixelObj.pixel.y);
      }
    })
    .on('close',function(){
      console.log('Done streaming pixel data!');
      percentage = count / 1000000.0;
      pixelsBoughtCount = count;

      copy.write(imagePaths.mainPath,function(){
        console.log("done writing new image after bought pixels!");
        if(callbacks){
          return callbacks();
        }
      });
    });

  });
};

var PixelHandler = {

  init: function(){
    return reloadImagev2(initializeInterval);
  },
  getReleasableImagePath: function(){
    return isEditing ? imagePaths.mainPath : imagePaths.backupPath;
  },

  getPurchasePercent: function(){
    return percentage * 100;
  },

  getPixelsBoughtCount: function(){

    return new Number(pixelsBoughtCount);

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
