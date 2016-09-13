var titleMenu = function(game){}

titleMenu.prototype = {
		create: function(){
			background = gradient(game.width, game.height, "#00ff00", "#00ffff");
		    var lol = this.game.add.sprite(0,0, background);
		    lol.alpha = 0;
		    this.game.add.tween(lol).to({ alpha: 1 }, 1500).start();
		    
		    buttons = game.add.group();
		    buttons.add(labelButton(640, 400, 300, "Play", 'buttonBeige', this.startGame, this));
		    buttons.add(labelButton(640, 500, 300, "Options", 'buttonBeige', this.onClick, this));
		    		    
		    var aiopaText = game.add.sprite(640, 150, 'aiopaTitle', 0);
		    aiopaText.anchor.set(0.5, 0.5);
		    aiopaText.width = 500;
		    aiopaText.height = 110/262 * aiopaText.width;
		    aiopaText.alpha = 0;
		    game.add.tween(aiopaText).to({ alpha: 1 }, 500, null, true, 1250);
		    this.shimmer = aiopaText.animations.add('shimmer');
		    this.shimmer.play(15, true, false);
		    
		    for (var i = 0; i < buttons.length; i++){
		    	var b = buttons.getAt(i);
		    	var yCur = b.y;
		    	b.alpha = 0;
		    	b.y += 100;
		    	game.add.tween(b).to({ y: yCur }, 500, null, true, 1950 + i*150);
		    	game.add.tween(b).to({ alpha: 1 }, 500, null, true, 1950 + i*150);
		    }
		},
		
		onClick: function(){
			console.log("yes");
		},
		
		render: function(){
			game.debug.inputInfo(32, 32, 'f000000');
		},
		
		startGame: function(){
			console.log(this.game.state.states)
			this.game.state.start("theGame");
		}
}