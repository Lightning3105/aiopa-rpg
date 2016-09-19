var titleMenu = function(game){}

titleMenu.prototype = {
		create: function(){
			background = gradient(game.width, game.height, "#00ff00", "#00ffff");
		    var back = this.game.add.sprite(0,0, background);
		    back.alpha = 0;
		    this.game.add.tween(back).to({ alpha: 1 }, 1500).start();
		    
		    buttons = game.add.group();
		    b = new labelButton(640, 400, 300, "New Game", 'buttonBeige', this.startGame, this)
		    buttons.add(b);
		    b = new labelButton(640, 500, 300, "Options", 'buttonBeige', this.onClick, this)
		    buttons.add(b);
		    		    
		    var aiopaText = game.add.sprite(640, 150, 'aiopaTitle', 0);
		    aiopaText.anchor.set(0.5, 0.5);
		    aiopaText.width = 500;
		    aiopaText.height = 110/262 * aiopaText.width;
		    aiopaText.alpha = 0;
		    game.add.tween(aiopaText).to({ alpha: 1 }, 500, null, true, 1250);
		    this.shimmer = aiopaText.animations.add('shimmer');
		    this.shimmer.play(15, true, false);
		    
		    game.input.maxPointers = 1
		    
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
			//this.game.state.start("theGame");
			this.game.state.add("newGame", newGame)
			this.game.state.start("newGame")
		}
}

var newGame = function(game){}

newGame.prototype = {
		create: function(){
			background = gradient(game.width, game.height, "#1a1a1a", "#000000");
		    var back = this.game.add.sprite(0,0, background);
		    back.alpha = 0;
		    this.game.add.tween(back).to({ alpha: 1 }, 1500).start();
		    
		    this.star = game.add.sprite(640, 360, "affinity/septagram")
		    this.star.width = 600
		    this.star.height = 600
		    this.star.anchor.set(0.5, 0.5)
		    this.star.alpha = 0
		    this.game.add.tween(this.star).to({ alpha: 1 }, 1500).start();
		    
		    game.input.maxPointers = 1
		    
		    document.addEventListener("backbutton", function(){
		    	game.state.start("titleMenu", true)
		    }, false);
		    
		    var affinities = game.add.group()
		    var aff = ["air", "fire", "water", "earth", "time", "light", "dark"]
		    v.selectedAffinity = null
		    for (i in aff){
			    a = new affinity(aff[i])
			    affinities.add(a)
		    }
		},
		
		render: function(){
			game.debug.inputInfo(32, 32, '#ffffff');
		},
}