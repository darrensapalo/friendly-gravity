function ShopScreen(game){
	Screen.call(this, game);
}	

ShopScreen.prototype = Object.create(Screen.prototype);
ShopScreen.prototype.constructor = ShopScreen;

ShopScreen.prototype.initialize = function () {
	var SM = this.game.ScreenManager;
	this.background = new Background();
	this.panel = SM.createPanel();

	var buttonSet = this.game.ScreenManager.createButtons();
	
	this.reset = buttonSet.texts[0];
	this.resetButton = buttonSet.buttons[0];
	this.resetButton.hoverSprite.img = this.game.ImageLoader.images["buttonReset"];
	this.reset.text = "Reset";
	
	this.returnMainMenu = buttonSet.texts[1];
	this.returnMainMenuButton = buttonSet.buttons[1];
	this.returnMainMenu.text = "Main menu";
	
	this.shop = buttonSet.texts[2];
	this.shopButton = buttonSet.buttons[2];
	this.shop.text = "Shop";
	var x, y;
	x = 150;
	y = 90;

	this.panelText = new TextSprite("Current progress:", x + 150, y, 200, 40);
	y += 40;
	this.panelText2 = new TextSprite("Accumulated points: ", x + 150, y, 200, 40);
	y += 40;
	this.panelText3 = new TextSprite("High score: ", x + 150, y, 200, 40);

	this.panelText2.text = "Accumulated points: " + this.game.cash + ".";
	this.panelText3.text = "High score: " + this.game.highScore + ".";

	
}

ShopScreen.prototype.draw = function(context) {
	/* The panel */
	this.background.draw(context);
	this.panel.draw(context);

	/* The content */
	this.panelText.draw(context);
	this.panelText2.draw(context);
	this.panelText3.draw(context);
		
	/* The interface */
	this.resetButton.draw(context);
	this.reset.draw(context);
	
	this.returnMainMenuButton.draw(context);
	this.returnMainMenu.draw(context);

	this.shopButton.draw(context);
	this.shop.draw(context);
}

ShopScreen.prototype.update = function() {
	this.resetButton.update();
	this.shopButton.update();
	this.returnMainMenuButton.update();
}

ShopScreen.prototype.onClick = function(p) {
	var SM = this.game.ScreenManager;
	if (this.resetButton.contains(p)){
		session.reset();
		SM.changeScreen("MainMenuScreen");
	}

	else if (this.returnMainMenuButton.contains(p)){
		SM.changeScreen("MainMenuScreen");
	}

	else if (this.shopButton.contains(p)){
		SM.changeScreen("ShopScreen");
	}
}