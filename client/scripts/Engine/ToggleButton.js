function ToggleButton(spriteName, toggleSpriteName, x, y, width, height, opacity, scalex, scaley)
{
	Button.call(this, spriteName, x, y, width, height, opacity, scalex, scaley);
	this.toggleSprite = new CenteredSprite(toggleSpriteName, x, y, width, height, opacity, scalex, scaley);

	// To be implemented
	this.toggleSprite.opacity = 1;
}

ToggleButton.prototype = Object.create(Button.prototype);
ToggleButton.prototype.constructor = ToggleButton;

ToggleButton.prototype.draw = function(context, status){
	if (status == false)
		Button.draw.call(this, context);
	else
		this.toggleSprite.draw(context);
}