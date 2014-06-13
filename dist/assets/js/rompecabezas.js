'use strict';
var isMoving;
var BootS, PreloaderS, MainMenuS, PlayS, CreditsS, LeaderBoardsS, game;

var WebFontConfig;
WebFontConfig = {
	google: { families: [ 'Source+Code+Pro::latin' ] }
};

(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();


window.onload = function () {
	isMoving = false;

	game = new Phaser.Game(900, 1200, Phaser.AUTO, 'rompecabezas-container');

	// Game States
	game.state.add('boot', BootS);
	game.state.add('preloader', PreloaderS);
	game.state.add('credits', CreditsS);
	game.state.add('leaderboards', LeaderBoardsS);
	game.state.add('mainmenu', MainMenuS);
	game.state.add('play', PlayS);
	game.state.start('boot');
};

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array){
        return false;
    }

    // compare lengths - can save a lot of time
    if (this.length != array.length){
        return false;
    }

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i])){
                return false;
            }
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

/*
Class: NumberBlock
Author: Arlefreak
*/

'use strict';

var blockDimension = 300;

var NumberBlock = function (x, y, number) {
  console.log("Inicia NumberBlock");
  this.number = number;
  this.position = 0;
  this.position0 = 1;
  Phaser.Sprite.call(this, game, x, y, 'bloques', 'bloque'+number);
  /*
  this.rect = new Phaser.Rectangle(25,50, 150,150);
  this.input.enableDrag(true,false,true,0,this.rect,null);
  this.input.enableSnap(50,50,true,false,0,0);
  */

  //  Listen for input events on this sprite
  //this.inputEnabled = true;

  //this.input.enableDrag(true);
  //this.events.onInputDown.add(this.onDown, this);
  //this.events.onInputOut.add(outSprite, this);
  this.txt = game.add.text(x + 20, y + 20, number, {
    font: "20px Source Code Pro",
    fill: "#F0F0F0",
    align: "center"
  });
};

NumberBlock.prototype = Object.create(Phaser.Sprite.prototype);
NumberBlock.prototype.constructor = NumberBlock;

NumberBlock.prototype.update = function() {
  this.txt.x = this.x + 20;
  this.txt.y = this.y + 20;
};

NumberBlock.prototype.move = function(_to){
  var e = game.add.tween(this);
  var t = game.add.tween(this.txt);
  e.onStart.add(function(){isMoving = true;});
  e.onComplete.add(function(){isMoving = false;})
  switch(_to){
    case 'left':
    e.to({ x: this.x - blockDimension }, 250, Phaser.Easing.Linear.None, false, 0 , 0, false);
    t.to({ x: this.txt.x - blockDimension }, 250,null);
    t.start();
    e.start();
    break;
    case 'up':
    e.to({ y: this.y - blockDimension }, 250, Phaser.Easing.Linear.None, false, 0 , 0, false);
    t.to({ y: this.txt.y - blockDimension }, 250,null);
    t.start();
    e.start();
    break;
    case 'right':
    e.to({ x: this.x + blockDimension }, 250, Phaser.Easing.Linear.None, false, 0 , 0, false);
    t.to({ x: this.txt.x + blockDimension }, 250,null);
    t.start();
    e.start();
    break;
    case 'down':
    e.to({ y: this.y + blockDimension }, 250, Phaser.Easing.Linear.None, false, 0 , 0, false);
    t.to({ y: this.txt.y + blockDimension }, 250,null);
    t.start();
    e.start();
    break;

  }
}

NumberBlock.prototype.onDown = function(){
  console.log(this.parent.arrNumbs);
  this.position = this.parent.checkPosition(this.number);
  this.position0= this.parent.checkPosition(0);

  if (this.position - this.position0 !== 0){
    switch(this.position){
      case 0:
      switch(this.position0){
        case 1:
        this.move(3);
        break;
        case 3:
        this.move(2);
        break;
        default:
        return;
      }
      break;
      case 1:
      switch(this.position0){
        case 0:
        this.move(1);
        break;
        case 2:
        this.move(3);
        break;
        case 4:
        this.move(4);
        break;
        default:
        return;
      }
      break;
      case 2:
      switch(this.position0){
        case 1:
        this.move(1);
        break;
        case 5:
        this.move(4);
        break;
        default:
        return;
      }
      break;
      case 3:
      switch(this.position0){
        case 0:
        this.move(2);
        break;
        case 4:
        this.move(3);
        break;
        case 6:
        this.move(4);
        break;
        default:
        return;
      }
      break;
      case 4:
      break;
      case 5:
      break;
      case 6:
      break;
      case 7:
      break;
      case 8:
      break;
    }
  }
  console.log('Numbs: ' + this.parent.arrNumbs);
  console.log(this.parent.arrNumbs);


}

