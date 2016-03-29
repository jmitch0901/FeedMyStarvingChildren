var mongoose = require("mongoose");

var pixelSchema = mongoose.Schema({
    message: String,
    pixel:{
        x:Number,
        y:Number
    },
    isBought:{type:Boolean, default:false},
    buyer:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }
});

//Should i store users name in this pixel model?
module.exports = mongoose.model("Pixel",pixelSchema);