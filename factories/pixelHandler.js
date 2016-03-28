var Mongoose = require("mongoose"),
    _ = require("underscore"),
    Lodash = require("lodash"),
    PixelSchema = require("../schemas/pixel"),
    ImageHandler = require("./imageHandler");



module.exports = {
    
    pixelsAvailable:undefined,
    pixelsOwned:undefined,
    init:function(){
        
        var self = this;
        Mongoose.connection.once('open',function(){
            
            console.log("We are inside the database for pixel factory!");
            
            PixelSchema.find(function(err,pixels){
                
                
                if(err){
                    return console.log("There was an error grabbing pixels from Mongo.");
                }
            
                
                self.pixelsOwned = pixels;
                self.pixelsOwned.sort(function(a,b){
                    return 1000*(a.pixel.x-b.pixel.x) + (a.pixel.y - b.pixel.y);
                });
                
                
                var available = [];
                var oIndex = 0;
                for(var i = 1; i <= 1000; i++){
                    for(var j = 1; j <= 1000; j++){
                        if(oIndex < self.pixelsOwned.length && i == self.pixelsOwned[oIndex].pixel.x && j == self.pixelsOwned[oIndex].pixel.y){
                            oIndex++;
                        } else {
                            available.push({x:i,j:i});
                        }
                    }
                }
                
                

                
                self.pixelsAvailable = available;
                
                console.log(self.pixelsAvailable.length + " pixels available.");
                console.log(self.pixelsOwned.length + " pixels have been bought.");
                
                ImageHandler.init(self.pixelsAvailable,self.pixelsOwned);
            });
        });
        
        Mongoose.connection.on('error',console.error.bind(console, 'connection error:'));
    },
    isSoldOut: function(){
        return this.pixelsOwned.length === 1000000;
    },
    buyPixels: function(userID,message,amount,callbacks){
        
        var self = this;
        
        if(this.isSoldOut()){
            var err = "Can't buy pixels because they are sold out!";
            console.log(err);
            return callbacks(err,undefined);
        }
        
        if(amount > this.pixelsAvailable.length){
            
            var err = "There are " + this.pixelsAvailable.length + " pixels left. You can only buy this amount of pixels!";
            console.log(err);
            return callbacks(err,undefined);
        }
        
        var randomIndexes = [];
        var randomPixels = [];
        for(var i = 0; i < amount; i++){
            
            var randomIndex = Math.floor(Math.random() * this.pixelsAvailable.length);
            if(_.contains(randomIndexes,randomIndex)){
                console.log("got that index previously, continuing...");
                i--;
                continue;
            }
            
            randomIndexes.push(randomIndex);
            randomPixels.push(new PixelSchema({
               message:message,
               pixel:this.pixelsAvailable[randomIndex],
               buyer:{
                   id:userID
               }
            }).toObject());
        }
        
        //console.log(randomPixels.length);
        

        //insert which pixels I just bought
        PixelSchema.collection.insert(randomPixels,function(err,insertedPixels){
            
            if(err){
                //console.log(randomPixels);
                console.log("Error inserting Pixel Objects into mongo!");
                console.log(err);
                return callbacks("There was a server error while buying your pixels. Please try again later.",undefined);
            }


            //console.log(insertedPixels);
            console.log("I just inserted "+ insertedPixels.insertedCount + " pixels into your schema!");
            
            //IMPORTANT!
            randomIndexes.sort();
            
            for(var i = randomIndexes.length - 1; i >= 0; i--){
                self.pixelsAvailable.splice(randomIndexes[i],1);
            }
            
            
            //console.log(insertedPixels.ops);
            
            ImageHandler.revealPixels(insertedPixels.ops,callbacks);
            // callbacks(undefined,insertedPixels);
        });
    }
    
};

//OLD sort code
// var ownedIndex = self.pixelsOwned.length - 1;
// for(var i = available.length - 1; i >= 0 && ownedIndex >= 0; i--){
//     if(
//         self.pixelsOwned[ownedIndex].pixel.x == available[i].x
//         && self.pixelsOwned[ownedIndex].pixel.y == available[i].y
//         ){
//             available.splice(i,1);
//             ownedIndex--;
//         }
// }