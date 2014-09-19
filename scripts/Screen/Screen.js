function Screen(game){
	this.game = game;
	this.isInitialized = false;
}

Screen.prototype.initialize = function () {
	this.isInitialized = true;
}

Screen.prototype.draw = function(context) {
}

Screen.prototype.update = function() {
}

Screen.prototype.onClick = function(p) {
	
}