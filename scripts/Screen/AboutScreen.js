function AboutScreen(game){
	this.game = game;
	this.countdown = true;
	this.countdownTimeout = 0;
	this.timerTimeout;
	this.updateTimers;

	this.elapsedGameMilliseconds = 0;
	this.elapsedMs = 33;
}	


AboutScreen.prototype.initialize = function () {
	this.background = new Background();
	var x, y;
	x = 273;
	y = 380;
	this.returnToMenu = new TextSprite("Main menu", x + 20, y + 20, 255, 40);
	this.returnToMenu2 = new Sprite("button", x, y, 255, 80, 1);


	x = 150;
	y = 70;
	this.panel = new Sprite("panel", x, y, 489, 306, 0.8);

	y += 20;
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
			// Background image
			this.background.draw(context);
			

			this.panel.draw(context);
			this.panelText.draw(context);
			this.panelText2.draw(context);
			this.panelText3.draw(context);
			this.panelText3half.draw(context);
			this.panelText4.draw(context);
			this.panelText4half.draw(context);

			this.returnToMenu2.draw(context);
			this.returnToMenu.draw(context);


		}

		AboutScreen.prototype.update = function() {
			this.updateTimer();
			this.CheckIfReturnMainMenu(this.game.pressX, this.game.pressY);
		}

		AboutScreen.prototype.checkIfReturnMainMenu = function(x, y){
			if (!this.game.InputHandler.isPressed(InputKey.ENTER) && (typeof x == 'undefined' || typeof y == 'undefined')) return;
			if (this.returnToMenu.contains(x, y) || this.game.InputHandler.isPressed(InputKey.ENTER)){
				this.game.changeScreen(0);
				this.game.gameScreen.initialize();
				this.game.pressX = this.game.pressY = typeof 'undefined';
			}
		}

		AboutScreen.prototype.updateTimerFunc = new function(){
			this.updateTimers = true;
		}


		AboutScreen.prototype.updateTimer = function(){
			if (this.updateTimers){
				this.elapsedGameMilliseconds += 33;
				this.updateTimers = false;
				this.timerTimeout = setTimeout(this.updateTimerFunc, 33);
			}

		}