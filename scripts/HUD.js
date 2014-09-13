function HUD(world)
{
	this.world = world;
	this.player = world.player;

	this.PulseNova = new PulseNova(player);
}

HUD.prototype.update = function() {
	// body...
}

HUD.prototype.draw = function(context) {
	context.strokeStyle = 'black';
	context.lineWidth = 3;
	context.fillStyle = "#fff";
	context.font = Config.fontSize + " " + Config.font + ", regular"
	context.textBaseline = "top";
	context.textAlign = "center";
	var x, y;
	x = 75;
	y = 13;
	// context.strokeText("Time left: " + this.countdownLeft, 100, 20);
	context.strokeText("Score: " + Math.floor(this.player.score), x, y);
	// context.fillText("Time left: " + this.countdownLeft, 100, 20);
	context.fillText("Score: " + Math.floor(this.player.score), x, y);


	x = 725;
	y = 13;
	var time = Math.floor(this.countdownLeft / 1000);
	if (time < 0)
		time = 0;
	context.strokeText("Time: " + time, x, y);
	// context.fillText("Time left: " + this.countdownLeft, 100, 20);
	context.fillText("Time: " + time, x, y);
	
	

	this.PulseNova.draw(context);
}

HUD.prototype..drawTimer = function(context) {
		var x, y;
		y = 10;
		x = 150;
		context.drawImage(this.game.ImageLoader.images["bar"], x, y, game.timerWidth, 25);
		context.drawImage(this.game.ImageLoader.images["barHolder"], x, y, 500, 25);
	}

HUD.prototype..updateTutorial = function(){
	this.showMessage -= this.elapsedMs;
	if (this.showMessage < 0){
		// decrease opacity of text message
		this.tutorialText.opacity -= 0.025;
		if (this.tutorialText.opacity < 0)
			this.finishShowTutorial = true;
	}
}