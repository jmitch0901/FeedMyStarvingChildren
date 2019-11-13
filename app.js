var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  expressSession = require("express-session"),
  passport = require("passport"),
  User = require("./schemas/user"),
  PixelHandler = require("./factories/pixelHandlerv2");

mongoose.connect("mongodb://localhost/fmsc");

// TODO - Use a separate process/thread to run the pixel handler
PixelHandler.init();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

//Session Setup
app.use(
  expressSession({
    secret: process.env.SECRET || "HYYa<qv\\v?faJ8Lr8vc\\", //Change this to enviroment variable later
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14 //2 weeks
    },
    cookie: {
      httpOnly: true
    }
  })
);

//Session Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var routes = require("./routes");
app.use("/api", routes);

app.listen(process.env.PORT || 3000, function() {
  console.log("HTTP Server Started!");
});
