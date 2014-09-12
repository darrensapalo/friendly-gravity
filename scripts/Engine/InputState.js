function InputState (key)
{
	this.key = key;
	this.isPressed;
	this.callbacks = {
		onKeyDown: [],
		onKeyUp: []
	};
}

InputState.prototype.addKeyDownListener = function(f){
	this.callbacks.onKeyDown.push(f);
}

InputState.prototype.addKeyUpListener = function(f){
	this.callbacks.onKeyUp.push(f);
}

InputState.prototype.onKeyDown = function() {
	this.isPressed = true;
	var down = callbacks.onKeyDown;
	for (var key in down) {
		if (down.hasOwnProperty(key)) {
			var func = down[key];
			func.call(this);
		}
	}
};

InputState.prototype.onKeyUp = function() {
	this.isPressed = false;
	var up = callbacks.onKeyUp;
	for (var key in up) {
		if (up.hasOwnProperty(key)) {
			var func = up[key];
			func.call(this);
		}
	}
};