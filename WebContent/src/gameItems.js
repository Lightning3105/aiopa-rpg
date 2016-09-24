function tile(pos, sheet, frame, wall, terrain){
	Phaser.Sprite.call(this, game, 0, 0, 'tile/' + sheet, frame)
	this.overlap = 1
	this.width = 50 * v.scale + this.overlap
	this.height = 50 * v.scale + this.overlap
	this.position = pos
	//((-v.playerPosX + (30 * self.tilePosX)) * v.scale)
	this.x = (-v.scrollX + (this.position[0] * 50)) * v.scale
	this.y = (v.scrollY + (this.position[1] * 50)) * v.scale
	this.smoothed = false //anti aliasing
}

tile.prototype = Object.create(Phaser.Sprite.prototype);
tile.prototype.constructor = tile;
tile.prototype.update = function() {
	this.width = 50 * v.scale + this.overlap
	this.height = 50 * v.scale + this.overlap
	this.x = (-v.scrollX + (this.position[0] * 50)) * v.scale
	this.y = (v.scrollY + (this.position[1] * 50)) * v.scale
	
	if (this.x < 0 - 50 * v.scale || this.x > v.gameWidth + 50 * v.scale) {
		this.visible = false
	}
	else if (this.y < 0 - 50 * v.scale || this.y > v.gameHeight + 50 * v.scale) {
		this.visible = false
	}
	else {
		this.visible = true
	}
}

function player(game){
	Phaser.Sprite.call(this, game, 640, 360, 'defaultCharacter', 7)
	this.game = game
	this.anchor.set(0.5, 1)
	game.add.existing(this)
	this.height = 80 * v.scale
	this.width = 60 * v.scale
	this.smoothed = false
	
	//animations
	this.animations.add("walkRight", [5, 4, 3, 4], 4)
	this.animations.add("walkLeft", [11, 10, 9, 10], 4)
	this.animations.add("walkUp", [2, 1, 0, 1], 4)
	this.animations.add("walkDown", [8, 7, 6, 7], 4)
}

player.prototype = Object.create(Phaser.Sprite.prototype);
player.prototype.constructor = player;
player.prototype.update = function() {
	var speed = {x: v.velX, y: v.velY}//game.touchControl.speed;
	var delay = 0;
	if (speed.x == 0 && speed.y == 0){
		this.animations.stop(0, true);
	    this.frame = 7
	}
	else if (Math.abs(speed.y) < Math.abs(speed.x)){
	    delay = parseInt(1000 / Math.abs((easeInSpeed(speed.x)) * 10), 10);
	
	    // moving mainly right or left
	    if (this.game.touchControl.cursors.left || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
	        this.play('walkLeft');
	    } else if (this.game.touchControl.cursors.right || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
	        this.play('walkRight');
	    }
	} else if (Math.abs(speed.y) >= Math.abs(speed.x)){
	    delay = parseInt(1000 / Math.abs((easeInSpeed(speed.y)) * 10), 10);
	    // moving mainly up or down
	    if (this.game.touchControl.cursors.up || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
	        this.play('walkUp');
	    } else if (this.game.touchControl.cursors.down || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
	        this.play('walkDown');
	    }
	} else {
	    this.animations.stop(0, true);
	    this.frame = 7
	} 
}