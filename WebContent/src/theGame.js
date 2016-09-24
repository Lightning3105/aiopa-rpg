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
		},
	    
	    render: function(){
	    },
	    
	    update: function(){
	    	var speed = this.game.touchControl.speed;
            var delay=0;

            
            v.scrollX -= easeInSpeed(speed.x)
            v.scrollY += easeInSpeed(speed.y)
            //console.log(easeInSpeed(speed.x), easeInSpeed(speed.y))
            
            if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
	    		v.scrollX -= 5
	    	}
	    	if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
	    		v.scrollX += 5
	    	}
	    	if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
	    		v.scrollY += 5
	    	}
	    	if (game.input.keyboard.isDown(Phaser.Keyboard.S)){
	    		v.scrollY -= 5
	    	}
	    	checkMap()
	    	
	    	game.input.mouse.mouseWheelCallback = mouseWheel;
	    	function mouseWheel(event) {
	    		if (game.input.mouse.wheelDelta == Phaser.Mouse.WHEEL_UP){
	    			v.scale += 0.1
	    			//var scalePoint = [1280/2, 720/2]
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
		    			console.log(offsetX, offsetY)
	    			}
	    		}
	    		checkMap()
	    	}
            //this.tilesprite.tilePosition.y += easeInSpeed(speed.y);
            //this.tilesprite.tilePosition.x += easeInSpeed(speed.x);
            // Also you could try linear speed;
            //this.tilesprite.tilePosition.y += this.game.touchControl.speed.y / 20;
            //this.tilesprite.tilePosition.x += this.game.touchControl.speed.x / 20;

            /*if (Math.abs(speed.y) < Math.abs(speed.x)){
                delay = parseInt(1000 / Math.abs((easeInSpeed(speed.x)) * 10), 10);

                // moving mainly right or left
                if (this.game.touchControl.cursors.left) {
                    this.character.play('walkLeft');
                } else if (this.game.touchControl.cursors.right) {
                    this.character.play('walkRight');
                }
            } else if (Math.abs(speed.y) > Math.abs(speed.x)){
                delay = parseInt(1000 / Math.abs((easeInSpeed(speed.y)) * 10), 10);
                // moving mainly up or down
                if (this.game.touchControl.cursors.up) {
                    this.character.play('walkUp');
                } else if (this.game.touchControl.cursors.down) {
                    this.character.play('walkDown');
                }
            } else {
                this.character.animations.stop(0, true);
            } */
	    }
}

var easeInSpeed = function(x){
    //return x * Math.abs(x) / 2000;
	//5 = player speed
	//99 = touch control max speed
	return x * Math.abs(x) / (99 / (5 / 99));
};

function checkMap(){
	console.log(v.scrollX, v.scrollY)
    if (v.scrollX < 0){
  	  v.scrollX = 0
    }
    if (v.scrollY > 0){
  	  v.scrollY = 0
    }
}