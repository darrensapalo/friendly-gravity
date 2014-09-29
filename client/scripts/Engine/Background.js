function Background(background)
{
	if (background === undefined) background = "default_background";
	if(window.game === undefined) throw new Error("UndefinedGameException: Cannot find the main game.");
	Sprite.call(this, background, 0, 0, 800, 480);
}

Background.prototype = Object.create(Sprite.prototype); 
Background.prototype.constructor = Sprite;