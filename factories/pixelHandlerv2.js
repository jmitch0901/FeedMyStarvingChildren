var Mongoose = require("mongoose"),
    PixelSchema = require("../schemas/pixel"),
    Jimp = require('jimp');


module.exports = {
  init: function(){

    Jimp.read(__dirname+"/../img/secret-image.jpg")
    .then(function(secretPic){

        console.log("Reading secret image!");

        Jimp.read(__dirname+"/../img/releasable-image.jpg")
        .then(function(releasedPic){

            console.log("Reading releasable image!");

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
              });
            });
        });
    });
  },
  buyPixels: function(userID,message,amount,callbacks){


    // PixelSchema.findRandom({isBought:false}).limit(10).exec(function(err,pixelObjs){
    //   console.log(pixelObjs);
    //   callbacks(undefined);
    // });

    PixelSchema.findRandom({isBought:false},{},{limit:10},function(err,pixelObjs){
      console.log(pixelObjs);
      callbacks(undefined);
    });


    // PixelSchema
    // .update({isBought:false},
    //   {$set:{
    //     'buyer.id': Mongoose.Types.ObjectId(),
    //     'message': message,
    //     'isBought': true}
    //   },{
    //     multi:true
    //   })
    // .limit(1000)
    // .exec(function(err,pixelObjs){
    //   if(err){
    //     return console.log(err);
    //   }
    //   console.log("Got back "+ pixelObjs.length + " PixelObjs");

      // var pixels = pixelObjs.pop();
      // pixels.isBought = true;
      // pixels.buyer.id = Mongoose.Types.ObjectId();
      // pixels.message = message;
      // console.log(pixels);


      // pixels.save(function(err,product,numAffected){
      //   if(err){
      //     console.log(err);
      //     return callbacks(undefined);
      //   }
      //
      //   console.log("Rows affected: "+numAffected);
      //   console.log(product);
      //   callbacks(undefined);
      // });
    //});

  }
};
