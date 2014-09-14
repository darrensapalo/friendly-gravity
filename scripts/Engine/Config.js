var Config = {
	
	debug: false,
	warning: true,

	ui: {
		font: "Space Age",
		fontSize: "14pt",
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
			scaling: 0.9
		},

		player:{
			size: 50,
			scale: {
				min: 0.8,
				max: 1.3
			},
			opacity: {
				min: 0.3,
				max: 0.7
			}
		}
	},

	cheat: {
		no_cost: true
	}
}