function Eaten()
{
	this.comets = 0;
	this.asteroids = 0;
	this.planets = 0;
}

Eaten.prototype.consume = function(t) {
	this.comets += t.comets;
	this.asteroids += t.asteroids;
	this.planets += t.planets;
};