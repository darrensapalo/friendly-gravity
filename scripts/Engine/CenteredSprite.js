function CenteredSprite(img, x, y, width, height, opacity, scalex, scaley) {
	Sprite.call(this, img, x, y, width, height, opacity, scalex, scaley);
	this.setOrigin(-width / 2, -height / 2);
}

CenteredSprite.prototype = Object.create(Sprite.prototype); 
CenteredSprite.prototype.constructor = CenteredSprite;