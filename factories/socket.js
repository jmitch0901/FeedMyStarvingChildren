var SocketIO = require('socket.io');

var Socket = function(listener){
  this.io = SocketIO.listen(listener);
  this.io.on('connection',function(socket){
    console.log('Client Connected!');
  });
}

module.exports = Socket;
