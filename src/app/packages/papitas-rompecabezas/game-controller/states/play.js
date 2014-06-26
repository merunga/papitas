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

    // function queue(funcs, delay) {
    //     var i;
    //     var o;

    //     setTimeout(function run() {
    //         o = funcs.shift();
    //         if (o !== undefined) {
    //             o.fnc(o.args[0], o.args[1]);
    //             setTimeout(run, delay);
    //         }
    //     }, delay);
    // }

    // var blocks = this.board.arrNumbs;
    // var boardAS = new BoardAS(blocks);
    // var solution = Rompecabezas.solver = SolverAS.create(boardAS);
    // // Should always be solvable by the way we have set it up.

    // console.log(solution);
    // if (solution.isSolvable) {
    //     var q = [];
    //     var boards = solution.getSolution();

    //     for (var i = 0; i < boards.length; i++) {
    //         if (boards[i].move !== undefined) {
    //             console.log(boards[i].move[0], boards[i].move[1])
    //             console.log(board);
    //         }
    //     }

    //     queue(q, 200);
    // } else {
    //     console.log("No solution found");
    // }

  },
  update: function() {
    var that = this;
    Deps.nonreactive(function() {
      if(that.board) {
        Session.set('rompecabezasMovimientos',that.board.moves);
        if(that.board.isFinal){
          //localStorage.setItem('lastScore',this.board.moves);
          that.quitGame();
          Rompecabezas.resuelto()
        }
      }
    });
  },
  
  quitGame: function (state) {
    this.board.clearBoard();
    this.board.destroy();
    this.board = null;
    
    this.upKey.onDown.removeAll();
    this.downKey.onDown.removeAll();
    this.leftKey.onDown.removeAll();
    this.rightKey.onDown.removeAll();
    this.spaceKey.onDown.removeAll();

    this.upKey = null;
    this.downKey = null;
    this.leftKey = null;
    this.rightKey = null;
    this.spaceKey = null;

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
  }
};

PlayState = Play;
