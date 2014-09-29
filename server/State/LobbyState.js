function LobbyState(game){
	State.call(this, game);
}

LobbyState.prototype = Object.create(State.prototype);
LobbyState.prototype.constructor = LobbyState;


LobbyState.prototype.initialize = function () {
}

LobbyState.prototype.draw = function(context) {
}

LobbyState.prototype.update = function() {
}

LobbyState.prototype.checkGameOver = function(){

}