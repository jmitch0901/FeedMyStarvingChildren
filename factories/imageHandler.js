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
    }
    
    
};

