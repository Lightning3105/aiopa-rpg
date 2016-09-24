var v = {
	scale: 1,
	gameWidth: 1280,
	gameHeight: 720,
	scrollX: 0,
	scrollY: 0,
	scale: 2,
	selectedAffinity: null,
	selectedGender: null
};
//					  ( width , height , renderer , parent , state , transparent , anti alias , physicsConfig )
game = new Phaser.Game(v.gameWidth, v.gameHeight, Phaser.AUTO, "game", null, null, true, null);
//var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'game');
game.state.add("Boot", boot);
game.state.add("Preload", preload);
game.state.add("titleMenu", titleMenu);
game.state.add("theGame", theGame);
game.state.start("Boot");
