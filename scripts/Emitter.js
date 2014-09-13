// Factory pattern
function Emitter(world)
{
	this.world = world;
}

Emitter.prototype.update = function() {
	
}


Emitter.prototype.CheckSpawnPlanet = function()
{
	this.planetSpawnTimeout -= this.elapsedMs;

	if (this.planetSpawnTimeout <= 0)
		var willSpawn = true;

	if (willSpawn){

	// Create a new comet
	var p = new Planet();
	
	// Initialize 
	p.initialize();
	this.planets.push(p);
	willSpawn = false;
	this.planetSpawnTimeout = Math.random() * this.starSpawnRandom + this.starSpawnTimer * 5;
	}
}


Emitter.prototype.CheckSpawn  = function(){
	this.spawnTimeout -= this.elapsedMs;
	if (this.spawnTimeout <= 0)
		var willSpawn = true;

	if (willSpawn) {

		// Create a new comet
		var v = new Comet();
		
		// Initialize 
		v.initialize(-1);
		if (v.isAsteroid())
			this.spawnTimeout = 100;
		
		this.comets.push(v);
		willSpawn = false;
		if (game.difficulty == 1)
			this.spawnTimeout = Math.random() * this.starSpawnRandom / 1.5 + this.starSpawnTimer;
		else 
			this.spawnTimeout = Math.random() * this.starSpawnRandom + this.starSpawnTimer;
		
	}
}