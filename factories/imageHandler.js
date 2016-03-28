var Jimp = require("jimp");



module.exports = {
    
    init:function(pixelsAvailable,pixelsOwned){
        
        Jimp.read(__dirname+"/../img/secret-image.jpg")
        .then(function(pic){
            
            pixelsAvailable.forEach(function(pixel){
                pic.setPixelColor(0xFFFFFFFF,pixel.x,pixel.y);
            });
            
            pic.write(__dirname+'/../img/releasable-image.jpg');
            console.log("done writing new image");
            
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
                console.log(pixels);
                pixels.forEach(function(pixel){
                    releasedPic.setPixelColor(secretPic.getPixelColor(pixel.x,pixel.y),pixel.x,pixel.y);
                });
                
                releasedPic.write(__dirname+"/../img/releasable-image.jpg");
                console.log("done writing new image after bought pixels!");
                
                
                
            });
        });
        
        callbacks(undefined);
    }
    
    
};

