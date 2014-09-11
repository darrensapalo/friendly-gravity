function ShopScreen(game){
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
		


		x = 50;
		y = 380;
		this.newGame = new TextSprite("Reset", x + 20, y + 20, 255, 40, blackColor, lightColor);
		this.newGame2 = new Sprite(button, x, y, 255, 80, 1);
		this.newGame2.SetBasicOrigin();
		

		x += 250;
		y = 380;
		this.returnMainMenu = new TextSprite("Main menu", x + 47, y + 20, 200, 40, blackColor, lightColor);
		this.returnMainMenu2 = new Sprite(button, x, y, 255, 80, 1);
		this.returnMainMenu2.SetBasicOrigin();
		
		x += 250;
		this.shopButtonCaption = new TextSprite("Shopping", x + 47, y + 20, 200, 40, blackColor, lightColor);
		this.shop = new Sprite(myGame.GetImage("shopButton"), x, y, 255, 80, 1);
		this.shop.SetBasicOrigin();
		
		
		x = 150;
		y = 70;
		var panelTexture = myGame.GetImage("panel");
		this.panel = new Sprite(panelTexture, x, y, 489, 306, 0.8);
		
		y += 20;
		this.panelText = new TextSprite("Current progress:", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		y += 40;
		this.panelText2 = new TextSprite("Accumulated points: ", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		y += 40;
		this.panelText3 = new TextSprite("High score: ", x + 150, y, 200, 40, backgroundColor, foregroundColor);
		
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
			
			this.newGame2.Draw(context);
			this.newGame.Draw(context);
			
			this.returnMainMenu2.Draw(context);
			this.returnMainMenu.Draw(context);

			this.shop.Draw(context);
			this.shopButtonCaption.Draw(context);
			
			
	}
	
	this.Update = function() {
		this.UpdateTimer();
		var x = this.game.pressX;
		var y = this.game.pressY;
		this.CheckIfReturnMainMenu(x, y);
		this.Reset(x, y);
		this.CheckIfShop(x, y);
		this.panelText2.text = "Accumulated points: " + this.game.cash + ".";
		this.panelText3.text = "High score: " + this.game.highScore + ".";
		
	}
	
	this.CheckIfReturnMainMenu = function(x, y){
		if (!isEnter && (typeof x == 'undefined' || typeof y == 'undefined')) return;
		if (this.returnMainMenu2.IsInside(x, y) || isEnter){
			this.game.ChangeScreen(0);
			this.game.gameScreen.Initialize();
			this.game.pressX = this.game.pressY = typeof 'undefined';
		}
	}
	
		this.Reset = function(x, y){
		if (typeof x == 'undefined' || typeof y == 'undefined') return;
		if (this.newGame.IsInside(x, y)){
			this.game.ChangeScreen(0);
			this.game.ResetData();
			this.game.pressX = this.game.pressY = typeof 'undefined';
		}
	}

	this.CheckIfShop = function(x, y){
		if (typeof x == 'undefined' || typeof y == 'undefined') return;
		if (this.shop.IsInside(x, y)){
			this.game.ChangeScreen(6);
			this.game.pressX = this.game.pressY = 0;
			this.game.developScreen.Initialize();
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