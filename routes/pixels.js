var express = require('express'),
  PixelSchema = require('../schemas/pixel'),
  PixelHandler = require('../factories/pixelHandlerv2'),
  PixelRouter = express.Router({ mergeParams: true });

PixelRouter.get('/', function(req, res) {
  if (!req.query.x || !req.query.y) {
    return res.json(400, { success: false });
  }

  var x = req.query.x;
  var y = req.query.y;

  PixelSchema.findOne({ 'pixel.x': x, 'pixel.y': y })
    .lean()
    .populate('buyer.id')
    .exec(function(err, result) {
      if (err) {
        console.error(err);
        return res.json({ success: false });
      }

      if (!result) {
        return res.json({ success: false });
      }

      if (result.isBought && result.buyer) {
        result.buyer = {
          firstname: result.buyer.id.firstname
        };
      }

      return res.json({ success: true, pixelInfo: result });
    });
});

PixelRouter.get('/percentage', function(req, res) {
  res.json({ percentage: PixelHandler.getPurchasePercent() });
});

module.exports = PixelRouter;
