function HoverableButton(spriteName, hoverSpriteName, x, y, width, height, opacity, scalex, scaley)
{
	Button.call(this, spriteName, x, y, width, height, opacity, scalex, scaley);
	this.hoverSprite = new CenteredSprite(hoverSpriteName, x, y, width, height, opacity, scalex, scaley);

	// To be implemented
	this.hoverSprite.opacity = 0;

	this.isRest = true;
	this.tween = false;
	this.tweenOut = false;
}

HoverableButton.prototype = Object.create(Button.prototype);
HoverableButton.prototype.constructor = HoverableButton;

HoverableButton.prototype.update = function () {
	var p = game.InputHandler.mouse;
	if (this.contains(p))
	{

		if (this.isRest)
		{
			console.log("Creating tween to highlight");
			this.tween = createjs.Tween.get(this.hoverSprite).to({ opacity:1 }, 350, createjs.Ease.quadOut).call(function(s) {s.tween = false;}, [this]);
			this.isRest = false;
		}
	}else
	{
		if (this.isRest == false)
		{
			// If you haven't started tweening down, then begin tweening down
			if (this.tweenOut == false && this.tween == false)
			{
				console.log("Creating tween to remove highlight");
				this.tweenOut = createjs.Tween.get(this.hoverSprite).to({ opacity:0 }, 350, createjs.Ease.quadIn).call(function(s) {s.tweenOut = false; s.isRest = true;}, [this]);
			}
		}


	}
	
}

HoverableButton.prototype.draw = function(context){
	Button.prototype.draw.call(this, context);
	this.hoverSprite.draw(context);
	
}