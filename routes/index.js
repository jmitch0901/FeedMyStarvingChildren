var express = require("express"),
    Path = require("path"),
    MainRouter = express.Router();
    
    
    
MainRouter.get('/',function(req,res){
    
    res.sendFile(__dirname+'/../public/login.html');
    
});


MainRouter.get("/img",function(req,res){
    

    
    res.sendFile(Path.resolve(__dirname+'/../img/releasable-image.jpg'));
    
});

var UserRoute = require("./user");
MainRouter.use(UserRoute);


module.exports = MainRouter;