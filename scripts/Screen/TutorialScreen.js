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
}



TutorialScreen.prototype.initialize = function()
{
	this.background = new Background();
	this.player = new Player(game);
	this.player.isTutorial = true;
	this.isDone = false;
	this.type = 0;

	var x, y;
	x = 273;
	y = 380;
	this.returnToMenu = new TextSprite("Main menu", x + 20, y + 20, 255, 40);
	this.returnToMenu2 = new Sprite("Button", x, y, 255, 80, 1);
	this.spaceDone = 0;


	x = 150;
	y = 70;
	this.panel = new Sprite("panel", x, y, 489, 306, 0.8);

	y += 20;
	this.panelText = new TextSprite("You're a good black hole!", x + 150, y, 200, 40);
	y += 20;
	this.panelText2 = new TextSprite("Keep everyone alive", x + 150, y, 200, 40);
	y += 20;
	this.panelText2half = new TextSprite("to get more points!", x + 150, y, 200, 40);
	y += 40;
	this.panelText3 = new TextSprite("Each object in space", x + 150, y, 200, 40);
	y += 20;
	this.panelText3half = new TextSprite("is a multiplier!", x + 150, y, 200, 40);
	y += 40;
	this.panelText4 = new TextSprite("Get as much points", x + 150, y, 200, 40);
	y += 20;
	this.panelText4half = new TextSprite("in 30 seconds!", x + 150, y, 200, 40);
	y += 40;
	this.panelText5 = new TextSprite("Tap or space to do", x + 150, y, 200, 40);
	y += 20;
	this.panelText5half = new TextSprite("a shockwave pulse!", x + 150, y, 200, 40);

	x = 310;
	y = 300;
	this.arrowLeft = new Sprite("arrowLeft", x, y, 50, 50, 1);
	x += 55;
	this.arrowRight = new Sprite("arrowRight", x, y, 50, 50, 1);
	x += 55;
	this.arrowUp = new Sprite("arrowUp", x, y, 50, 50, 1);
	x += 55;
	this.arrowDown = new Sprite("arrowDown", x, y, 50, 50, 1);

	x = 290;
	y = 320;
	this.howToMovement = new TextSprite("arrow keys to move", x, y, 200, 40);

	this.arrowLeftPressed = new Sprite("arrowLeftPressed", 400, 240, 50, 50, 1);
	this.arrowRightPressed = new Sprite("arrowRightPressed", 400, 240, 50, 50, 1);
	this.arrowUpPressed = new Sprite("arrowUpPressed", 400, 240, 50, 50, 1);
	this.arrowDownPressed = new Sprite("arrowDownPressed", 400, 240, 50, 50, 1);


	x = 290;
	y = 320;
	this.howToShockwave = new TextSprite("space bar to shockwave", x, y, 200, 40);
	x = 400;
	y = 300;
	this.shockwave = new Sprite("spacebar", x, y, 305, 70, 1);

	this.asteroids = new Array();
}

this.draw = function(context) {
	this.background.draw(context);


	if (this.isDone){
		this.panel.draw(context);
		this.panelText.draw(context);
		this.panelText2.draw(context);
		this.panelText2half.draw(context);
		this.panelText3.draw(context);
		this.panelText3half.draw(context);
		this.panelText4.draw(context);
		this.panelText4half.draw(context);
		this.panelText5.draw(context);
		this.panelText5half.draw(context);

		this.returnToMenu2.draw(context);
		this.returnToMenu.draw(context);
	} else {
		this.drawCurrent(this.type, context);
		this.player.draw(context);
	}


}

this.drawCurrent = function(type, context){
	switch(type){
		case 0:
		this.arrowLeft.draw(context);
		this.arrowRight.draw(context);
		this.arrowUp.draw(context);
		this.arrowDown.draw(context);
		this.howToMovement.draw(context);
		break;
		case 1:
		this.howToShockwave.draw(context);
		this.shockwave.draw(context);
		this.drawShockwaveTimer(context);
		this.drawComets(context);
		break;
	}
}

this.drawShockwaveTimer = function(context) {
	var width = (this.player.baseShockwaveCD - this.player.injectionTimeout) /  this.player.baseShockwaveCD * 500;

	if (width >= 500)
		width = 500;
	if (width <= 0)
		width = 0;

	var x, y;
	y = 10;
	x = 150;
	context.drawImage("bar", x, y, width, 25);
	context.drawImage("barHolder", x, y, 500, 25);
}

this.update = function() {
	this.updateTimer();
	if (this.isDone){
		this.CheckIfReturnMainMenu(this.game.pressX, this.game.pressY);
	}else{
		this.player.Update();
		this.updateCurrent(this.type);

	}
}

this.updateCurrent = function (type) {
	switch(type){
		case 0: 
		if (isLeft || isRight || isUp || isDown){
			this.changeType = true;
		}
		break;
		case 1:		
		this.updateComets();
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
		c.initialize(0);
		this.asteroids.push(c);
	}
}
this.updateComets = function(){
	for (var i = 0; i < 5; i++){
		this.asteroids[i].Update(this.player);
	}
}

this.drawComets = function(context){
	for (var i = 0; i < 5; i++){
		this.asteroids[i].draw(context);
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
	if (!this.game.InputHandler.isPressed(InputKey.ENTER) && (typeof x == 'undefined' || typeof y == 'undefined')) return;
	if (this.returnToMenu.contains(x, y) || this.game.InputHandler.isPressed(InputKey.ENTER)){
		this.game.changeScreen(0);
		this.game.gameScreen.initialize();
		this.game.pressX = this.game.pressY = typeof 'undefined';
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