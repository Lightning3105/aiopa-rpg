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
	    	game.debug.font = '20px Courier'
	    	game.debug.text("FPS: " + game.time.fps, 20, 30, "red")
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
    if (v.scrollX < 0){
  	  v.scrollX = 0
    }
    if (v.scrollY > 0){
  	  v.scrollY = 0
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
		    console.log(easeInSpeed(speed.x) * 0.1, easeInSpeed(speed.y) * 0.1)
		    
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
	
	v.scrollX += v.velX
	v.scrollY += v.velY
}