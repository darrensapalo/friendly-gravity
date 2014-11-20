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

	this.position = new Vector2D(50, canvas.height / 2);
	this.sprite = new CenteredSprite(sprite, this.position.x, this.position.y, width, height, opacity, scalex, scaley);

	this.sprite.rotation = Math.PI * 3 / 2;

	this.rotateVelocity = 0;
	this.shootDelay = 300;
	this.blasters = [];

	this.hp = Config.game.maxHP;
	this.fuel = Config.game.goalFuel;
}

Player.prototype.update = function(){
	Entity.prototype.update.call(this);
	this.rotatePlayer();
	this.movePlayer();
	this.bound();
	this.acceleration = this.acceleration.smultiply(0.4);
	this.updateBlasters();

}


Player.prototype.updateBlasters = function() {
	this.shootDelay -= 33;
	for (var i = this.blasters.length - 1; i >= 0; i--) {
		this.blasters[i].update();
	};

	for (var i = 0; i < this.blasters.length; i++)
	{
		if( this.blasters[i].position.x > game.ScreenManager.canvas.width)
			this.blasters.splice( i, 1 );
	}
};
	

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
	for (var i = this.blasters.length - 1; i >= 0; i--) {
		this.blasters[i].draw(context);
	};
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
	this.rotateVelocity *= 0.9;
}

Player.prototype.shoot = function() {
	
	var b = new Blaster(this.game, this.world, this.position.add(new Vector2D(30, 0)), this.rotation);
	this.blasters.push(b);
	this.shootDelay = 300;
};

Player.prototype.movePlayer = function() {
	var blackhole = this.sprite;

	var M = new MathHelper();
	var speed = Config.game.player.movement.velocity;
	var maxSpeed = Config.game.blackhole.movement.maxAcceleration;

	var InputHandler = this.game.InputHandler;
	var v;

	if (InputHandler.get(InputKey.SPACE).isPressed) {
		if (this.shootDelay <= 0)
			this.shoot();
	};

	if (InputHandler.get(InputKey.LEFT).isPressed) {
		var isShift = InputHandler.get(InputKey.CTRL).isPressed;
		v = new Vector2D(-speed, 0);
		this.position = this.position.add(v);
		this.fuel -= 0.02;
		
	};

	if (InputHandler.get(InputKey.RIGHT).isPressed) {
		var isShift = InputHandler.get(InputKey.CTRL).isPressed;
		v = new Vector2D(speed, 0);
		this.position = this.position.add(v);
		this.fuel -= 0.02;
	};

	if (InputHandler.get(InputKey.UP).isPressed) {
		v = new Vector2D(0, -speed);
		this.position = this.position.add(v);
		this.world.velocity = this.world.velocity.add(v.smultiply(-0.05));
		this.fuel -= 0.02;
	};

	if (InputHandler.get(InputKey.DOWN).isPressed) {
		
		v = new Vector2D(0, speed);
		this.position = this.position.add(v);
		this.world.velocity = this.world.velocity.add(v.smultiply(-0.05));
		this.fuel -= 0.02;
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