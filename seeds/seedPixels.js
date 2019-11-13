conn = new Mongo();
db = conn.getDB("fmsc");

db.pixels.drop();

for (var i = 0; i < 1000; i++) {
  for (var j = 0; j < 1000; j++) {
    db.pixels.insert({
      message: "",
      pixel: {
        x: i,
        y: j
      },
      isBought: false
    });
  }
}
