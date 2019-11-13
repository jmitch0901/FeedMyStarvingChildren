var Passport = require("passport"),
  Express = require("express"),
  PixelHandler = require("../../factories/pixelHandlerv2"),
  UserSchema = require("../../schemas/user"),
  SwearJar = require("swearjar"),
  Mongoose = require("mongoose");

var Middleware = {
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("YOU ARE AUTHENTICATED!");
      return next();
    }
    console.log("you are not authenticated");
    res.status(401);
    res.json({ error: "Not Authenticated." });
  },
  checkUserRegistry: function(req, res, next) {
    if (req.isAuthenticated()) {
      res.status(403);
      return res.json({ error: "You must logout first!" });
    }
    console.log(req.body);
    var potentialUser = req.body.user;
    // console.log(req.body);

    if (
      !potentialUser ||
      !potentialUser.firstname ||
      !potentialUser.lastname ||
      !potentialUser.email ||
      !potentialUser.password
    ) {
      res.status(400);
      console.log("Didnt send me good params!");
      return res.json({ error: "Bad POST parameters while registering." });
    }

    UserSchema.find({ email: potentialUser.email }, function(err, result) {
      if (err) {
        res.status(503);
        return res.json({ error: err });
      }

      if (result.length > 0) {
        res.status(409);
        return res.json({ error: "Someone with that email already exists!" });
      }

      next();
    });
  },
  validateBuyPixels: function(req, res, next) {
    var amount = req.body.amount,
      card = req.body.card;

    if (!card) {
      return res.json(400, {
        success: false,
        error: "You must provide a credit card."
      });
    }

    if (!amount || isNaN(amount) || Number(amount) < 10) {
      return res.json(400, {
        success: false,
        error:
          "You must provide a pixel (number) amount of either 10 or greater."
      });
    }

    req.body.amount = Number(req.body.amount);

    if (req.body.amount < 10 || req.body.amount > 1000) {
      return res.json(400, {
        success: false,
        error:
          "The purchase minimum is 10, and the maximum is 1000. Please ensure it is within this range!"
      });
    }

    var pixelsLeft = PixelHandler.getPixelsRemainingCount();

    if (req.body.amount > pixelsLeft) {
      return res.json(400, {
        success: false,
        error:
          "There are only " +
          pixelsLeft +
          " pixels remaining to buy. Please purchase this amount or less."
      });
    }

    var cardName = card.name,
      cardNum = card.number,
      cardMonth = card.month,
      cardYear = card.year,
      cardCVV = card.cvv;

    if (!cardName) {
      return res.json(400, {
        success: false,
        error: "You must provide the name lisited on your credit card."
      });
    }

    if (!cardNum || isNaN(cardNum)) {
      return res.json(400, {
        success: false,
        error: "You must provide a valid card number."
      });
    }

    if (!cardMonth) {
      return res.json(400, {
        success: false,
        error: "You must provide a valid card expiration month."
      });
    }

    if (!cardYear) {
      return res.json(400, {
        success: false,
        error: "You must provide a valid card expiration year."
      });
    }

    if (!cardCVV) {
      return res.json(400, {
        success: false,
        error: "You must provide a valid CVV code."
      });
    }

    next();
  },

  filterNames: function(req, res, next) {
    var potentialUser = req.body.user;

    var badFirstname = SwearJar.profane(potentialUser.firstname);
    var badLastname = SwearJar.profane(potentialUser.lastname);

    if (badFirstname || badLastname) {
      var message = "";

      if (badFirstname && badLastname) {
        message =
          "Could not sign you up. You there is profanity in your first name and last name!";
      } else if (badFirstname) {
        message =
          "Could not sign you up. You there is profanity in your first name!";
      } else if (badLastname) {
        message =
          "Could not sign you up. You there is profanity in your last name!";
      }

      return res.json(400, { error: message });
    }

    return next();
  },

  filterProfanity: function(req, res, next) {
    if (!req.body.message) {
      req.body.message = "Thanks for donating :)";
      return next();
    }

    req.body.message = SwearJar.censor(req.body.message);
    next();
  }
};

module.exports = Middleware;
