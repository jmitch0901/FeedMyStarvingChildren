var express = require("express"),
    Path = require("path"),
    PixelHandler = require("../factories/pixelHandlerv2"),
    passport = require("passport"),
    Middleware = require('./middleware'),
    MainRouter = express.Router({mergeParams:true});


// MainRouter.get('/',function(req,res){
//    res.sendFile(Path.resolve(__dirname + '/../public/login.html'));
// });



MainRouter.get("/login",function(req,res){
  res.json({message:"Login in by making POST request to /login.",isLoggedIn:req.isAuthenticated()});
});



MainRouter.post('/login',passport.authenticate('local',{failureRedirect:'/api/login'}),function(req,res){
  console.log(req.user._id + " user id is logged in.");
  res.json({message:"Hello " + req.user.firstname+ ", you are now logged in.",isLoggedIn:req.isAuthenticated()});
});



MainRouter.get('/logout',function(req,res){
  req.logout();
  res.json({message:"You are now logged out.",isLoggedIn:req.isAuthenticated()})
});


//Require more routes
var UserRoute = require("./user");
MainRouter.use(UserRoute);



//TODO
MainRouter.get("/img",function(req,res){

    console.log("Hitting /img");
    res.sendFile(Path.resolve(__dirname+'/../img/releasable-image.jpg'));
});


module.exports = MainRouter;
