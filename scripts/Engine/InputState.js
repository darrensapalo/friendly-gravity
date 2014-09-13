function InputState (key)
{
	this.key = key;
	this.isPressed;
	this.callbacks = {
		onKeyDown: [],
		onKeyUp: [],
		action: []
	};
}

InputState.prototype.addKeyDownListener = function(f){
	this.callbacks.onKeyDown.push(f);
	
}

InputState.prototype.addAction = function(f)
{
	this.callbacks.action.push(f);
// 	console.log("added action to " + this.key);
}

InputState.prototype.action = function(f)
{
	var action = this.callbacks.action;
	for (var key in action) {
		if (action.hasOwnProperty(key)) {
			var func = action[key];
			func.call(this);
		}
	}
}

InputState.prototype.addKeyUpListener = function(f){
	this.callbacks.onKeyUp.push(f);

}

InputState.prototype.onKeyDown = function() {
	this.isPressed = true;
	var down = this.callbacks.onKeyDown;
//	console.log("Pressed key: " + this.key);
	for (var key in down) {
		if (down.hasOwnProperty(key)) {
			var func = down[key];
			func.call(this);
		}
	}
};

InputState.prototype.onKeyUp = function() {
	this.isPressed = false;
	var up = this.callbacks.onKeyUp;
//	console.log("Released key: " + this.key);
	for (var key in up) {
		if (up.hasOwnProperty(key)) {
			var func = up[key];
			func.call(this);
		}
	}
};