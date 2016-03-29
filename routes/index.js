var express = require("express"),
    Path = require("path"),
    PixelHandler = require("../factories/pixelHandlerv2"),
    MainRouter = express.Router();



MainRouter.get('/',function(req,res){
    console.log("Hitting /");
    res.sendFile(__dirname+'/../public/login.html');
});


MainRouter.get("/img",function(req,res){

    console.log("Hitting /img");

    PixelHandler.buyPixels('100','suh dude',1000,function(err){
        if(err){
            console.log(err);
        }
        res.sendFile(Path.resolve(__dirname+'/../img/releasable-image.jpg'));
    });

    //res.sendFile(Path.resolve(__dirname+'/../img/releasable-image.jpg'));
});

var UserRoute = require("./user");
MainRouter.use(UserRoute);


module.exports = MainRouter;
