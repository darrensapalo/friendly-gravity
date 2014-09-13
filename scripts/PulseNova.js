function PulseNova()
{
	this.counter = 0;
}

PulseNova.prototype.isReady = function() 
{
	return this.counter <= 0;	
}

PulseNova.prototype.update = function()
{
	if (this.counter > 0)
		this.counter -= 1;

	// logic for drawing
}

PulseNova.prototype.reset = function()
{
	this.counter = Config.game.pulseNovaCooldown;
}

PulseNova.prototype.draw = function(context)
{
	// drawing
}

PulseNova.prototype.ComputeTimerWidth = function() {
	var val;
	x = (Config.game.baseShockwaveCD - this.player.injectionTimeout) /  Config.game.baseShockwaveCD * 500;


	if (x >= 500)
		x = 500;
	if (x <= 0)
		x = 0;

	return x;
}


PulseNova.prototype.updateTimerFunc = function(){
	this.updateTimers = true;
}


PulseNova.prototype.updateTimer = function(){
	if (this.updateTimers){
		this.elapsedGameMilliseconds += 33;
		this.updateTimers = false;
		timerTimeout = setTimeout(this.updateTimerFunc, 33);
	}

}