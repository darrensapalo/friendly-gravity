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
	console.log(this.comet.position.toString());
	for (var i = 0; i < length; i++) {
			this.list[i] = new CenteredSprite('tail-' + this.kind, this.comet.position.x, this.comet.position.y, size, size, scale, scale);
		scale = scale * Config.game.trail.scaling;
	}
}


Trail.prototype.update = function (){
	Entity.prototype.update.call(this);



	this.position.x = this.comet.position.x;
	this.position.y = this.comet.position.y;

	this.list[0].setPosition(this.position);

	this.sprite = this.list[0];

	console.log(this.list[0]);
	
	for (var i = this.list.length - 1; i > 0; i--){
		this.list[i].x = this.list[i-1].x;
		this.list[i].y = this.list[i-1].y;
		// console.log(this.list[i]);
	}
}

Trail.prototype.draw = function (context) {
	Entity.prototype.draw.call(this, context);
	for (var i = 1; i < length; i++)
		this.list[i].draw(context);
}