function Trail (comet, kind){
	Entity.call(this);
	this.comet = comet;
	this.kind = kind;

	this.list = new Array();
}

Trail.prototype = Object.create(Entity.prototype);
Trail.prototype.constructor = Trail;

Trail.prototype.initialize = function(){
	var M = new MathHelper();
	
	var length = M.random(Config.game.trail.minimum, Config.game.trail.maximum);

	var size = 75;	
	var scale = 1;
	for (var i = 0; i < length; i++) {
		this.list[i] = new CenteredSprite('tail-' + this.kind, this.position.x, this.position.y, size, size, scale, scale);
		scale = scale * Config.game.trail.scaling;
	}
}


Trail.prototype.update = function (){
	Entity.update.call(this);
}

Trail.prototype.draw = function (context) {
	Entity.draw.call(this, context);
	
}
	this.PrepareTrail = function(type, x, y, opacity, scale) {
		var sprite, width, height;
		
		var textureList = new Array();
		textureList.push("asteroid");
		textureList.push("asteroidsmall");
		textureList.push("asteroidglow");
		textureList.push("comethead");
		textureList.push("tail1");
		textureList.push("tail2");
		textureList.push("tail3");
		textureList.push("tail4");
		
		width = 72;
		height = 36;
		
		if (type == 2)
			height = width = 50;

		var texture = textureList[type];
		
		this.sprite = new Sprite(texture, x, y, width, height, opacity, scale, scale);
		
	}