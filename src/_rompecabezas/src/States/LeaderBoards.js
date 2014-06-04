(function() {
	'use strict';
	function LeaderBoards() {}

	LeaderBoards.prototype = {
		create: function() {
			game.add.sprite(0, 0, 'frame');
			game.stage.backgroundColor = '#333333';
			var highScore = 0;
			var lastScore = 0;
			lastScore = localStorage.getItem('lastScore');
			highScore = localStorage.getItem('highScore');
			if (highScore === null){
				highScore = lastScore;
				localStorage.setItem('highScore', lastScore);
			}
			if(highScore > lastScore ){
				localStorage.setItem('highScore', lastScore);
			}
			this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
			this.enterKey.onDown.add(this.startGame, this);
			
			this.bttPlay = game.add.button(game.world.centerX , game.world.centerY + 75, 'btts', this.startGame, this, 'play1', 'play0', 'play2');
			this.bttAbout = game.add.button(game.world.centerX - 75 , game.world.centerY + 75, 'btts', this.mainMenu, this, 'about1', 'about0', 'about2');
			this.text = game.add.text(game.world.centerX, game.world.centerY - 20, "You Won!! \n High Score\n " + highScore + "\n Last Score\n " + lastScore, {
				font: "17px Source Code Pro",
				fill: "#f0f0f0",
				align: "center"
			});
			this.text.anchor.setTo(0.5, 0.5);
		},

		update: function() {
			if(game.input.activePointer.justPressed()) {
				game.state.start('play');
			}
		},

		startGame: function() {
			game.state.start('play');
		},
		mainMenu: function(){
			game.state.start('mainmenu');
		}
	};
	LeaderBoardsS = LeaderBoards;
}());