var theGame = function(game){}

theGame.prototype = {
		create: function(){
			background = game.add.bitmapData(1280, 720)
			background.fill(255, 0, 055)
		    var back = this.game.add.sprite(0,0, background);
			for (var y = 0; y < 50; y++){
				for (var x = 0; x < 50; x++){
					t = new tile([x, y], 'outside', randomInt(5, 6), false, null)
					game.add.existing(t)
				}
			}
			
			game.input.maxPointers = 2
			this.game.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
            this.game.touchControl.inputEnable();
            this.game.touchControl.settings.maxDistanceInPixels = 100
            
            player = new player(this.game)
		},
	    
	    render: function(){
	    	game.debug.renderShadow = false
	    	game.debug.font = '30px Courier bold'
	    	game.debug.lineHeight = 30
	    	this.game.debug.start(20, 40, 'red');
	    	this.game.debug.line("FPS: " + game.time.fps);
	    	this.game.debug.line("ScrollX: " + v.scrollX);
	    	this.game.debug.line("ScrollY: " + v.scrollY);
	    	this.game.debug.stop();
	    },
	    
	    update: function(){
	    	move()
	    	checkMap()
	    	
	    	game.input.mouse.mouseWheelCallback = mouseWheel;
	    	function mouseWheel(event) {
	    		if (game.input.mouse.wheelDelta == Phaser.Mouse.WHEEL_UP){
	    			v.scale += 0.1
	    			var scalePoint = [640, 360]
	    			offsetX = -((scalePoint[0]/v.scale) - (scalePoint[0]/(v.scale - 0.1)))
	    			offsetY = ((scalePoint[1]/v.scale) - (scalePoint[1]/(v.scale - 0.1)))
	    			v.scrollX += offsetX
	    			v.scrollY += offsetY
	    		}
	    		else if (game.input.mouse.wheelDelta == Phaser.Mouse.WHEEL_DOWN){
	    			v.scale -= 0.1
	    			if (v.width * 30 * v.scale < v.gameWidth || v.height * 30 * v.scale < v.gameHeight){
	    				v.scale += 0.1
	    			}
	    			else{
	    				var scalePoint = [640, 360]
		    			offsetX = -((scalePoint[0]/v.scale) - (scalePoint[0]/(v.scale + 0.1)))
		    			offsetY = ((scalePoint[1]/v.scale) - (scalePoint[1]/(v.scale + 0.1)))
		    			v.scrollX += offsetX
		    			v.scrollY += offsetY
	    			}
	    		}
	    		checkMap()
	    	}
	    }
}

var easeInSpeed = function(x){
    //return x * Math.abs(x) / 2000;
	//5 = player speed
	//99 = touch control max speed
	return x * Math.abs(x) / (99 / (v.player.speed / 99));
};

function checkMap(){
	//2500 = 50 * 50, mapsize * tilesize
    if (v.scrollX < 0){
    	v.playerX += v.scrollX
  	  	v.scrollX = 0
    }
	if (v.scrollX > 2500 - 1280 / v.scale){
    	v.playerX += v.scrollX - (2500 - 1280 / v.scale)
  	  	v.scrollX = 2500 - 1280 / v.scale
    }
    if (v.scrollY > 0){
    	v.playerY -= v.scrollY
  	  	v.scrollY = 0
    }
    if (v.scrollY < -2500 + 720 / v.scale){
    	v.playerY -= v.scrollY - (-2500 + 720 / v.scale)
  	  	v.scrollY = -2500 + 720 / v.scale
    }
    
}

function move(){
	var pressX = false
    var pressY = false
	if (game.touchControl.open){
		if (game.touchControl.initialPoint.x < 640){
			var speed = this.game.touchControl.speed;
			v.velX -= easeInSpeed(speed.x) * 0.1
		    v.velY += easeInSpeed(speed.y) * 0.1
		    
		    if (Math.abs(easeInSpeed(speed.x) * 0.1) >= 0.05){
				pressX = true
			}
			if (Math.abs(easeInSpeed(speed.y) * 0.1) >= 0.05){
				pressY = true
			}
		}
		else{
			console.log("HIDE")
			game.touchControl.imageGroup.forEach(function(e){
		    	e.visible = false
		    })
		}
	}
	    
    if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
		v.velX -= v.player.speed * 0.1
		var pressX = true
	}
	if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
		v.velX += v.player.speed * 0.1
		var pressX = true
	}
	if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
		v.velY += v.player.speed * 0.1
		var pressY = true
	}
	if (game.input.keyboard.isDown(Phaser.Keyboard.S)){
		v.velY -= v.player.speed * 0.1
		var pressY = true
	}
	
	if ((v.velX > v.player.speed && v.velX > 0) || (v.velX < -v.player.speed && v.velX < 0)){
		v.velX = v.player.speed * Math.sign(v.velX)
	}
	if ((v.velY > v.player.speed && v.velY > 0) || (v.velY < -v.player.speed && v.velY < 0)){
		v.velY = v.player.speed * Math.sign(v.velY)
	}
	
	if (pressX == false){
		if ((v.velX > -0.5 && v.velX < 0) || (v.velX < 0.5 && v.velX > 0)){
			v.velX = 0
		}
		else{
			v.velX -= 0.5 * Math.sign(v.velX)
		}
	}
	if (pressY == false){
		if ((v.velY > -0.5 && v.velY < 0) || (v.velY < 0.5 && v.velY > 0)){
			v.velY = 0
		}
		else {
			v.velY -= 0.5 * Math.sign(v.velY)
		}
	}
	
	if (v.playerX < 0) {
		v.playerX += v.velX
	}
	else if (v.playerX > 0){
		v.playerX += v.velX
	}
	else{
		v.scrollX += v.velX
	}
	if (v.playerX != 0){
		v.scrollX += v.playerX
		v.playerX = 0
	}
	
	if (v.playerY < 0) {
		v.playerY -= v.velY
	}
	else if (v.playerY > 0){
		v.playerY -= v.velY
	}
	else{
		v.scrollY += v.velY
	}
	if (v.playerY != 0){
		v.scrollY -= v.playerY
		v.playerY = 0
	}
	v.scrollX = parseInt(v.scrollX.toFixed(2))
	v.scrollY = parseInt(v.scrollY.toFixed(2))
	v.playerX = parseInt(v.playerX.toFixed(2))
	v.playerY = parseInt(v.playerY.toFixed(2))

}