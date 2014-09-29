function Tooltip(position, text)
{
	TextSprite.call(this, text, position.x, position.y, 200, 40, Color.black, Color.red);
}

Tooltip.prototype = Object.create(TextSprite.prototype);
Tooltip.prototype.constructor = Tooltip;