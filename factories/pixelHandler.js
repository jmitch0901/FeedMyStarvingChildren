var Mongoose = require("mongoose"),
    _ = require("underscore"),
    Lodash = require("lodash"),
    PixelSchema = require("../schemas/pixel"),
    ImageHandler = require("./imageHandler");




function pixelComparor(a,b){
    //return 1000*(a.pixel.x-b.pixel.x) + (a.pixel.y - b.pixel.y);
    
    var n = a.pixel.x - b.pixel.x;
    if(n !== 0){
        return n;
    }
    
    var temp = a.pixel.y - b.pixel.y;
    
    if(temp === 0){
        console.log("YOU GOT TWO EQUAL PIXELS IN DATABASE!");
        console.log("A:");
        console.log(a);
        console.log("B: ");
        console.log(b);
    }
    
    return temp;
}


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
                self.pixelsOwned.sort(pixelComparor);
                
                
                var available = [];
                var oIndex = 0;
                for(var i = 1; i <= 1000; i++){
                    for(var j = 1; j <= 1000; j++){
                        if(oIndex < self.pixelsOwned.length && i == self.pixelsOwned[oIndex].pixel.x && j == self.pixelsOwned[oIndex].pixel.y){
                            oIndex++;
                        } else {
                            available.push({x:i,y:j});
                        }
                    }
                }

                
                
                self.pixelsAvailable = available;
                
                console.log(self.pixelsAvailable.length + " pixels available.");
                console.log(self.pixelsOwned.length + " pixels have been bought.");
                
                ImageHandler.init(self.pixelsAvailable);
            });
        });
        
        Mongoose.connection.on('error',console.error.bind(console, 'connection error:'));
    },
    isSoldOut: function(){
        return this.pixelsOwned.length === 1000000;
    },
    buyPixels: function(userID,message,amount,callbacks){
        
        var self = this;
        
        console.log("IM BUYING PIXELS NOW!");
        console.log("Pixels available size: " + this.pixelsAvailable.length);
        console.log("Amount of pixels owned: " + this.pixelsOwned.length);

        
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
            
            var randomIndex = Number(Math.floor(Math.random() * self.pixelsAvailable.length));
            if(_.contains(randomIndexes,randomIndex)){
                console.log("got that index previously, continuing...");
                i--;
                continue;
            }
            
            randomIndexes.push(Number(randomIndex));
            randomPixels.push(new PixelSchema({
               message:message,
               pixel:self.pixelsAvailable[randomIndex],
               buyer:{
                   id:userID
               }
            }).toObject());
        }
        
        
        randomPixels.forEach(function(pixelObj){
           self.pixelsOwned.push({x:pixelObj.pixel.x,y:pixelObj.pixel.y}); 
        });
        
        
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
            randomIndexes.sort(function(a,b){
                return a-b;
            });
            
            console.log(randomIndexes);
            
            for(var i = randomIndexes.length - 1; i >= 0; i--){
                self.pixelsAvailable.splice(randomIndexes[i],1);
            }
            
            
            //console.log(insertedPixels.ops);
            
            if(!insertedPixels.ops){
                console.log("No pixels returned?");
                return callbacks(undefined);
            }
            
            ImageHandler.revealPixels(insertedPixels.ops,callbacks);
            // callbacks(undefined,insertedPixels);
        });
    }
    
};

                
// for(var i = 1; i <= 1000; i++){
//     for(var j = 1; j <= 1000; j++){
//         available.push({x:i,y:j});
//     }
// }

// //OLD sort code
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


//Verify no matches between available and purchased pixel array.
// for(var i = 0; i < available.length; i++){
    
//     for(var j = 0; j < self.pixelsOwned.length; j++){
        
//         var temp = self.pixelsOwned[j];
        
//         if(available[i].x == temp.pixel.x && available[i].y == temp.pixel.y){
//             console.log("TWO ENTRIES EQUAL EACHOTHER!");
//         }
        
        
//     }
// }