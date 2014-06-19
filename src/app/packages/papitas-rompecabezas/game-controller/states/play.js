function Play() {}

Play.prototype = {
  create: function() {
    var game = Rompecabezas.game;

    game.stage.backgroundColor = '#000';
    game.add.sprite(0, Rompecabezas.blockDimension/2, 'fondo');
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

    this.efectosDeSonido = Rompecabezas.sonidos.efectosDeSonido;

    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.board = new Board();
    this.board.genRandom();
    this.board.draw();

    function move(playState, direction) {
      if(playState.board.move(direction)) {
        playState.efectosDeSonido.play('movimiento');
      }
    }

    this.upKey.onDown.add(function () { move(this, 'up'); },this);
    this.downKey.onDown.add(function () { move(this, 'down'); },this);
    this.leftKey.onDown.add(function () { move(this, 'left'); },this);
    this.rightKey.onDown.add(function () { move(this, 'right'); },this);

    this.spaceKey.onDown.add(function () { this.solveBoard(); },this);
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

    Rompecabezas.isMoving = false;
    Rompecabezas.game.state.start(state);
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

PlayState = Play;
