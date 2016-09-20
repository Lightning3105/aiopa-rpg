var titleMenu = function(game){}

titleMenu.prototype = {
		create: function(){
			background = gradient(game.width, game.height, "#00ff00", "#00ffff");
		    var back = this.game.add.sprite(0,0, background);
		    back.alpha = 0;
		    this.game.add.tween(back).to({ alpha: 1 }, 1500).start();
		    
		    buttons = game.add.group();
		    b = new labelButton(640, 400, 300, "New Game", 'button/Beige', this.startGame, this)
		    buttons.add(b);
		    b = new labelButton(640, 500, 300, "Options", 'button/Beige', null, this)
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
		    
		    var title = game.add.text(20, 20, "Select an affinity...", {font: 'bold 50pt Galdeano', fill: 'white'})
		    title.alpha = 0
		    this.game.add.tween(title).to({alpha: 1}, 2000).start()
		    
		    this.next = new labelButton(1145, 720, 250, "Next", 'button/Blue', this.nextState, this, {'font': 'Galdeano', 'fill': 'white', 'fontSize': '30pt'})
		    game.add.existing(this.next)
		    this.next.alpha = 0
		    
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
		
		update: function(){
			if (v.selectedAffinity != null && this.next.tweened != true){
				this.game.add.tween(this.next).to({ alpha: 1, y: 680 }, 1000).start();
				this.next.tweened = true
			}
		},
		
		render: function(){
			game.debug.inputInfo(1000, 32, '#ffffff');
		},
		
		nextState: function(){
			console.log("next state")
			this.game.state.add("selectGender", selectGender)
			this.game.state.start("selectGender")
		}
}

var selectGender = function(game){}

selectGender.prototype = {
		create: function(){
			background = gradient(game.width, game.height, "#1a1a1a", "#000000");
		    var back = this.game.add.sprite(0,0, background);
		    back.alpha = 0;
		    this.game.add.tween(back).to({ alpha: 1 }, 1500).start();
		    
		    var title = game.add.text(20, 20, "Pick your gender...", {font: 'bold 50pt Galdeano', fill: 'white'})
		    title.alpha = 0
		    this.game.add.tween(title).to({alpha: 1}, 2000).start()
		    
		    this.next = new labelButton(1145, 720, 250, "Next", 'button/Blue', this.nextState(), this, {'font': 'Galdeano', 'fill': 'white', 'fontSize': '30pt'})
		    game.add.existing(this.next)
		    this.next.alpha = 0
		    
		    gen = new gender("male")
		    game.add.existing(gen)
		    gen = new gender("female")
		    game.add.existing(gen)
		    
		    
		    game.input.maxPointers = 1
		    
		    document.addEventListener("backbutton", function(){
		    	game.state.start("newGame", true)
		    }, false);
		    
		},
		
		update: function(){
			if (v.selectedGender != null && this.next.tweened != true){
				this.game.add.tween(this.next).to({ alpha: 1, y: 680 }, 1000).start();
				this.next.tweened = true
			}
		},
		
		render: function(){
			game.debug.inputInfo(1000, 32, '#ffffff');
		},
		
		nextState: function(){
			return
		}
}