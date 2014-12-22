var Config = {
	
	debug: false,
	warning: false,

	ui: {
		font: "Space Age",
		fontSize: "13pt",
	},
	
	sound: {
		musicEnabled: true,

		bgmVolume: 1,
		bgmRepeat: true,	
	},

	game: {
		pulseNovaCooldown: 10000,
		initialCash: 0,
		points: 0.25,
		deduction: 50,
		duration: 30,
		speed: 0.01,
		friction: 1,
		goalFuel: 100,
		maxHP: 100,

		trail: {
			isVisible: true,
			emit: 1,
			fadeDuration: 300,
			size: 50,
		},

		planet: {
			growthDuration: 1200
		},
		player:{
			movement: {
				velocity: 4,
				maxVelocity: 4
			}
		},

		blackhole:{
			size: 50,
			scale: {
				min: 0.9,
				max: 1.1
			},
			opacity: {
				min: 0.5,
				max: 0.9
			},
			movement: {
				maxVelocity: 0.7,
				maxAcceleration: 2,
				acceleration: 0.05,
				spaceBound: 0.9
			},

		}
	},

	cheat: {
		no_cost: true
	}
}