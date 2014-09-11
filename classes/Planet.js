function Planet (){
	this.visible = true;
	this.xAcceleration = 0;
	this.yAcceleration = 0;
	this.xVelocity = 0;
	this.yVelocity = 0;
	
	this.type = 0;
	this.maxForce = 0.003;
	this.force = this.maxForce;
	this.planetPoints = myGame.pointsRange * 2;
	
	this.startOpacityReduction = false;
	this.opacityCounter = 10;
	this.isSuckedIn = false;
	this.trailList = new Array();
	
	this.stage;
	this.stageCount = 3000;
	this.stageCountReset = 3000;
	this.isTransitioning = false;

	// variations of sizes on asteroids
	
	this.PreparePlanet = function(){
		var planetTexture = new Array();
		planetTexture.push("planet1");
		planetTexture.push("planet2");
		planetTexture.push("planet3");

		var gas1texture = new Array();
		gas1texture.push("planet1-1");
		gas1texture.push("planet2-1");
		gas1texture.push("planet3-1");

		var gas2texture = new Array();
		gas2texture.push("planet1-2");
		gas2texture.push("planet2-2");
		gas2texture.push("planet3-2");

		this.stage = 0;
		this.stageCount = this.stageCountReset;
		this.isTransitioning = false;

		

		this.stage = 0;

		
		/* Randomly select a type (parameter)
			0 : Planet 1
			1 : Planet 2
			2 : Planet 3
		
		*/
		var index;
		var trail = false;
		this.type = index = type = Math.floor((Math.random()*3));
		
		// Select random spawn point
		do{			
			var x = this.getRandomX();
			var y = this.getRandomY();
		}while(checkIfNearBlackHole(x, y, myGame.gameScreen.player));
		
		// Determine size
		var width = 75;
		var height = 75;
		
		// Grabs the required texture
		var texture = myGame.GetImage(planetTexture[type]);
		var gas1texture = myGame.GetImage(gas1texture[type]);
		var gas2texture = myGame.GetImage(gas2texture[type]);

		// Sets the sprites
		this.sprite = new Sprite(texture,x,y,width,height, 1, 1, 1);
		this.gas1sprite = new Sprite(gas1texture,x,y,width,height, 1, 1, 1);
		this.gas2sprite = new Sprite(gas2texture,x,y,width,height, 1, 1, 1);
		this.gas3sprite = new Sprite(gas1texture,x,y,width,height, 1, 1, 1);



	}
		
	this.Initialize = function() {
	
		// Prepares position and texture
		this.PreparePlanet();
		
		this.sprite.opacity = 0.5;
		this.sprite.scalex = 0.2;
		this.sprite.scaley = 0.2;

		this.gas1sprite.scalex = 1.8;
		this.gas1sprite.scaley = 1.8;

		this.gas1sprite.opacity = 0;
		this.gas2sprite.opacity = 0;
		this.gas3sprite.opacity = 0;

		// Initialize values
		this.xVelocity = this.yVelocity = 0;
		this.xAcceleration = this.yAcceleration = 0;
		this.force = this.maxForce;

		this.decreasedScoreText = new TextSprite("-" + DECREASE_SCORE * 5, this.sprite.x, this.sprite.y, 100, 40, blackColor, "#CC0000");
	}

	function checkIfNearBlackHole(x, y, player)
	{
		return (Math.sqrt(Math.pow(x - player.sprite.x, 2) + Math.pow(y - player.sprite.y, 2)) < 100);
	}

	this.getRandomX = function(){
		return Math.random() * myGame.canvas.width - 50;
	}
	
	this.getRandomY = function(){
		return Math.random() * myGame.canvas.height - 50;
	}
	
	
	this.Draw = function (context) {

				
		
		this.gas1sprite.Draw(context);
		this.gas2sprite.Draw(context);
		this.gas3sprite.Draw(context);
		this.sprite.Draw(context);
		

		this.drawDecreaseScore(context);

	}
	
	this.IncreasePlayerScore = function() { 
		if (!myGame.gameScreen.gameOver)
		myGame.gameScreen.player.score += Math.random() * myGame.pointsRange; 
	}
	
	this.ApplyPhysics = function(){
	
		var sprite = this.sprite;
		var playerSprite = myGame.gameScreen.player.sprite;
		
		

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
			this.force = 1 / myGame.gameScreen.player.currentScale;
		else if (this.force < this.maxForce)
			this.force += myGame.starMovementSpeed;
		else if (this.force >= this.maxForce)
			this.force = this.maxForce;
			
			
		
		// Update acceleration
		this.xAcceleration = this.xAcceleration / magnitude * this.force;
		this.yAcceleration = this.yAcceleration / magnitude * this.force;
		
		if (this.trailList.length == 0) return;
		// Update head of tail
		this.trailList[0].sprite.x = this.sprite.x;
		this.trailList[0].sprite.y = this.sprite.y;



	}
	
	this.Update = function (player){
		this.IncreasePlayerScore();
		this.ApplyPhysics();

		this.CometVelocityLimits();
		this.Rotate();
		this.CheckIfCaught();
		this.ReduceOpacity();

		this.UpdateStages();


		this.gas1sprite.x = this.gas2sprite.x = this.gas3sprite.x = this.sprite.x;
		this.gas1sprite.y = this.gas2sprite.y = this.gas3sprite.y = this.sprite.y;

		if (this.isSuckedIn)
			this.updateDecreasedScore();
	}

	this.UpdateStages = function() {
		if (this.isSuckedIn) return;

		if (this.stageCount >= 0){
			this.stageCount -= 1;
		}else{
			this.stage += 1;
			this.stageCount = this.stageCountReset;
		}


		switch(this.stage){
			case 0: 
				// Sprite
				if (this.sprite.opacity < 1)
					this.sprite.opacity += 0.05;
				else
					this.sprite.opacity = 1;
				if (this.sprite.scalex < 1)
					this.sprite.scalex += 0.001;
				else
					this.sprite.scalex = 1;
				if (this.sprite.scaley < 1)
					this.sprite.scaley += 0.001;
				else
					this.sprite.scaley = 1;

				// Gas 1 sprite 

				if (this.gas1sprite.scalex > 1)
					this.gas1sprite.scalex -= 0.001;
				else
					this.gas1sprite.scalex = 1;
				if (this.gas1sprite.scaley > 1)
					this.gas1sprite.scaley -= 0.001;
				else
					this.gas1sprite.scaley = 1;

				// Gas 3 sprite
				if (this.gas3sprite.scalex > 1)
					this.gas3sprite.scalex -= 0.001;
				else
					this.gas3sprite.scalex = 1;
				if (this.gas3sprite.scaley > 1)
					this.gas3sprite.scaley -= 0.001;
				else
					this.gas3sprite.scaley = 1;

				// Gas 1 opacity
				if (this.gas1sprite.opacity < 0.5)
					this.gas1sprite.opacity += 0.005;
				else
					this.gas1sprite.opacity = 0.5;

				// Gas 3 opacity
				if (this.gas3sprite.opacity < 0.5)
					this.gas3sprite.opacity += 0.005;
				else
					this.gas3sprite.opacity = 0.5;

			break;
			case 1: 
				if (this.gas2sprite.opacity < 1)
					this.gas2sprite.opacity += 0.05;
				else
					this.gas2sprite.opacity = 1;
			break;
		}
	}
	
	this.ReduceOpacity = function() { 
		if (!this.startOpacityReduction) return;
		
		if (this.opacityCounter < 0)
		{
			if (this.sprite.opacity <= 0){
				this.sprite.opacity = 0;
				myGame.gameScreen.removePlanet(this);
			}else
				this.sprite.opacity -= 0.05;

		}
		else
			this.opacityCounter -= 1;
	}
	
	this.Rotate = function() {
		this.gas1sprite.rotation += 0.03;
		this.gas2sprite.rotation -= 0.03;
		this.gas3sprite.rotation -= 0.03;
		this.sprite.rotation += 0.03;
	}
	
	
	this.UpdatePosition = function(x, y){
		this.sprite.x = x;
		this.sprite.y = y;
	}
	
	this.CometAcceleration = function(){
		var cometMoveSpeed = myGame.gameScreen.player.cometMovementSpeed;
		
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
		var maxCometSpeed = myGame.gameScreen.player.MAX_ACCELERATION;
		
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
	
	this.CheckIfCaught = function(){
	var player = myGame.gameScreen.player;
	if (this.sprite.CollidesWith(player.sprite) && !this.isSuckedIn) {
			player.getHit();
			this.isSuckedIn = true;
			this.startOpacityReduction = true;

			this.decreasedScoreText.ChangeOrigin();
			this.decreasedScoreText.x = this.sprite.x - 50;
			this.decreasedScoreText.y = this.sprite.y - 25;
			player.score -= DECREASE_SCORE * 5;
			if (player.score < 0)
				player.score = 0;
		}
	}
	
	this.updateDecreasedScore = function() {
		this.decreasedScoreText.y -= 1;
		this.decreasedScoreText.opacity *= 0.98;
	}

	this.drawDecreaseScore = function(context) {
		if (this.isSuckedIn)
			this.decreasedScoreText.Draw(context);

	}
}