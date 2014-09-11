function AboutScreen(game){
	this.game = game;
	this.countdown = true;
	this.countdownTimeout = 0;
	this.timerTimeout;
	this.updateTimers;
		
	this.elapsedGameMilliseconds = 0;
	this.elapsedMs = 33;
	
	
	
	this.Initialize = function () {
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
		
		
		x = 150;
		y = 70;
		var panelTexture = myGame.GetImage("panel");
		this.panel = new Sprite(panelTexture, x, y, 489, 306, 0.8);
		
		y += 20;
		this.panelText = new TextSprite("De La Salle University", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		y += 20;
		this.panelText2 = new TextSprite("Game Development Lab", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		y += 40;
		this.panelText3 = new TextSprite("Developed by", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		y += 30;
		this.panelText3half = new TextSprite("Darren Sapalo", x + 150, y, 200, 40, backgroundColor, foregroundColor);

		y += 40;
		this.panelText4 = new TextSprite("Concept and art by", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		y += 30;
		this.panelText4half = new TextSprite("Loren Rosales", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		
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
			
			this.panel.Draw(context);
			this.panelText.Draw(context);
			this.panelText2.Draw(context);
			this.panelText3.Draw(context);
			this.panelText3half.Draw(context);
			this.panelText4.Draw(context);
			this.panelText4half.Draw(context);
			
			this.returnToMenu2.Draw(context);
			this.returnToMenu.Draw(context);
			
			
	}
	
	this.Update = function() {
		this.UpdateTimer();
		this.CheckIfReturnMainMenu(this.game.pressX, this.game.pressY);
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