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
		this.spawnTime = M.random(300);
	}
	this.spawnTime -= 33;
}


Emitter.prototype.spawn = function()
{
	var M = new MathHelper();

	var newEntity;
	var type;

	do {
		type = M.random(1,2);

		if (this.world.planets.length < 1 && M.random(100) < 5)
		{
			type = 0;
		}
	}while(type == 2 && this.world.comets.length >= 30);

	

	switch(type)
	{
		case 0: // planet
			newEntity = new Planet(this.world);
			this.world.planets.push(newEntity);
		break;
		case 1: // asteroid
			newEntity = new Asteroid(this.world);
			this.world.asteroids.push(newEntity);
		break;
		case 2: // comet
			newEntity = new Comet(this.world);
			this.world.comets.push(newEntity);
		break;
	}

	// Initialize 
	newEntity.initialize();
}