/**
* @author       Arlefreak <arlefreak@gmail.com>
*
* @overview
*
* 8Puzzle - http://www.arlefreak.com/games/8puzzle/play/
*
* v0.8.0
*
* By Mario Carballo Zama http://www.arlefreak.com
*
* This is a Simple 8Puzzle game made with Phaser
*
*/

var blockDimension = 300;

'use strict';

var Board = function (arrNumbs) {
	Phaser.Group.call(this, game);
	this.h = 0;
	this.isFinal = false;
	this.isSolvable = false;
	this.moves = 0;
	this.totalCost = 0;
	this.position0 = 0;
	if(arrNumbs){
		this.arrNumbs = arrNumbs;
	}
	else {
		arrNumbs = [];
	}
};

Board.prototype = Object.create(Phaser.Group.prototype);
Board.prototype.constructor = Board;

Board.prototype.genFinal = function (){
	this.moves = 0;
	this.arrNumbs = [1,2,3,4,5,6,7,8,0];
};

Board.prototype.genRandom = function (){
	this.arrNumbs = [];
	this.moves = 0;
	this.clearBoard();
	var tempArr = [1,2,3,4,5,6,7,8,0];
	this.arrNumbs = Phaser.Utils.shuffle(tempArr);
	if (this.checkSolvable(this.arrNumbs)) {
		this.isSolvable = true;
		this.logBoard();
	}else {
		this.genRandom();
	}
};

Board.prototype.genTest = function (){
	this.arrNumbs = [];
	this.moves = 0;
	this.clearBoard();
	//this.arrNumbs = [1, 0, 3, 7, 2, 5, 8, 4, 6];
	//this.arrNumbs = [6,1,4,0,2,5,3,7,8 ];
	this.arrNumbs = [1,2,3,4,5,6,0,7,8 ];
	console.log('Solvable: ' + this.checkSolvable(this.arrNumbs));
	this.logBoard();
};

Board.prototype.checkSolvable = function (arr){
	var inversion = 0;
	var i = 0;
	var j = 0;
	for (i = arr.length - 1; i >= 0; i--) {
		for (j = i - 1; j >= 0; j--) {
			if (arr[j] > arr[i] && arr[i] !== 0 && arr[j] !== 0){
				inversion++;
			}
		}
	}
	if (inversion % 2 === 0){
		console.log('Solvable - ' + arr + ' - ' + inversion);
		return true;
	}
	else{
		console.log('Unsulvable - ' + arr + ' - ' + inversion);
		return false;
	}
}

Board.prototype.equals = function (board){
	if (!board) {
		return false;
	}
	if (!board.arrNumbs) {
		return false;
	}
	if (this.arrNumbs.length !== board.arrNumbs.length) {
		return false;
	}
	var i = 0;

	for (i = this.arrNumbs.length - 1; i >= 0; i--) {
		if(this.arrNumbs[i] != board.arrNumbs[i]){
			return false;
		}
	}
	return true;
};

Board.prototype.logBoard = function(){
	console.log('Board: ' + this.arrNumbs);
};

Board.prototype.checkPosition = function(_numb){
	var i = 0;
	for (i = this.arrNumbs.length - 1; i >= 0; i--) {
		if(this.arrNumbs[i] === _numb){
			return i;
		}
	}
}

Board.prototype.draw = function(){
	this.clearBoard(this);
	var k = 0,
	i = 0,
	j = 0;
	var tmpBlock = {};
	for (i = 3; i > 0; i--)
	{
		for (j = 3; j > 0; j--){
			if (this.arrNumbs[k] !== 0){
				tmpBlock = new NumberBlock((j-3)*-blockDimension, (i-3)*-blockDimension + (blockDimension/2),this.arrNumbs[k],this);
				this.add(tmpBlock);
			}
			k++;
		}
	}
};

Board.prototype.clearBoard = function(){
	this.forEach(this.clearTxt,this,true);
	this.removeAll();
};

Board.prototype.calcHueristic = function(){
	var h = 0;
	var i = 0;
	for (i = this.arrNumbs.length - 1; i >= 0; i--) {
		if(this.arrNumbs[i] !== 0){
			h +=  Math.abs(i - (this.arrNumbs[i] - 1));
		}
	}
	this.h = h;
};

Board.prototype.calcTotalCost = function(){
	this.totalCost = this.moves + this.h;
};

