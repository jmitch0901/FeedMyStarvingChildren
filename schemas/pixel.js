var mongoose = require("mongoose");
var MongooseRandom = require("mongoose-simple-random");

var pixelSchema = new mongoose.Schema({
  message: String,
  pixel: {
    x: Number,
    y: Number
  },
  isBought: { type: Boolean, default: false },
  buyer: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }
});

pixelSchema.plugin(MongooseRandom, { path: "r" });

var MongooseModel = mongoose.model("Pixel", pixelSchema);

module.exports = MongooseModel;
