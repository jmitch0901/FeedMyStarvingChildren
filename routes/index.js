var express = require("express"),
    Path = require("path"),
    PixelHandler = require("../factories/pixelHandlerv2"),
    passport = require("passport"),
    Middleware = require('./middleware'),
    MainRouter = express.Router({mergeParams:true});


MainRouter.get("/login",function(req,res){
  res.json({message:"Login in by making POST request to /login.",isLoggedIn:req.isAuthenticated()});
});

MainRouter.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),function(req,res){
  res.json({message:"Hello " + req.user.firstname+ ", you are now logged in.",isLoggedIn:req.isAuthenticated()});
});

MainRouter.get('/logout',function(req,res){
  req.logout();
  res.json({message:"You are now logged out.",isLoggedIn:req.isAuthenticated()})
});

var UserRoute = require("./user");
MainRouter.use(UserRoute);


//TODO
MainRouter.get('/',function(req,res){
    console.log("Hitting /");
    res.sendFile(__dirname+'/../public/login.html');
});


//TODO
MainRouter.post('/buy',Middleware.isLoggedIn,function(req,res){

  PixelHandler.buyPixels('100','suh dude',10000,function(err){
      if(err){
          console.log(err);
      }
      res.sendFile(Path.resolve(__dirname+'/../img/releasable-image.jpg'));
  });
});

//TODO
MainRouter.get("/img",function(req,res){

    console.log("Hitting /img");
    //
    // PixelHandler.buyPixels('100','suh dude',1000,function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     res.sendFile(Path.resolve(__dirname+'/../img/releasable-image.jpg'));
    // });
    res.sendFile(Path.resolve(__dirname+'/../img/releasable-image.jpg'));
});


module.exports = MainRouter;
