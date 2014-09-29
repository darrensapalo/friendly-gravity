var State = require('./State.js');
function GameState(game) {
  State.call(this, game);
}

GameState.prototype = Object.create(State.prototype);
GameState.prototype.constructor = GameState;

GameState.prototype.initialize = function () {
  this.world = new World(game, GameState.prototype.checkGameOver);
  game.worldReference = this.world;
  this.HUD = new HUD(this.world);
  this.world.initialize();
}

GameState.prototype.update = function () {
  State.prototype.update.call(this);
  this.world.update();
  this.HUD.update();
}

GameState.prototype.checkGameOver = function (){
  if (this.countdownLeft <= 0)
  {
    this.round = new Round(Math.floor(this.score), this.eaten);
    this.isGameOver = true;
  }
}

module.exports = GameState;