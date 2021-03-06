var express = require('express'),
  PixelHandler = require('../factories/pixelHandlerv2'),
  passport = require('passport'),
  MainRouter = express.Router({ mergeParams: true });

MainRouter.get('/login', function(req, res) {
  res.json({
    message: 'Login in by making POST request to /login.',
    isLoggedIn: req.isAuthenticated()
  });
});

MainRouter.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/api/login' }),
  function(req, res) {
    res.json({
      message: 'Hello ' + req.user.firstname + ', you are now logged in.',
      isLoggedIn: req.isAuthenticated()
    });
  }
);

MainRouter.get('/logout', function(req, res) {
  req.logOut();
  res.json({
    message: 'You are now logged out.',
    isLoggedIn: req.isAuthenticated()
  });
});

var UserRoute = require('./user');
MainRouter.use(UserRoute);

var PixelsRoute = require('./pixels');
MainRouter.use('/pixels', PixelsRoute);

MainRouter.get('/img', function(req, res) {
  res.sendFile(PixelHandler.getReleasableImagePath());
});

module.exports = MainRouter;
