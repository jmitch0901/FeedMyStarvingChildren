var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    expressSession = require("express-session"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./schemas/user"),
    PixelHandler = require("./factories/pixelHandlerv2");


mongoose.connect('mongodb://localhost/fmsc');
PixelHandler.init();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
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

app.get('/',function(req,res){
   res.sendFile(__dirname + '/public/login.html');
});


var routes = require("./routes");
app.use(routes);


app.listen(process.env.PORT || 8080, process.env.IP, function(){
   console.log("Server Started!");
});
