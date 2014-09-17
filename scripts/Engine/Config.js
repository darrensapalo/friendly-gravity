var Config = {
	
	debug: false,
	warning: true,

	ui: {
		font: "Space Age",
		fontSize: "13pt",
	},
	
	sound: {
		musicEnabled: false,

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

		trail: {
			isVisible: true,
			maximum: 25,
			minimum: 10,
			scaling: 0.8
		},

		player:{
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
				maxVelocity: 3.2,
				maxAcceleration: 5,
				acceleration: 0.3,
				friction: 0.79,
				spaceBound: 0.9
			},

		}
	},

	cheat: {
		no_cost: true
	}
}