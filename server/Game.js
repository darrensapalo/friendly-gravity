var net = require('net');
var dgram = require('dgram');
var tween = require('tween.js');
var mft = require('./modules');

function Game() {
  this.InputHandler = mft.InputHandler();
  this.connections = new Array();
  this.game = null;
}

Game.prototype.initialize = function() {
  this.server = net.createServer(onConnect);
  this.server.listen(8080, onServerStart);
}

function onConnect(socket) {
  var ip = socket.localAddress;
  console.log("[" + ip + " start]");

  socket.on('end', onEnd);
  socket.on('data', onReceiveData);
  
  function onEnd() {
    console.log("[" + ip + " end]");
  }

  function onReceiveData(data) {
    var a = JSON.parse(data);
    console.log(ip +": " + a);
  }
}

function onServerStart(){
  console.log('Server bound to port 8080.');
}

Game.prototype.initStates = function () {

}


Game.prototype.update = function() {

}

Game.prototype.destroy = function() {

}

var game = new Game();
game.initialize();

module.exports = Game;