function InputHandler()
{
	this.inputs = [];
	
	window.onkeydown = this.handleKeyDown;
	window.onkeyup = this.handleKeyUp;
	window.onmousemove = this.handleMouseMove;
	for (var key in InputKey) {
		this.inputs[InputKey[key]] = new InputState(InputKey[key]);
	}
	console.log(this.inputs);
}

InputHandler.prototype.handleMouseMove = function(evt)
{
	game.mousex = evt.x;
	game.mousey = evt.y;
}

InputHandler.prototype.isPressed = function(key) {
	for(var k in this.inputs)
	{
		if (k === key)
			return this.inputs[key].isPressed;
	}
	return false;
};

InputHandler.prototype.handleKeyDown = function(evt) {
	var key = evt.keyCode;
	for(var k in this.inputs)
	{
		if (k === key)
			this.inputs[key].onKeyDown();
	}
}

InputHandler.prototype.handleKeyUp = function(evt) {
	var key = evt.keyCode;
	for(var k in this.inputs)
	{
		if (k === key)
			this.inputs[key].onKeyUp();
	}
}