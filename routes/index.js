var express = require("express"),
    Path = require("path"),
    PixelHandler = require("../factories/pixelHandlerv2"),
    passport = require("passport"),
    MainRouter = express.Router({mergeParams:true});


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


MainRouter.get("/login",function(req,res){
  res.json({message:"Login in by making POST request to /login.",isLoggedIn:req.isAuthenticated()});
});

//TODO
//passport.authenticate("local",{failureRedirect:"/login"}),
MainRouter.post('/login',passport.authenticate("local"),function(req,res){
  if(req.isAuthenticated()){
    res.status(406);
    return res.json({error:"Please log out first!"});
  }

  console.log(req.user);
  res.json({message:"Hello " + ", you are now logged in."});
});

MainRouter.get('/logout',function(req,res){
  req.logout();
  res.redirect('/');
});

var UserRoute = require("./user");
MainRouter.use(UserRoute);


module.exports = MainRouter;
