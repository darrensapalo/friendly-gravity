var State = require('./State.js');
function InitializingState(game){
	State.call(this, game);
}

InitializingState.prototype = Object.create(State.prototype);
InitializingState.prototype.constructor = InitializingState;


InitializingState.prototype.initialize = function () {
	
}

InitializingState.prototype.draw = function(context) {
	
}

InitializingState.prototype.update = function() {
	
}

module.exports = InitializingState;