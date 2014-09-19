function Player (game, world){
	Entity.call(this);
	this.game = game;
	this.world = world;
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.initialize = function() {
	var canvas = game.ScreenManager.canvas;
	var scalex = 0.5;
	var scaley = 0.5;
	var opacity = 1;

	var M = new MathHelper();
	var style = M.random(3);

	var sprite, width, height;
	sprite = Ships[style].sprite;
	width = Ships[style].width;
	height = Ships[style].height;

	this.position = new Vector2D(canvas.width / 2, canvas.height / 2);
	this.sprite = new CenteredSprite(sprite, this.position.x, this.position.y, width, height, opacity, scalex, scaley);

	this.rotateVelocity = 0;;
	console.log(this.sprite);

}

Player.prototype.update = function(){
	Entity.prototype.update.call(this);
	this.rotatePlayer();
	this.movePlayer();
	this.bound();
	this.acceleration = this.acceleration.smultiply(0.8);
}

Player.prototype.bound = function (context) {
	var M = new MathHelper();
	
	if (M.outsideClamp(this.position.x, 70, 730) || M.outsideClamp(this.position.y, 70, 410))
	{
		this.velocity.x     *= Config.game.blackhole.movement.spaceBound;
		this.acceleration.x *= Config.game.blackhole.movement.spaceBound;
		this.velocity.y     *= Config.game.blackhole.movement.spaceBound;
		this.acceleration.y *= Config.game.blackhole.movement.spaceBound;
	}

	this.position.x = M.clamp(this.position.x, 40, 760);
	this.position.y = M.clamp(this.position.y, 70, 440);
}

Player.prototype.draw = function (context) {
	Entity.prototype.draw.call(this, context);
}

Player.prototype.getHit = function ()
{
	if (this.currentScale > this.maxScale)this.currentScale = this.maxScale;
	this.setScale(this.currentScale += 0.01);
	this.game.AudioManager.play("vortex");
}


Player.prototype.rotatePlayer = function()
{
	this.sprite.rotation += this.rotateVelocity;
	this.rotateVelocity *= 0.96;
}

Player.prototype.movePlayer = function() {
	var blackhole = this.sprite;

	var M = new MathHelper();
	var speed = 25; //Config.game.blackhole.movement.acceleration;
	var maxSpeed = Config.game.blackhole.movement.maxAcceleration;

	var InputHandler = this.game.InputHandler;


	if (InputHandler.get(InputKey.LEFT).isPressed) {
		var isCtrl = InputHandler.get(InputKey.CTRL).isPressed;
		var determinedRotationVelocity = (isCtrl) ? Math.PI / 1700 : Math.PI / 400;

		// change rotation
		this.rotateVelocity -= determinedRotationVelocity;
		this.world.mapx += 0.875;
	};

	if (InputHandler.get(InputKey.RIGHT).isPressed) {
		var isCtrl = InputHandler.get(InputKey.CTRL).isPressed;
		var determinedRotationVelocity = (isCtrl) ? Math.PI / 1700 : Math.PI / 400;

		this.rotateVelocity += determinedRotationVelocity;
		this.world.mapx -= 0.875;
	};

	if (InputHandler.get(InputKey.UP).isPressed) {
		var rotation = this.rotation;
		var v = new Vector2D(Math.cos(rotation), Math.sin(rotation)).smultiply(0.2);
		// accelerate
		this.acceleration = this.acceleration.add(v);
		
		this.world.mapy += 0.875;
	};

	if (InputHandler.get(InputKey.DOWN).isPressed) {
		// decelerate
		this.world.mapy -= 0.875;
	};
}

Player.prototype.jitter = function(s){
	return ((Math.random() > 5) ? 1 : -1 ) * Math.random() * s * 2;
}

Object.defineProperty(Player.prototype, "rotation", {
	get : function() {
		if (typeof this.sprite === 'undefined') throw new Error("NullError: Player sprite is not yet defined.");
		return this.sprite.rotation + Math.PI / 2;
	}
});