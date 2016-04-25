var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    expressSession = require("express-session"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./schemas/user"),
    PixelHandler = require("./factories/pixelHandlerv2"),
    https = require('https');



mongoose.connect('mongodb://localhost/fmsc');
PixelHandler.init();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname+'/public'));
app.use(expressSession({
    secret: process.env.SECRET || "HYYa<qv\\v?faJ8Lr8vc\\",//Change this to enviroment variable later
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: 1000 * 60 * 60 * 24 * 14 //2 weeks
    },
    cookie:{
        httpOnly: false
    }
}));

//Session Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var routes = require("./routes");
app.use('/api',routes);
// app.all('/*',function(req,res){
//   res.sendFile(__dirname+'/public/index.html');
// });

//http requests
var httpListener = app.listen(process.env.PORT || 8080, process.env.IP, function(){
   console.log("HTTP Server Started!");
});

//HTTPS
var certOptions = require('./configs/certs');
var httpsListener = https.createServer(certOptions,app).listen(process.env.HTTPS_PORT || 3000,function(){
  console.log("HTTPS SERVER STARTED");
});



// var httpSocket = new Socket(httpListener);



//WRAP the io events.
// var io = require('./factories/socketFactory');
// io(app);