Board.prototype.clearTxt = function(child){
	child.txt.destroy();
};

Board.prototype.move = function(_where){
	if(isMoving){
		return false;
	}
	isMoving = true;
	this.position0 = this.checkPosition(0);
	var numberblock = {};
	if(_where === 'up'){
		if(this.position0 >= 6 && this.position0 <= 8){
			isMoving = false;
			return false;
		}else{
			numberblock = this.getAt(this.position0 + 2);
			numberblock.move(_where);

			this.remove(numberblock);
			this.addAt(numberblock,this.position0);

			this.arrNumbs[this.position0] = this.arrNumbs[this.position0 + 3];
			this.arrNumbs[this.position0 + 3] = 0;
		}
	}else if(_where == 'down'){
		if(this.position0 >= 0 && this.position0 <= 2){
			isMoving = false;
			return false;
		}else{
			numberblock = this.getAt(this.position0 - 3);
			numberblock.move(_where);

			this.remove(numberblock);
			this.addAt(numberblock,this.position0 -1);

			this.arrNumbs[this.position0] = this.arrNumbs[this.position0 - 3];
			this.arrNumbs[this.position0 - 3] = 0;
		}
	}else if(_where == 'right'){
		if(this.position0 === 0 || this.position0 === 3 || this.position0 === 6){
			isMoving = false;
			return false;
		}else{
			numberblock = this.getAt(this.position0 - 1);
			numberblock.move(_where);

			this.remove(numberblock);
			this.addAt(numberblock,this.position0 - 1);

			this.arrNumbs[this.position0] = this.arrNumbs[this.position0 - 1];
			this.arrNumbs[this.position0 - 1] = 0;
		}
	}else if(_where == 'left'){
		if(this.position0 === 2 || this.position0 === 5 || this.position0 === 8){
			isMoving = false;
			return false;
		}else{
			numberblock = this.getAt(this.position0);
			numberblock.move(_where);

			this.remove(numberblock);
			this.addAt(numberblock,this.position0);

			this.arrNumbs[this.position0] = this.arrNumbs[this.position0 + 1];
			this.arrNumbs[this.position0 + 1] = 0;
		}
	}

	isMoving = false;
	this.moves ++;
	var arrFinal = [1,2,3,4,5,6,7,8,0];
	if (this.arrNumbs.equals(arrFinal)){
		this.isFinal = true;
	}
	this.logBoard();
};
/*
Solver
Author: Arlefreak
*/

'use strict';

var Solver = function (boardI, boardF) {
    this.open = [];
    this.close = [];
    this.moves = 0;
    this.boardI = boardI;
    this.boardF = boardF;
    this.open.push(Phaser.Utils.extend(true,{},boardI));
};

Solver.prototype.solve = function(){
    var count = 0;

    while(!this.open[this.open.length - 1].equals(this.boardF) && this.open.length > 0){
        var boardC = this.open.pop();
        var position = 0;

        this.close.push(Phaser.Utils.extend(true,{},boardC));

        position = boardC.checkPosition(0);

        switch(position){
            case 0:
            this.swap(boardC,3,position);
            this.swap(boardC,4,position);
            break;
            case 1:
            this.swap(boardC,1,position);
            this.swap(boardC,3,position);
            this.swap(boardC,4,position);
            break;
            case 2:
            this.swap(boardC,1,position);
            this.swap(boardC,4,position);
            break;
            case 3:
            this.swap(boardC,2,position);
            this.swap(boardC,3,position);
            this.swap(boardC,4,position);
            break;
            case 4:
            this.swap(boardC,1,position);
            this.swap(boardC,2,position);
            this.swap(boardC,3,position);
            this.swap(boardC,4,position);
            break;
            case 5:
            this.swap(boardC,1,position);
            this.swap(boardC,2,position);
            this.swap(boardC,4,position);
            break;
            case 6:
            this.swap(boardC,2,position);
            this.swap(boardC,3,position);
            break;
            case 7:
            this.swap(boardC,1,position);
            this.swap(boardC,2,position);
            this.swap(boardC,3,position);
            break;
            case 8:
            this.swap(boardC,1,position);
            this.swap(boardC,2,position);
            break;
        }
        this.open.sort(this.compare);

        if(this.open.length !== 0){
            this.boardI.arrNumbs = this.open[this.open.length - 1].arrNumbs;
            
            count++;
            console.log('solving - ' + 'count: ' + count + ' - board: ' + this.open[0].arrNumbs + ' - closed-size: ' + this.close.length + ' - position: ' + position);
        }
    }
    this.boardI.draw();
    console.log('Solved: ' + this.open[this.open.length - 1].arrNumbs);
};

