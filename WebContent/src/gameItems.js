function tile(pos, sheet, frame, wall, terrain){
	Phaser.Sprite.call(this, game, 0, 0, 'tile/' + sheet, frame)
	this.width = 50 * v.scale
	this.height = 50 * v.scale
	this.position = pos
	//((-v.playerPosX + (30 * self.tilePosX)) * v.scale)
	this.x = (-v.scrollX + (this.position[0] * 50)) * v.scale
	this.y = (v.scrollX + (this.position[1] * 50)) * v.scale
}

tile.prototype = Object.create(Phaser.Sprite.prototype);
tile.prototype.constructor = tile;
tile.prototype.update = function() {
	this.width = 50 * v.scale
	this.height = 50 * v.scale
	this.x = (-v.scrollX + (this.position[0] * 50)) * v.scale
	this.y = (v.scrollX + (this.position[1] * 50)) * v.scale
}