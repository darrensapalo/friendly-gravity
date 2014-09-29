var fs = require('fs');

module.exports = {
	// Engine
	Config: eval(fs.readFileSync('./Engine/Config.js', 'utf8')),
	MathHelper: eval(fs.readFileSync('./Engine/MathHelper.js', 'utf8')),
	Rectangle: eval(fs.readFileSync('./Engine/Rectangle.js', 'utf8')),
	Session: eval(fs.readFileSync('./Engine/Session.js', 'utf8')),
	Vector: eval(fs.readFileSync('./Engine/Vector.js', 'utf8')),

	// Game

	Entity: eval(fs.readFileSync('./Game/Entity.js', 'utf8')),
	Consumable: eval(fs.readFileSync('./Game/Consumable.js', 'utf8')),
	Asteroid: eval(fs.readFileSync('./Game/Asteroid.js', 'utf8')),
	Blackhole: eval(fs.readFileSync('./Game/Blackhole.js', 'utf8')),
	ChildEntity: eval(fs.readFileSync('./Game/ChildEntity.js', 'utf8')),
	comet: eval(fs.readFileSync('./Game/comet.js', 'utf8')),
	
	Eaten: eval(fs.readFileSync('./Game/Eaten.js', 'utf8')),
	Emitter: eval(fs.readFileSync('./Game/Emitter.js', 'utf8')),
	HPBar: eval(fs.readFileSync('./Game/HPBar.js', 'utf8')),
	HUD: eval(fs.readFileSync('./Game/HUD.js', 'utf8')),
	Planet: eval(fs.readFileSync('./Game/Planet.js', 'utf8')),
	Player: eval(fs.readFileSync('./Game/Player.js', 'utf8')),
	PulseNova: eval(fs.readFileSync('./Game/PulseNova.js', 'utf8')),
	Round: eval(fs.readFileSync('./Game/Round.js', 'utf8')),
	Ships: eval(fs.readFileSync('./Game/Ships.js', 'utf8')),
	Trail: eval(fs.readFileSync('./Game/Trail.js', 'utf8')),
	World: eval(fs.readFileSync('./Game/World.js', 'utf8')),

	// Handler
	InputHandler: eval(fs.readFileSync('./Handler/InputHandler.js', 'utf8')),
	StateHandler: eval(fs.readFileSync('./Handler/StateHandler.js', 'utf8')),


	// States
	State: eval(fs.readFileSync('./State/State.js', 'utf8')),
	GameState: eval(fs.readFileSync('./State/GameState.js', 'utf8')),
	LobbyState: eval(fs.readFileSync('./State/LobbyState.js', 'utf8')),
	InitializingState: eval(fs.readFileSync('./State/InitializingState.js', 'utf8')),
	
}