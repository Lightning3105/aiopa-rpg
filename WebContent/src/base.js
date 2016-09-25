var v = {
	scale: 1,
	gameWidth: 1280,
	gameHeight: 720,
	scrollX: 0,
	scrollY: 0,
	playerX: 0,
	playerY: 0,
	velX: 0,
	velY: 0,
	scale: 2,
	selectedAffinity: null,
	selectedGender: null,
	player: {
		speed: 3,
	}
};
//					  ( width , height , renderer , parent , state , transparent , anti alias , physicsConfig )
game = new Phaser.Game(v.gameWidth, v.gameHeight, Phaser.AUTO, "game", null, null, true, null);
//var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'game');
game.state.add("Boot", boot);
game.state.add("Preload", preload);
game.state.add("titleMenu", titleMenu);
game.state.add("theGame", theGame);
game.state.start("Boot");
