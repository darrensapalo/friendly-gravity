function ShopScreen(game){
	Screen.call(this, game);
}	

ShopScreen.prototype = Object.create(Screen.prototype);
ShopScreen.prototype.constructor = ShopScreen;

ShopScreen.prototype.initialize = function () {
	this.background = new Background();
	
	var x, y;
	x = 250;
	y = 0;
	
	x = 50;
	y = 380;
	this.newGame = new TextSprite("Reset", x + 20, y + 20, 255, 40, Color.black, Color.light_gray);
	this.newGame2 = new Sprite("button", x, y, 255, 80, 1);
	

	x += 250;
	y = 380;
	this.returnMainMenu = new TextSprite("Main menu", x + 47, y + 20, 200, 40, Color.black, Color.light_gray);
	this.returnMainMenu2 = new Sprite("button", x, y, 255, 80, 1);
	
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

ShopScreen.prototype.draw = function(context) {
	this.background.draw(context);
	
	
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

ShopScreen.prototype.update = function() {
	this.updateTimer();
	var x = this.game.pressX;
	var y = this.game.pressY;
	this.CheckIfReturnMainMenu(x, y);
	this.Reset(x, y);
	this.CheckIfShop(x, y);
	this.panelText2.text = "Accumulated points: " + this.game.cash + ".";
	this.panelText3.text = "High score: " + this.game.highScore + ".";
	
}

ShopScreen.prototype.CheckIfReturnMainMenu = function(x, y){
	if (this.game.InputHandler.isPressed(InputKey.ENTER) && (typeof x == 'undefined' || typeof y == 'undefined')) return;
	if (this.returnMainMenu2.contains(x, y) || this.game.InputHandler.isPressed(InputKey.ENTER)){
		this.game.changeScreen(0);
		this.game.gameScreen.initialize();
		this.game.pressX = this.game.pressY = typeof 'undefined';
	}
}

ShopScreen.prototype.Reset = function(x, y){
	if (typeof x == 'undefined' || typeof y == 'undefined') return;
	if (this.newGame.contains(x, y)){
		this.game.changeScreen(0);
		session.reset();
		this.game.pressX = this.game.pressY = typeof 'undefined';
	}
}

ShopScreen.prototype.CheckIfShop = function(x, y){
	if (typeof x == 'undefined' || typeof y == 'undefined') return;
	if (this.shop.contains(x, y)){
		this.game.changeScreen(6);
		this.game.pressX = this.game.pressY = 0;
		this.game.developScreen.initialize();
	}
}