var net = require('net');
var dgram = require('dgram');
var tween = require('tween.js');

  // Engine
var Config = require('./Engine/Config.js');

var MathHelper = require('./Engine/MathHelper.js');
var Rectangle = require('./Engine/Rectangle.js');
var Session = require('./Engine/Session.js');
var Vector2D = require('./Engine/Vector.js');

  // Game

var Entity = require('./Game/Entity.js');
var Consumable = require('./Game/Consumable.js');
var Asteroid = require('./Game/Asteroid.js');
var Blackhole = require('./Game/Blackhole.js');
var ChildEntity = require('./Game/ChildEntity.js');
var Comet = require('./Game/comet.js');
var Eaten = require('./Game/Eaten.js');
var Emitter = require('./Game/Emitter.js');
var Planet = require('./Game/Planet.js');
var Player = require('./Game/Player.js');
var PulseNova = require('./Game/PulseNova.js');
var Round = require('./Game/Round.js');
var Ships = require('./Game/Ships.js');
var Trail = require('./Game/Trail.js');
var World = require('./Game/World.js');

  // Handler
var InputHandler = require('./Handler/InputHandler.js');
var StateHandler = require('./Handler/StateHandler.js');


  // States
var State = require('./State/State.js');
var GameState = require('./State/GameState.js');
var LobbyState = require('./State/LobbyState.js');
var InitializingState = require('./State/InitializingState.js');

function Game() {
  this.InputHandler = new InputHandler();
  this.connections = [];
  this.states = [];
  this.currentState = null;
  this.game = null;
}

function onConnect(socket) {
  var ip = socket.localAddress;
  console.log("[" + ip + " start]");

  function onEnd() {
    console.log("[" + ip + " end]");
  }

  function onReceiveData(data) {
    var a = JSON.parse(data);
    console.log(ip + ": " + a);
  }

  socket.on('end', onEnd);
  socket.on('data', onReceiveData);
}

function onServerStart() {
  console.log('Server bound to port 8080.');
}

Game.prototype.initialize = function () {
  this.server = net.createServer(onConnect);
  this.server.listen(8080, onServerStart);

  this.initStates();
}

Game.prototype.initStates = function () {
  var state = new LobbyState();
  this.currentState = state; // Initialize with the lobby state
  this.states.push(state);

  var state = new InitializingState();
  this.states.push(state);

  var state = new GameState();
  this.states.push(state);

  this.currentState.initialize();
}


Game.prototype.update = function() {

}

Game.prototype.destroy = function() {

}

var game = new Game();
game.initialize();

module.exports = Game;