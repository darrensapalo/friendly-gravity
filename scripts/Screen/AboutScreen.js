function AboutScreen(game){
	this.game = game;
}	

AboutScreen.prototype.initialize = function () {
	var SM = this.game.ScreenManager;
	this.background = new Background();
	this.panel = SM.createPanel();

	var buttonSet = this.game.ScreenManager.createButtons();
	
	this.returnToMainMenu = buttonSet.texts[2];
	this.returnToMainMenuButton = buttonSet.buttons[2];
	this.returnToMainMenu.text = "Main Menu";

	var x, y;
	x = 150;
	y = 90;
	
	this.panelText = new TextSprite("De La Salle University", x + 150, y, 200, 40);
	y += 20;
	this.panelText2 = new TextSprite("Game Development Lab", x + 150, y, 200, 40);
	y += 40;
	this.panelText3 = new TextSprite("Developed by", x + 150, y, 200, 40);
	y += 30;
	this.panelText3half = new TextSprite("Darren Sapalo", x + 150, y, 200, 40);

	y += 40;
	this.panelText4 = new TextSprite("Concept and art by", x + 150, y, 200, 40);
	y += 30;
	this.panelText4half = new TextSprite("Loren Rosales", x + 150, y, 200, 40);

}

AboutScreen.prototype.draw = function(context) {
	/* panel */
	this.background.draw(context);
	this.panel.draw(context);

	/* content */
	this.panelText.draw(context);
	this.panelText2.draw(context);
	this.panelText3.draw(context);
	this.panelText3half.draw(context);
	this.panelText4.draw(context);
	this.panelText4half.draw(context);

	/* interface */
	this.returnToMainMenuButton.draw(context);
	this.returnToMainMenu.draw(context);


}

AboutScreen.prototype.update = function() {
	this.returnToMainMenuButton.update();
}

AboutScreen.prototype.onClick = function(p){
	var SM = this.game.ScreenManager;
	if (this.returnToMainMenuButton.contains(p)){
		SM.changeScreen("MainMenuScreen");
	}
}
