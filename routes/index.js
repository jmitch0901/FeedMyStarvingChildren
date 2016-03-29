var express = require("express"),
    Path = require("path"),
    PixelHandler = require("../factories/pixelHandlerv2"),
    passport = require("passport"),
    MainRouter = express.Router();


//TODO
MainRouter.get('/',function(req,res){
    console.log("Hitting /");
    res.sendFile(__dirname+'/../public/login.html');
});

//TODO
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

//TODO
MainRouter.post('/login',passport.authenticate("local"),function(req,res){
  if(res.isAuthenticated()){
    res.redirect('/user/'+req.user.id);
  } else {
    res.status(401);
    res.json({error:"Invalid credentials"});
  }
});

MainRouter.get('/logout',function(req,res){
  req.logout();
  req.redirect('/');
});

var UserRoute = require("./user");
MainRouter.use(UserRoute);


module.exports = MainRouter;
