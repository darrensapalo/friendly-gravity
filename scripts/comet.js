function Comet (){
	this.visible = true;
	this.xAcceleration = 0;
	this.yAcceleration = 0;
	this.xVelocity = 0;
	this.yVelocity = 0;
	
	this.type = 0;
	this.maxForce = 0.03;
	this.force = this.maxForce;
	this.maxMovement = 2.5;
	
	this.trailListAmount = 35;
	this.trailListMinimum = 10;
	this.startOpacityReduction = false;
	this.opacityCounter = 10;
	this.isSuckedIn = false;
	this.trailList = new Array();
	
	// variations of sizes on asteroids
	
	this.PrepareComet = function(type){
		var textureList = new Array();
		textureList.push("asteroid");
		textureList.push("asteroidsmall");
		textureList.push("asteroidglow");
		textureList.push("comethead");
		textureList.push("tail1");
		textureList.push("tail2");
		textureList.push("tail3");
		textureList.push("tail4");

		
		/* Randomly select a type (parameter)
		   -1 : Random
			0 : Regular asteroid
			1 : Small asteroid
			2 : Glowing asteroid
			3 : Comet
		
		*/
		var index;
		var trail = false;
		if (type == -1 || typeof(type) == "undefined")
			this.type = index = type = Math.floor((Math.random()*4));
		else{
			this.type = index = type;
			trail = true;
		}
		
		// Grabs the required texture
		var texture = game.getImage(textureList[index]);
		
		// Select random spawn point
		do{			
			var x = this.getRandomX();
			var y = this.getRandomY();
		}while(checkIfNearBlackHole(x, y, game.gameScreen.player));
		
		// Determine size
		var width = 72;
		var height = 36;
		
		// If an asteroid, then make it square
		if (type >= 0 && type <= 1){
			width = height = Math.floor(Math.random() * 25) + 25;
		}
		
		this.sprite = new Sprite(texture,x,y,width,height, 1, 1, 1);
		
		if (type >= 2 && !trail)
		{
			this.PrepareTail(type, x, y);
		}
	}
	
	this.PrepareTail = function(cometType, x, y) {
		var type;
		var scale = 1;
		
		if (cometType == 2)
			type = cometType;
		else if (cometType == 3)
			type = Math.floor(Math.random() * 4) + 4;
			
		
		
		for (var i = 0; i < Math.floor(Math.random() * (this.trailListAmount - this.trailListMinimum)) + this.trailListMinimum; i++)
		{
			var trail = new Trail();
			trail.initialize(type, x, y, 1, 1);
			
			trail.UpdatePosition(this.sprite.x, this.sprite.y);
			trail.sprite.scalex = scale;
			trail.sprite.scaley = scale;
			trail.sprite.opacity = (this.trailListAmount - i) / this.trailListAmount;
			scale -= 1 / this.trailListAmount;
			
			this.trailList.push(trail);
		}
		
	}
	
	this.initialize = function(type) {
	
		// Prepares position and texture
		this.PrepareComet(type);
		
		// Initialize values
		this.xVelocity = this.yVelocity = 0;
		this.xAcceleration = this.yAcceleration = 0;
		this.force = this.maxForce;


		this.decreasedScoreText = new TextSprite("-" + DECREASE_SCORE, this.sprite.x, this.sprite.y, 100, 40, Color.black, "#CC0000");
	}
	
	this.isAsteroid = function()
	{
		return this.type >= 0 && this.type <= 2;
	}
	
	function checkIfNearBlackHole(x, y, player)
	{
		return (Math.sqrt(Math.pow(x - player.sprite.x, 2) + Math.pow(y - player.sprite.y, 2)) < 100);
	}
		
	this.getRandomX = function(){
		return Math.random() * game.canvas.width - 50;
	}
	
	this.getRandomY = function(){
		return Math.random() * game.canvas.height - 50;
	}
	
	this.hasTrail = function(){
		return this.type >= 2;
	}
	
	
	this.Jiggle = function(){
		this.force = -0.35;
	}
	
	this.Rotate = function(){
		this.sprite.rotation += Math.PI / 2;
	}
	
	this.draw = function (context) {
	if (game.displayCometTrail && this.hasTrail())	
		for (var i = this.trailList.length - 1; i >= 0; i--)
			this.trailList[i].draw(context);
			
			
		this.sprite.draw(context);
		this.drawDecreaseScore(context);
	}
	
	this.IncreasePlayerScore = function() { 
		if (!game.gameScreen.gameOver)
		game.gameScreen.player.score += Math.random() * game.points; 
	}
	
	this.ApplyPhysics = function(player){
	
		var sprite = this.sprite;
		var playerSprite = player.sprite;
		
		

		//this.CometAcceleration(0.005, playerSprite);
		
		
		// Change position
		this.sprite.x += this.xVelocity;
		this.sprite.y += this.yVelocity;
		
		
		// Change velocity
		this.xVelocity += this.xAcceleration;
		this.yVelocity += this.yAcceleration;
		
		// this.sprite.rotation = this.getAngle();
		
		// /* Perfect orbit
		
		this.xAcceleration = playerSprite.x - this.sprite.x;
		this.yAcceleration = playerSprite.y - this.sprite.y;
		
		// Get magnitude
		var magnitude = Math.sqrt(Math.pow(this.xAcceleration, 2) + Math.pow(this.yAcceleration, 2));
		
		if (this.isSuckedIn)
			this.force = 1 / game.gameScreen.player.currentScale;
		else if (this.force < this.maxForce)
			this.force += game.speed;
		else if (this.force >= this.maxForce)
			this.force = this.maxForce;
			
			
		
		// Update acceleration
		this.xAcceleration = this.xAcceleration / magnitude * this.force;
		this.yAcceleration = this.yAcceleration / magnitude * this.force;

		if (this.xVelocity > this.maxMovement)
			this.xVelocity = this.maxMovement;
		if (this.yVelocity > this.maxMovement)
			this.yVelocity = this.maxMovement;

		if (this.xVelocity < -this.maxMovement)
			this.xVelocity = -this.maxMovement;
		if (this.yVelocity < -this.maxMovement)
			this.yVelocity = -this.maxMovement;


		
		if (this.trailList.length == 0) return;
		// Update head of tail
		this.trailList[0].sprite.x = this.sprite.x;
		this.trailList[0].sprite.y = this.sprite.y;

	}
	
	this.update = function (player){
		this.IncreasePlayerScore();
		this.ApplyPhysics(player);
		if (game.displayCometTrail  && this.hasTrail())
			this.updateTrail();
		this.CometVelocityLimits();
		this.Rotate();
		if (!player.isTutorial)
		this.CheckIfCaught(player);
		this.ReduceOpacity();

		if (this.isSuckedIn)
			this.updateDecreasedScore();
		
	}
	
	this.ReduceOpacity = function() { 
		if (!this.startOpacityReduction) return;
		
		if (this.opacityCounter < 0)
		{
			if (this.sprite.opacity <= 0){
				this.sprite.opacity = 0;
				game.gameScreen.removeComet(this);
			}else
				this.sprite.opacity -= 0.05;
				
			if (this.hasTrail())
				for (var i = 0; i < this.trailList.length; i++)
					this.trailList[i].ReduceOpacity();
		}
		else
			this.opacityCounter -= 1;
	}
	
	this.Rotate = function() {
		this.sprite.rotation += (this.xAcceleration > 0 ) ? 0.01 : -0.01;
		this.sprite.rotation += (this.yAcceleration < 0 ) ? 0.01 : -0.01;
	}
	
	this.updateTrail = function(){
		if (this.trailList.length == 0) return;
		for (var i = this.trailList.length - 1; i > 0; i--)
		{
			var x, y;
			x = this.trailList[i-1].sprite.x;
			y = this.trailList[i-1].sprite.y;
			this.trailList[i].UpdatePosition(x, y);
		}
	}
	
	this.updatePosition = function(x, y){
		this.sprite.x = x;
		this.sprite.y = y;


	}
	
	this.CometAcceleration = function(){
		var cometMoveSpeed = game.gameScreen.player.cometMovementSpeed;
		
		// Comet acceleration settings
		if (this.sprite.x < playerSprite.x)
			this.xAcceleration += cometMoveSpeed;
		if (this.sprite.x > playerSprite.x)
			this.xAcceleration -= cometMoveSpeed;

		if (this.sprite.y < playerSprite.y)
			this.yAcceleration += cometMoveSpeed;
		if (this.sprite.y > playerSprite.y)
			this.yAcceleration -= cometMoveSpeed;
	}
	
	this.CometVelocityLimits = function(){
		var maxCometSpeed = game.gameScreen.player.MAX_ACCELERATION;
		
		// Acceleration limits

		if (this.xVelocity > maxCometSpeed)
			this.xVelocity = maxCometSpeed;
			
		if (this.xVelocity < -maxCometSpeed)
			this.xVelocity = -maxCometSpeed;
			
		if (this.yVelocity > maxCometSpeed)
			this.yVelocity = maxCometSpeed;
			
		if (this.yVelocity < -maxCometSpeed)
			this.yVelocity = -maxCometSpeed;
	}
	
	this.CheckIfCaught = function(player){
	if (this.sprite.CollidesWith(player.sprite) && this.isSuckedIn == false) {
			player.getHit();
			this.isSuckedIn = true;
			this.startOpacityReduction = true;
			this.decreasedScoreText.ChangeOrigin();
			this.decreasedScoreText.x = this.sprite.x - 50;
			this.decreasedScoreText.y = this.sprite.y - 25;
			player.score -= DECREASE_SCORE;
			if (player.score < 0)
				player.score = 0;
		}
	}

	this.updateDecreasedScore = function() {
		this.decreasedScoreText.y -= 1;
		this.decreasedScoreText.opacity *= 0.99;
	}

	this.drawDecreaseScore = function(context) {
		if (this.isSuckedIn)
			this.decreasedScoreText.draw(context);

	}
	
}