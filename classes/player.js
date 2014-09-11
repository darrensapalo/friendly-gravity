function Player (){
	this.sprite;
	this.anotherSprite;
	this.xAcceleration = 0;
	this.yAcceleration = 0;
	this.score = 0;
	this.isGameOver = false;
	this.countdown = true;
	this.playerSpeed = 3;
	
	this.SHOCKWAVE_PULSE = 0.2; // This can increase the reflect of the stars
	this.cometMovementSpeed = 0.05; // This can decrease the acceleration of the stars
	this.MAX_ACCELERATION = 3; // This can be decreased to slow down the stars
	
	this.hasPulseNova = false;
	this.injectionTimeout = 0;
	
	this.maxOpacity = 0.98;
	this.minOpacity = 0.54;
	
	this.pulseScaling = 40;
	this.pulseOutwards = true;
	this.pulseScalingCounter = this.pulseScaling;
	
	this.playerSize = 50;
	
	this.currentScale = 1;
	this.maxScale = 3;
	this.opacityIncreasing = false;

	this.baseShockwaveCooldown = myGame.baseShockwaveCooldown;
		
	this.Draw = function (context) {
		if (this.sprite.visible) {
			this.sprite.Draw(context);
			this.anotherSprite.Draw(context);
		}
	}
	
	this.SetScale = function (scale)
	{
		this.sprite.scalex = scale;
		this.sprite.scaley = scale;
		this.sprite.ChangeOrigin();
		this.anotherSprite.scalex = scale * 0.8;
		this.anotherSprite.scaley = scale * 0.8;
	}
	
	this.getHit = function ()
	{
		if (this.currentScale > this.maxScale)this.currentScale = this.maxScale;
		this.SetScale(this.currentScale += 0.01);
		if (myGame.hasSounds && !DISABLE_MUSIC)
			vortexSFX.play();
		
	}
	
	this.Initialize = function() {
		this.sprite = new Sprite(myGame.GetImage("player"), myGame.canvas.width / 2, myGame.canvas.height / 2, this.playerSize, this.playerSize, 1, 1, 1);
		this.anotherSprite = new Sprite(myGame.GetImage("player"), myGame.canvas.width / 2, myGame.canvas.height / 2, this.playerSize, this.playerSize, 1, 1, 1);
		this.sprite.ChangeOrigin();
		this.sprite.opacity = 0.74;
	}
	
	this.RotatePlayer = function(){ this.sprite.rotation -= Math.PI / 86; this.anotherSprite.rotation += Math.PI / 86; }
	
	this.MovePlayer = function() {
		var player = this.sprite;
		var shadow = this.anotherSprite;
		var playerSpeed = this.playerSpeed;
		var nextX = player.x;
		var nextY = player.y;

		if (isLeft){
			nextX -= playerSpeed;
			myGame.gameScreen.mapx += 0.575;
		}
		if (isRight){
			nextX += playerSpeed;
			myGame.gameScreen.mapx -= 0.575;
		}
		if (isUp){
			nextY -= playerSpeed;
			myGame.gameScreen.mapy += 0.575;
		}
		if (isDown){
			nextY += playerSpeed;
			myGame.gameScreen.mapy -= 0.575;
		}
		
		if (nextX < 50)
			nextX = 50;
		else if (nextX > myGame.canvas.width - 50)
			nextX = myGame.canvas.width - 50;
			
		if (nextY < 50)
			nextY = 50;
		else if (nextY > myGame.canvas.height - 50)
			nextY = myGame.canvas.height - 50;
			
		shadow.x = player.x = nextX;
		shadow.y = player.y = nextY;
		shadow.opacity = 0.5;
	}
	
	this.CheckGameOver = function() {
		if (this.timer <= 0){
			// this.sprite.visible = false;
			this.isGameOver = true;
		}
	}
	
	this.Update = function(){
		this.CheckIfInjection();
		this.RotatePlayer();
		this.MovePlayer();
		this.CheckGameOver();
		this.UpdateScale();
		this.UpdateOpacity();
	}
	
	this.UpdateOpacity = function () {
		
		if (this.sprite.opacity > this.maxOpacity){
			this.sprite.opacity = this.maxOpacity;
			this.opacityIncreasing = false;
		}else if (this.sprite.opacity < this.minOpacity)
		{
			this.sprite.opacity =  this.minOpacity;
			this.opacityIncreasing = true;
		}
		
		if (this.opacityIncreasing)
			this.sprite.opacity += 0.005;
		else
			this.sprite.opacity -= 0.005;
	}
	
	this.UpdateScale = function() {
	this.pulseScalingCounter -= 1;
		if (this.pulseScalingCounter <= 0){	
			this.pulseOutwards = !this.pulseOutwards;
			this.pulseScalingCounter = this.pulseScaling;
		}
		
		
		if (this.pulseOutwards)
		{
			this.sprite.scalex += 0.003;
			this.sprite.scaley += 0.003;
		}else{
			this.sprite.scalex -= 0.003;
			this.sprite.scaley -= 0.003;
		}
	}
	
	
	function jitter(s){
		return ((Math.random() > 5) ? 1 : -1 ) * Math.random() * s * 2;
	}
	
	this.getShockwaveCooldown = function (){
		return this.baseShockwaveCooldown + Math.random() * 2000;
	}


	this.CheckIfInjection = function(){

		this.injectionTimeout -= myGame.gameScreen.elapsedMs;
		
		if (this.isTutorial)
			var comets = myGame.tutorialScreen.asteroids;
		else
			var comets = myGame.gameScreen.comets;
		
		if (this.injectionTimeout <= 0)
			this.hasPulseNova = true;

		if (isSpace && this.hasPulseNova){
			if (myGame.hasSounds)
				shockwaveSFX.play();
			this.hasPulseNova = false;
			this.injectionTimeout = this.getShockwaveCooldown();
			for (var i = 0; i < comets.length; i++)
			{
				var currentComet = comets[i];
				currentComet.xAcceleration = -currentComet.xAcceleration + jitter(currentComet.xAcceleration);
				currentComet.yAcceleration = -currentComet.yAcceleration + jitter(currentComet.yAcceleration);
				
				currentComet.xAcceleration *= this.SHOCKWAVE_PULSE;
				currentComet.yAcceleration *= this.SHOCKWAVE_PULSE;
				currentComet.Jiggle();
			}
		}
		/*
		if (isSpace){
		isSpace = false;
			for(var i=0; i < comets.length; i++){
				var v = comets[i];
				v.Rotate();
			}
		}
		*/
	}
}