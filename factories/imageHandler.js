var Jimp = require("jimp");



module.exports = {
    
    init:function(pixelsAvailable){
        console.log("Initializing Releasable image");
        Jimp.read(__dirname+"/../img/secret-image.jpg")
        .then(function(pic){
            
            pixelsAvailable.forEach(function(pixel){
                pic.setPixelColor(0xFFFFFFFF,pixel.x,pixel.y);
            });
            
            pic.write(__dirname+'/../img/releasable-image.jpg',function(){
                console.log("done writing new image");
            });
            
            
        });
    },
    
    revealPixels:function(pixels,callbacks){
        
        if(!pixels){
            console.log("No Pixels!");
            callbacks("No Pixels");
            return;
        }
        
        
        Jimp.read(__dirname+"/../img/secret-image.jpg")
        .then(function(secretPic){
            
            console.log("Reading secret image!");
            
            Jimp.read(__dirname+"/../img/releasable-image.jpg")
            .then(function(releasedPic){
                
                console.log("Reading releasable image!");
                //console.log(pixels);
                // pixels.forEach(function(pixelObj){
                //     console.log(pixelObj);
                //     releasedPic.setPixelColor(secretPic.getPixelColor(pixelObj.pixel.x,pixelObj.pixel.y),pixelObj.pixel.x,pixelObj.pixel.y);
                // });
                
                for(var i = 0; i < pixels.length; i++){
                    
                    //console.log(i);
                    //console.log("PIXEL (x,y) : " + pixels[i].pixel.x-1 + ", " + pixels[i].pixel.y-1);
                    var hex = secretPic.getPixelColor(pixels[i].pixel.x-1,pixels[i].pixel.y-1);
                    //console.log(hex);
                    releasedPic.setPixelColor(hex,pixels[i].pixel.x-1,pixels[i].pixel.y-1);
                    //console.log("done");
                    
                    
                }
                
                console.log("Done writing new pixel colors!");
                releasedPic.write(__dirname+"/../img/releasable-image.jpg",function(){
                    
                    console.log("done writing new image after bought pixels!");
                    callbacks(undefined);
                    
                });
                
                    


            });
        });
        
        
    }
    
    
};