Solver.prototype.swap = function(boardC,direction,position){
    this.position = position;
    var bTemp = Phaser.Utils.extend(true,{},boardC);
    var arrTemp = [];

    switch(direction){
        case 1: // x <- 0
        bTemp.arrNumbs[this.position] =  bTemp.arrNumbs[this.position - 1];
        bTemp.arrNumbs[this.position - 1] = 0;
        break;
        case 2: // up
        switch (this.position){
            case 3:
            bTemp.arrNumbs[3] = bTemp.arrNumbs[0];
            bTemp.arrNumbs[0] = 0;
            break;
            case 4:
            bTemp.arrNumbs[4] = bTemp.arrNumbs[1];
            bTemp.arrNumbs[1] = 0;
            break;
            case 5:
            bTemp.arrNumbs[5] = bTemp.arrNumbs[2];
            bTemp.arrNumbs[2] = 0;
            break;
            case 6:
            bTemp.arrNumbs[6] = bTemp.arrNumbs[3];
            bTemp.arrNumbs[3] = 0;
            break;
            case 7:
            bTemp.arrNumbs[7] = bTemp.arrNumbs[4];
            bTemp.arrNumbs[4] = 0;
            break;
            case 8:
            bTemp.arrNumbs[8] = bTemp.arrNumbs[5];
            bTemp.arrNumbs[5] = 0;
            break;
        }
        break;
        case 3: // 0 -> x
        bTemp.arrNumbs[this.position] = bTemp.arrNumbs[this.position + 1];
        bTemp.arrNumbs[this.position + 1] = 0;
        break;
        case 4: // down
        switch (this.position){
            case 0:
            bTemp.arrNumbs[0] = bTemp.arrNumbs[3];
            bTemp.arrNumbs[3] = 0;
            break;
            case 1:
            bTemp.arrNumbs[1] = bTemp.arrNumbs[4];
            bTemp.arrNumbs[4] = 0;
            break;
            case 2:
            bTemp.arrNumbs[2] = bTemp.arrNumbs[5];
            bTemp.arrNumbs[5] = 0;
            break;
            case 3:
            bTemp.arrNumbs[3] = bTemp.arrNumbs[6];
            bTemp.arrNumbs[6] = 0;
            break;
            case 4:
            bTemp.arrNumbs[4] = bTemp.arrNumbs[7];
            bTemp.arrNumbs[7] = 0;
            break;
            case 5:
            bTemp.arrNumbs[5] = bTemp.arrNumbs[8];
            bTemp.arrNumbs[8] = 0;
            break;
        }
        break;
    }
    arrTemp = bTemp.arrNumbs;
    bTemp= new Board(arrTemp,boardC);
    bTemp.moves = boardC.moves + 1;
    bTemp.calcHueristic();
    bTemp.calcTotalCost();
    if(!this.checkClosed(bTemp)){
        this.open.push(bTemp);
    }
 };

 Solver.prototype.checkClosed = function(board){

    var i = 0;
    for (i = this.close.length - 1; i >= 0; i--) {
        if (this.close[i].equals(board)){
            return true;
        }
    }
    return false;
};

Solver.prototype.compare = function(a,b) {
    if (a.totalCost > b.totalCost){
        return -1;
    }
    if (a.totalCost < b.totalCost){
        return 1;
    }
    return 0;
};
(function () {
  'use strict';

  function Boot() {
  }

  Boot.prototype = {
    preload: function() {
      this.load.image('loadingBG', 'assets/res/images/LoadingBG.png');
      this.load.image('loading', 'assets/res/images/Loading.png');
      this.load.image('fondo', 'assets/res/textures/etapa-01-bn.jpg');
    },
    create: function() {
      game.input.maxPointers = 1;
      game.state.start('preloader');
    }
  };

  BootS = Boot;
}());

(function () {
  'use strict';
  function Preload() {
    this.preloadBarBg = null;
    this.preloadBar = null;
  }

  Preload.prototype = {
    preload: function() {
      game.stage.backgroundColor = '#000';

      this.preloadBarBg = this.add.sprite(300, 400, 'loadingBG');
      this.preloadBar = this.add.sprite(304, 405, 'loading');
      this.load.atlasJSONHash(
        'botones',
        'assets/res/spritesheets/botones.png',
        'assets/res/spritesheets/botones.json'
      );
      this.load.atlasJSONHash(
        'bloques',
        'assets/res/spritesheets/bloques-etapa-01.jpg',
        'assets/res/spritesheets/bloques-etapa-01.json'
      );

      this.load.setPreloadSprite(this.preloadBar);
    },
    create: function() {
      this.preloadBar.cropEnabled = false;
      game.state.start('mainmenu');
    }
  };

  PreloaderS = Preload;
}());

