function HoverableButton(spriteName, hoverSpriteName, x, y, width, height, opacity, scalex, scaley)
{
	Button.call(this, spriteName, x, y, width, height, opacity, scalex, scaley);
	this.hoverSprite = new CenteredSprite(hoverSpriteName, x, y, width, height, opacity, scalex, scaley);

	// To be implemented
	this.hoverSprite.opacity = 0;
}

HoverableButton.prototype = Object.create(Button.prototype);
HoverableButton.prototype.constructor = HoverableButton;

HoverableButton.prototype.update = function () {
	var p = game.InputHandler.mouse;
	this.hoverSprite.opacity = (this.contains(p)) ? 1 : 0;
}

HoverableButton.prototype.draw = function(context){
	this.hoverSprite.draw(context);
	Button.prototype.draw.call(this, context);
	
}