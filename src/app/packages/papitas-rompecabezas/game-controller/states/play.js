function Play() {}

Play.prototype = {
  create: function() {
    var game = Rompecabezas.game;

    game.stage.backgroundColor = '#000';
    game.add.sprite(0, 0, 'fondo');

    this.efectosDeSonido = Rompecabezas.sonidos.efectosDeSonido;

    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    function onPointerMove(playState, pointer) {
      if(pointer.isDown && !Rompecabezas.isDragging) {
        Rompecabezas.isDragging = true;
      } else if(pointer.isUp && Rompecabezas.isDragging) {
        var currPos = pointer.position;
        var downPos = pointer.positionDown;

        if(Math.abs(currPos.x-downPos.x) > Math.abs(currPos.y-downPos.y)) {
          // drag eje X
          if(currPos.x < downPos.x) {
            // izquierda
            move(playState, 'left');
          } else {
            // derecha
            move(playState, 'right');
          }
        } else {
          // drag eje Y
          if(currPos.y < downPos.y) {
            // arriba
            move(playState, 'up');
          } else {
            // abajo
            move(playState, 'down');
          }
        }
        Rompecabezas.isDragging = false;
      }
    }

    function move(playState, direction) {
      if(playState.board.move(direction)) {
        playState.efectosDeSonido.play('movimiento');
      }
    }

    var playState = this;
    game.input.addMoveCallback(function(pointer) {
      onPointerMove(playState, pointer);
    });

    this.upKey.onDown.add(function () { move(this, 'up'); },this);
    this.downKey.onDown.add(function () { move(this, 'down'); },this);
    this.leftKey.onDown.add(function () { move(this, 'left'); },this);
    this.rightKey.onDown.add(function () { move(this, 'right'); },this);

    this.spaceKey.onDown.add(function () { this.solveBoard(); },this);

    this.board = new Board();
    this.board.genRandom();
    this.board.draw();
  },
  update: function() {
    Session.set('rompecabezasMovimientos',this.board.moves);
    if(this.board.isFinal){
      //localStorage.setItem('lastScore',this.board.moves);
      this.quitGame();
    }
  },
  
  quitGame: function (state) {
    console.log('quit game')
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
    //Rompecabezas.game.state.start(state);
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

    //SolverAS.create(this.board);
  }
};

PlayState = Play;