(function() {
  'use strict';
  function Menu() {}

  Menu.prototype = {
    create: function() {
      game.stage.backgroundColor = '#000';

      this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      this.enterKey.onDown.add(this.startGame, this);

      // this.bttPlay = game.add.button(game.world.centerX+200 , game.world.centerY+200, 'botones', this.startGame, this, 'play1', 'play0', 'play2');

      this.text = game.add.text(game.world.centerX, game.world.centerY - 240, "Rompecabezas", {
        font: "60px Source Code Pro",
        fill: "#fff",
        align: "center"
      });
      this.textTut = game.add.text(game.world.centerX, game.world.centerY + 40 ,
        "Usa las flechas para jugar\n Para comenzar presiona [ENTER]", {
        font: "45px Source Code Pro",
        fill: "#fff",
        align: "center"
      });
      this.text.anchor.setTo(0.5, 0.5);
      this.textTut.anchor.setTo(0.5, 0.5);
    },

    update: function() {
    },

    startGame: function() {
      console.log('start')
      game.state.start('play');
    },
    credits: function(){
      game.state.start('credits');
    }
  };
  MainMenuS = Menu;
}());

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
(function() {
	'use strict';
	function Credits() {}

	Credits.prototype = {
		create: function() {
			game.add.sprite(0, 0, 'frame');
			game.stage.backgroundColor = '#333333';

			this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
			this.enterKey.onDown.add(this.startGame, this);

			this.bttPlay = game.add.button(game.world.centerX , game.world.centerY + 75, 'btts', this.startGame, this, 'play1', 'play0', 'play2');
			this.bttAbout = game.add.button(game.world.centerX - 75 , game.world.centerY + 75, 'btts', this.mainMenu, this, 'about1', 'about0', 'about2');
			this.text = game.add.text(game.world.centerX, game.world.centerY - 20, "Rompecabezas\n Papitas\n", {
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
	CreditsS = Credits;
}());

(function() {
    var blockDimension = 300;
    'use strict';
    function Play() {}
    Play.prototype = {
        create: function() {
            game.stage.backgroundColor = '#000';
            game.add.sprite(0, blockDimension/2, 'fondo');
            this.botonesolve = game.add.button(
                game.world.centerX - 75 , this.world.height - 75,
                'botones', function(){this.quitGame('mainmenu')}, this,
                'restart1', 'restart0', 'restart2');

            this.bttPlay = game.add.button(
                game.world.centerX , this.world.height - 75,
                'botones', this.shuffleBoard, this,
                'random1', 'random0', 'random2');
            
            this.movesTxt = game.add.text(game.world.centerX, 35, 'Movimientos: ', {
                font: "40px Source Code Pro",
                fill: '#fff',
                align: 'center'
            });
            this.movesTxt.anchor.setTo(0.5, 0.5);

            this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

            this.board = new Board();
            this.board.genRandom();
            this.board.draw();

            this.upKey.onDown.add(function () { this.board.move('up'); },this);
            this.downKey.onDown.add(function () { this.board.move('down'); },this);
            this.leftKey.onDown.add(function () { this.board.move('left'); },this);
            this.rightKey.onDown.add(function () { this.board.move('right'); },this);
        },
        update: function() {
            this.movesTxt.setText('Movimientos: ' + this.board.moves);
            if(this.board.isFinal){
                localStorage.setItem('lastScore',this.board.moves);
                this.quitGame('leaderboards');
            }
        },
        
        quitGame: function (state) {
            this.board.clearBoard();
            this.board.destroy();
            this.board = null;
            
            this.upKey.onDown.removeAll();
            this.downKey.onDown.removeAll();
            this.leftKey.onDown.removeAll();
            this.rightKey.onDown.removeAll();

            this.upKey = null;
            this.downKey = null;
            this.leftKey = null;
            this.rightKey = null;
            isMoving = false;
            game.state.start(state);
        },

        shuffleBoard: function (){
            console.clear();
            this.board.genRandom();
            //this.board.genTest();
            this.board.draw();
        },

        solveBoard: function (){
            var fn  = new Board();
            fn.genFinal();
            var solver = new Solver(this.board,fn);
            solver.solve();
        }
    };
    PlayS = Play;
}());