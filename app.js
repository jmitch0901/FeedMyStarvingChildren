var express = require("express"),
    app = express();
    
    
app.get("/",function(req,res){
   res.send("Sup World!!"); 
});
    
    
app.listen(process.env.PORT || 8080, process.env.IP, function(){
   console.log("Server Started!"); 
});