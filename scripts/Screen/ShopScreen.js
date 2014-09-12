function ShopScreen(game){
	this.game = game;
	this.countdown = true;
	this.countdownTimeout = 0;
	this.timerTimeout;
	this.updateTimers;
		
	this.elapsedGameMilliseconds = 0;
	this.elapsedMs = 33;
	

	
	this.initialize = function () {
		this.background = new Background();
		
		var x, y;
		x = 250;
		y = 0;
	
		x = 50;
		y = 380;
		this.newGame = new TextSprite("Reset", x + 20, y + 20, 255, 40, Color.black, Color.light_gray);
		this.newGame2 = new Sprite("Button", x, y, 255, 80, 1);
		

		x += 250;
		y = 380;
		this.returnMainMenu = new TextSprite("Main menu", x + 47, y + 20, 200, 40, Color.black, Color.light_gray);
		this.returnMainMenu2 = new Sprite("Button", x, y, 255, 80, 1);
		
		x += 250;
		this.shopButtonCaption = new TextSprite("Shopping", x + 47, y + 20, 200, 40, Color.black, Color.light_gray);
		this.shop = new Sprite("shopButton", x, y, 255, 80, 1);
		
		
		x = 150;
		y = 70;
		this.panel = new Sprite("panel", x, y, 489, 306, 0.8);
		
		y += 20;
		this.panelText = new TextSprite("Current progress:", x + 150, y, 200, 40);
		y += 40;
		this.panelText2 = new TextSprite("Accumulated points: ", x + 150, y, 200, 40);
		y += 40;
		this.panelText3 = new TextSprite("High score: ", x + 150, y, 200, 40);
		
	}

	this.draw = function(context) {
			// Background image
			this.background.draw(context);
			
			// Player
			// this.player.sprite.draw(context);
			
			// Stars
			// for(var i=0;i<comets.length;i++)
			//	comets[i].sprite.draw(context);


//			this.welcomeMessage.draw(context);
			
			this.panel.draw(context);
			this.panelText.draw(context);
			this.panelText2.draw(context);
			this.panelText3.draw(context);
			
			this.newGame2.draw(context);
			this.newGame.draw(context);
			
			this.returnMainMenu2.draw(context);
			this.returnMainMenu.draw(context);

			this.shop.draw(context);
			this.shopButtonCaption.draw(context);
			
			
	}
	
	this.update = function() {
		this.updateTimer();
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
		if (this.returnMainMenu2.contains(x, y) || isEnter){
			this.game.changeScreen(0);
			this.game.gameScreen.initialize();
			this.game.pressX = this.game.pressY = typeof 'undefined';
		}
	}
	
		this.Reset = function(x, y){
		if (typeof x == 'undefined' || typeof y == 'undefined') return;
		if (this.newGame.contains(x, y)){
			this.game.changeScreen(0);
			this.game.ResetData();
			this.game.pressX = this.game.pressY = typeof 'undefined';
		}
	}

	this.CheckIfShop = function(x, y){
		if (typeof x == 'undefined' || typeof y == 'undefined') return;
		if (this.shop.contains(x, y)){
			this.game.changeScreen(6);
			this.game.pressX = this.game.pressY = 0;
			this.game.developScreen.initialize();
		}
	}
	
	this.updateTimerFunc = new function(){
		this.updateTimers = true;
	}
	
			
	this.updateTimer = function(){
		if (this.updateTimers){
			this.elapsedGameMilliseconds += 33;
			this.updateTimers = false;
			this.timerTimeout = setTimeout(this.updateTimerFunc, 33);
		}

	}
}