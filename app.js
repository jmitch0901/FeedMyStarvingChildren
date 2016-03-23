var express = require("express"),
    app = express();
    
app.use(express.static(__dirname + '/public'));
    
app.get("/",function(req,res){
   res.sendfile(__dirname + '/public/login.html');
});
    
    
app.listen(process.env.PORT || 8080, process.env.IP, function(){
   console.log("Server Started!"); 
});