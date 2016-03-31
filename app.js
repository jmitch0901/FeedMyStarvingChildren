var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    expressSession = require("express-session"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./schemas/user"),
    PixelHandler = require("./factories/pixelHandlerv2"),
    HTTPS = require('https');


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
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var routes = require("./routes");
app.use(routes);


//HTTP
app.listen(process.env.PORT || 8080, process.env.IP, function(){
   console.log("HTTP Server Started!");
});

//HTTPS

var certOptions = require('./configs/certs');

HTTPS.createServer(certOptions,app).listen(3000,function(){
  console.log("HTTPS SERVER STARTED");
});
