var express = require("express"),
  UserRouter = express.Router({ mergeParams: true }),
  UserSchema = require("../schemas/user"),
  Middleware = require("./middleware"),
  PixelHandler = require("../factories/pixelHandlerv2");

UserRouter.post(
  "/user",
  Middleware.checkUserRegistry,
  Middleware.filterNames,
  function(req, res) {
    var userBody = req.body.user;
    var user = {
      firstname: userBody.firstname,
      lastname: userBody.lastname,
      email: userBody.email
    };

    console.log("Registering user email: " + user.email);

    UserSchema.register(user, userBody.password, function(err, result) {
      if (err) {
        console.log(err);
        return res.json({ error: err });
      }
      res.json({
        success:
          "You have successfully registered! You can now login with a POST request to /login."
      });
    });
  }
);

// /me GET
UserRouter.get("/user/:id_user", Middleware.isLoggedIn, function(req, res) {
  console.log("Got GET current user route!");
  res.json({ me: req.user });
});

// /me PUT
UserRouter.put("/user/:id_user", function(req, res) {
  res.send("Hit user_id put route.");
});

UserRouter.post(
  "/user/:id_user/buy",
  Middleware.isLoggedIn,
  Middleware.validateBuyPixels,
  Middleware.filterProfanity,
  function(req, res) {
    PixelHandler.buyPixels(
      req.user.id,
      req.body.message,
      req.body.amount,
      function(err) {
        if (err) {
          console.log(err);
          res.json({ error: err });
          return;
        }
        res.json({
          success: true,
          message:
            "You have successfully purchased " +
            req.body.amount +
            " pixels! Your payment is now being processed. Your pixels will appear afterwards. Thank you!"
        });
      }
    );
  }
);

//REDIRECTION
UserRouter.get("/me", Middleware.isLoggedIn, function(req, res) {
  res.redirect("user/" + req.user._id);
});

UserRouter.put("/me", Middleware.isLoggedIn, function(req, res) {
  res.redirect("user/" + req.user._id);
});

module.exports = UserRouter;
