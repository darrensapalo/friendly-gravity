// Factory pattern
function Emitter(world)
{
	this.world = world;
	this.spawnTime = 3000;
}

Emitter.prototype.update = function() {
	var M = new MathHelper();

	if (this.spawnTime <= 0)
	{
		this.spawn();
		this.spawnTime = M.random(5000, 7000);
	}
	this.spawnTime -= 33;
}


Emitter.prototype.spawn = function()
{
	var M = new MathHelper();

	var newEntity;
	var type = 2 ;//  M.random(3);

	switch(type)
	{
		case 0: // planet
			console.log("Making a new planet");
			newEntity = new Planet(this.world);
			this.world.planets.push(newEntity);
		break;
		case 1: // asteroid
			console.log("Making a new asteroid");
			newEntity = new Asteroid(this.world);
			this.world.asteroids.push(newEntity);
		break;
		case 2: // comet
			console.log("Making a new comet");
			newEntity = new Comet(this.world);
			this.world.comets.push(newEntity);
		break;
	}

	// Initialize 
	newEntity.initialize();
}