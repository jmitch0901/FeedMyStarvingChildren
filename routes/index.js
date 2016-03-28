var express = require("express"),
    Path = require("path"),
    PixelHandler = require("../factories/pixelHandler"),
    MainRouter = express.Router();
    
    
    
MainRouter.get('/',function(req,res){
    
    res.sendFile(__dirname+'/../public/login.html');
    
});


MainRouter.get("/img",function(req,res){
    
    
    PixelHandler.buyPixels('100','suh dude',25,function(err){
        if(err){
            console.log(err);
        }
        res.sendFile(Path.resolve(__dirname+'/../img/releasable-image.jpg'));
    });

    

    
});

var UserRoute = require("./user");
MainRouter.use(UserRoute);


module.exports = MainRouter;