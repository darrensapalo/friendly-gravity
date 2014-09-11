function TutorialScreen(game){
	this.game = game;
	this.countdown = true;
	this.countdownTimeout = 0;
	this.timerTimeout;
	this.updateTimers;
		
	this.elapsedGameMilliseconds = 0;
	this.elapsedMs = 33;
	
	this.player;
	this.changeOpacity = 1;
	this.asteroids = new Array();
	
	this.Initialize = function () {
		this.player = new Player();
		this.player.Initialize();
		this.player.isTutorial = true;
		this.isDone = false;
		this.type = 0;
	
		var x, y;
		x = 250;
		y = 0;
	
		var button = myGame.GetImage("Button");
		
		var x, y;
		x = 273;
		y = 380;
		this.returnToMenu = new TextSprite("Main menu", x + 20, y + 20, 255, 40, backgroundColor, foregroundColor);
		this.returnToMenu2 = new Sprite(button, x, y, 255, 80, 1);
		this.returnToMenu2.SetBasicOrigin();
		this.spaceDone = 0;
		
		
		x = 150;
		y = 70;
		var panelTexture = myGame.GetImage("panel");
		this.panel = new Sprite(panelTexture, x, y, 489, 306, 0.8);
		
		y += 20;
		this.panelText = new TextSprite("You're a good black hole!", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		y += 20;
		this.panelText2 = new TextSprite("Keep everyone alive", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		y += 20;
		this.panelText2half = new TextSprite("to get more points!", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		y += 40;
		this.panelText3 = new TextSprite("Each object in space", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		y += 20;
		this.panelText3half = new TextSprite("is a multiplier!", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		y += 40;
		this.panelText4 = new TextSprite("Get as much points", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		y += 20;
		this.panelText4half = new TextSprite("in 30 seconds!", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		y += 40;
		this.panelText5 = new TextSprite("Tap or space to do", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		y += 20;
		this.panelText5half = new TextSprite("a shockwave pulse!", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		
		x = 310;
		y = 300;
		this.arrowLeft = new Sprite(myGame.GetImage("arrowLeft"), x, y, 50, 50, 1);
		x += 55;
		this.arrowRight = new Sprite(myGame.GetImage("arrowRight"), x, y, 50, 50, 1);
		x += 55;
		this.arrowUp = new Sprite(myGame.GetImage("arrowUp"), x, y, 50, 50, 1);
		x += 55;
		this.arrowDown = new Sprite(myGame.GetImage("arrowDown"), x, y, 50, 50, 1);
		
		x = 290;
		y = 320;
		this.howToMovement = new TextSprite("arrow keys to move", x, y, 200, 40, backgroundColor, foregroundColor);
		
		this.arrowLeftPressed = new Sprite(myGame.GetImage("arrowLeftPressed"), 400, 240, 50, 50, 1);
		this.arrowRightPressed = new Sprite(myGame.GetImage("arrowRightPressed"), 400, 240, 50, 50, 1);
		this.arrowUpPressed = new Sprite(myGame.GetImage("arrowUpPressed"), 400, 240, 50, 50, 1);
		this.arrowDownPressed = new Sprite(myGame.GetImage("arrowDownPressed"), 400, 240, 50, 50, 1);
		
		
		x = 290;
		y = 320;
		this.howToShockwave = new TextSprite("space bar to shockwave", x, y, 200, 40, backgroundColor, foregroundColor);
		x = 400;
		y = 300;
		this.shockwave = new Sprite(myGame.GetImage("spacebar"), x, y, 305, 70, 1);
		
		this.asteroids = new Array();

		this.panel.SetBasicOrigin();
		
	}

	this.Draw = function(context) {
			// Background image
			context.drawImage(myGame.GetImage("bg1"), 0, 0, 800, 480);
			
			// Player
			// this.player.sprite.Draw(context);
			
			// Stars
			// for(var i=0;i<comets.length;i++)
			//	comets[i].sprite.Draw(context);


//			this.welcomeMessage.Draw(context);
			
			
			if (this.isDone){
				this.panel.Draw(context);
				this.panelText.Draw(context);
				this.panelText2.Draw(context);
				this.panelText2half.Draw(context);
				this.panelText3.Draw(context);
				this.panelText3half.Draw(context);
				this.panelText4.Draw(context);
				this.panelText4half.Draw(context);
				this.panelText5.Draw(context);
				this.panelText5half.Draw(context);
				
				this.returnToMenu2.Draw(context);
				this.returnToMenu.Draw(context);
			} else {
				this.DrawCurrent(this.type, context);
				this.player.Draw(context);
			}
			
			
	}
	
	this.DrawCurrent = function(type, context){
		switch(type){
			case 0:
				this.arrowLeft.Draw(context);
				this.arrowRight.Draw(context);
				this.arrowUp.Draw(context);
				this.arrowDown.Draw(context);
				this.howToMovement.Draw(context);
			break;
			case 1:
				this.howToShockwave.Draw(context);
				this.shockwave.Draw(context);
				this.DrawShockwaveTimer(context);
				this.DrawComets(context);
			break;
		}
	}

	this.DrawShockwaveTimer = function(context) {
		var width = (this.player.baseShockwaveCooldown - this.player.injectionTimeout) /  this.player.baseShockwaveCooldown * 500;

		if (width >= 500)
			width = 500;
		if (width <= 0)
			width = 0;

		var x, y;
		y = 10;
		x = 150;
		context.drawImage(this.game.GetImage("bar"), x, y, width, 25);
		context.drawImage(this.game.GetImage("barHolder"), x, y, 500, 25);
	}
	
	this.Update = function() {
		this.UpdateTimer();
		if (this.isDone){
			this.CheckIfReturnMainMenu(this.game.pressX, this.game.pressY);
		}else{
			this.player.Update();
			this.UpdateCurrent(this.type);
		
		}
	}
	
	this.UpdateCurrent = function (type) {
		switch(type){
			case 0: 
				if (isLeft || isRight || isUp || isDown){
					this.changeType = true;
					}
			break;
			case 1:		
				this.UpdateComets();
			if (isSpace){
				isSpace = false;
				if (this.player.injectionTimeout >= 10000)
					this.spaceDone += 1;
				if (this.spaceDone > 2){
					this.changeType = true;
				}
			}

			

			
			break;
		}
		
		if (this.changeType){
			this.teachMovement(type);
			this.teachShockwave(type);
		
		}
	}
	
	this.teachShockwave = function(type){
		if (type == 1)
		{
			this.changeOpacity -= 0.025;
			if (this.changeOpacity < 0)
				this.changeOpacity = 0;
			
			this.howToShockwave.opacity = this.shockwave.opacity = this.changeOpacity;
			
			if (this.changeOpacity <= 0)
			{
				this.type += 1;
				this.isDone = true;
				this.changeOpacity = 1;
				this.changeType = false;
			}
		}
	}
	
	this.spawnComets = function(){
		for (var i = 0; i < 5; i++){
			var c = new Comet();
			c.Initialize(0);
			this.asteroids.push(c);
		}
	}
	this.UpdateComets = function(){
		for (var i = 0; i < 5; i++){
			this.asteroids[i].Update(this.player);
		}
	}
	
	this.DrawComets = function(context){
		for (var i = 0; i < 5; i++){
			this.asteroids[i].Draw(context);
		}
	}
	
	this.teachMovement = function(type)
	{
		if (type == 0){
			this.changeOpacity -= 0.025;
			if (this.changeOpacity < 0)
				this.changeOpacity = 0;
			
			this.arrowUp.opacity = this.howToMovement.opacity = this.arrowDown.opacity = this.arrowRight.opacity = this.arrowLeft.opacity = this.changeOpacity;
			
			if (this.changeOpacity <= 0)
			{
				this.type += 1;
				this.changeOpacity = 1;
				this.changeType = false;
				this.spawnComets();
			}
		}
	}
	
	this.CheckIfReturnMainMenu = function(x, y){
		if (!isEnter && (typeof x == 'undefined' || typeof y == 'undefined')) return;
		if (this.returnToMenu.IsInside(x, y) || isEnter){
			this.game.ChangeScreen(0);
			this.game.gameScreen.Initialize();
			this.game.pressX = this.game.pressY = typeof 'undefined';
		}
	}
	
	this.updateTimerFunc = new function(){
		this.updateTimers = true;
	}
	
			
	this.UpdateTimer = function(){
		if (this.updateTimers){
			this.elapsedGameMilliseconds += 33;
			this.updateTimers = false;
			this.timerTimeout = setTimeout(this.updateTimerFunc, 33);
		}

	}
}