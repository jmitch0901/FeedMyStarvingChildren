var express = require("express"),
    MainRouter = express.Router();
    
    
    
MainRouter.get('/',function(req,res){
    
    res.sendFile(__dirname + '/public/login.html');
    
});


MainRouter.get("/img",function(req,res){
    
    // Jimp.read(__dirname+'/img/spongebob.jpg')
    // .then(function(pic){
        
    //     //console.log(pic);
        
    //     for(var i = 0; i < pic.bitmap.height; i++){
    //         for(var j = 0; j < pic.bitmap.width; j++){
    //             //console.log('uhhh');
    //             pic.setPixelColor(0xFFFFFFFF,j,i);
                
    //         }
    //     }
        
    //     pic.write(__dirname+'/img/white.jpg');
        
    // });
    
    res.sendFile(__dirname+'/img/spongebob-small.jpg');
    
});

var UserRoute = require("./user");
MainRouter.use(UserRoute);


module.exports = MainRouter;