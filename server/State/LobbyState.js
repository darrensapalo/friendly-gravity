var State = require('./State.js');
function LobbyState(game) {
  State.call(this, game);
}

LobbyState.prototype = Object.create(State.prototype);
LobbyState.prototype.constructor = LobbyState;

LobbyState.prototype.initialize = function () {
  console.log("Created a new lobby.");
}

LobbyState.prototype.update = function() {
}

LobbyState.prototype.checkGameOver = function() {

}

module.exports = LobbyState;