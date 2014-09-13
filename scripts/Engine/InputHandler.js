function InputHandler()
{
	this.inputs = [];
	
	window.onkeydown = this.handleKeyDown;
	window.onkeyup = this.handleKeyUp;
	window.onmousemove = this.handleMouseMove;
	for (var key in InputKey) {
		if (InputKey.hasOwnProperty(key))
		{
			var keyCode = InputKey[key];
			this.inputs.push(new InputState(keyCode));
		}
	}
}

InputHandler.prototype.get = function(key) {
	for (var i = this.inputs.length - 1; i >= 0; i--) {
		if (this.inputs[i].key == key)
			return this.inputs[i];
	}
	return false;
};

InputHandler.prototype.handleMouseMove = function(evt)
{
	game.mousex = evt.x;
	game.mousey = evt.y;
}

InputHandler.prototype.isPressed = function(key) {
	for(var k = 0; k < this.inputs.length; k++)
	{
		var input = this.inputs[k];
		if (input.key === key)
			return input.isPressed;
	}
	return false;
};

InputHandler.prototype.handleKeyDown = function(evt) {
	var key = evt.keyCode;
	var that = game.InputHandler;
	for(var k = 0; k < that.inputs.length; k++)
	{
		var input = that.inputs[k];
		if (input.key === key){
			input.onKeyDown();
			break;
		}
	}
}

InputHandler.prototype.handleKeyUp = function(evt) {
	var key = evt.keyCode;
	var that = game.InputHandler;
	for(var k = 0; k < that.inputs.length; k++)
	{
		var input = that.inputs[k];
		if (input.key === key){
			input.onKeyUp();
			break;
		}
	}
}

InputHandler.prototype.update = function()
{
	for(var k = 0; k < that.inputs.length; k++)
	{
		var input = that.inputs[k];
		if (input.isPressed){
			input.action();
			break;
		}
	}
}