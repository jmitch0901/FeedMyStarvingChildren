var express = require("express"),
    UserRouter = express.Router(),
    passport = require("passport");
    

UserRouter.get('/user',function(req,res){
   res.send("Hit the user route"); 
});  
    
    
    
    
    
    
module.exports = UserRouter;