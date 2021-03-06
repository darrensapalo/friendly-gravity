function PulseNova(player)
{
	this.player = player;

	this.bar = new CenteredSprite("bar", 400, 20, 750, 38);
	this.bar.scalex = this.bar.scaley = 0.6;

	this.holder = new CenteredSprite("barHolder", 400, 20, 750, 38);
	this.holder.scalex = this.holder.scaley = 0.6;

}

PulseNova.prototype.update = function()
{	
	var M = new MathHelper();
	this.bar.width = M.clamp(this.player.fuel / Config.game.goalFuel * 750, 0, 750);
}

PulseNova.prototype.reset = function()
{
	this.counter = Config.game.pulseNovaCooldown;
}

PulseNova.prototype.draw = function(context)
{
	this.bar.draw(context);
	this.holder.draw(context);
}
