function Button(spriteName, x, y, width, height, opacity, scalex, scaley)
{
	Entity.call(this);
	this.callback = null;
	this.sprite = new CenteredSprite(spriteName, x, y, width, height, opacity, scalex, scaley);
}

Button.prototype = Object.create(Entity.prototype);
Button.prototype.constructor = Button;

Button.prototype.setCallback = function (f) {
	this.callback = f;
}

Button.prototype.setPosition = function(Vector2D) {
	this.sprite.setPosition(Vector2D);
	this.position = Vector2D;
};

Button.prototype.contains = function (p) {
	return this.sprite.contains(p.x, p.y);
}

Button.prototype.click = function (evt) {
	if (typeof game === 'undefined') throw new Error("NullError: the game is not defined in the global space.");
	var p = InputHandler.prototype.handleMouseClick(evt);
	
	if (this.contains(p))
	{
		if (Config.debug)
			Console.log("Button found at '" + this.position + "' was pressed.");

		this.callback.call(game);
	}
}

Button.prototype.draw = function(context) {
	this.sprite.draw(context);
}

Button.prototype.create = function(type, p){
	switch(type){
		case "Hoverable":
			return new HoverableButton("button", "buttonHighlight", p.x, p.y, 255, 80);
		break;
	}
}