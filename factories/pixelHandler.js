var Mongoose = require("mongoose"),
    _ = require("underscore"),
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
                
                var available = [];
                
                for(var i = 1; i <= 1000; i++){
                    for(var j = 1; j <= 1000; j++){
                        available.push({x:i,y:j});
                    }
                }
                
                var owned = [];
                
                self.pixelsOwned = pixels;
                pixels.forEach(function(p){
                    owned.push(p.pixel);
                });
                
                self.pixelsAvailable = _.difference(available,owned);
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
            }));
        }
        

        //insert which pixels I just bought
        PixelSchema.collection.insert(randomPixels,function(err,insertedPixels){
            
            if(err){
                console.log("Error inserting Pixel Objects into mongo!");
                console.log(err);
                return callbacks("There was a server error while buying your pixels. Please try again later.",undefined);
            }

            console.log("I just inserted "+ insertedPixels.length + " pixels into your schema!");
            
            //IMPORTANT!
            randomIndexes.sort();
            
            for(var i = randomIndexes.length - 1; i >= 0; i--){
                self.pixelsAvailable.splice(randomIndexes[i],1);
            }
            
            callbacks(undefined,insertedPixels);
        });
    }
    
};