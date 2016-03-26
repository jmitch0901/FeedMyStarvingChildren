var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    expressSession = require("express-session"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./schemas/user"),
    Jimp = require("jimp");
    
    
mongoose.connect('mongodb://localhost/fmsc');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(expressSession({
    secret: "HYYa<qv\\v?faJ8Lr8vc\\",//Change this to enviroment variable later
    resave: false,
    saveUninitialized: false
}));

//Session Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",function(req,res){
   res.sendFile(__dirname + '/public/login.html');
});

app.get("/img",function(req,res){
    
    // Jimp.read(__dirname+'/img/spongebob.jpg')
    // .then(function(pic){
        
    //     //console.log(pic);
        
    //     for(var i = 0; i < pic.bitmap.height; i++){
    //         for(var j = 0; j < pic.bitmap.width; j++){
    //             //console.log('uhhh');
    //             pic.setPixelColor(0xFFFFFFFF,j,i);
                
    //         }
    //     }
        
    //     pic.write(__dirname+'/img/white.jpg');
        
    // });
    
    res.sendFile(__dirname+'/img/spongebob-small.jpg');
    
});
    
    
app.listen(process.env.PORT || 8080, process.env.IP, function(){
   console.log("Server Started!"); 
});