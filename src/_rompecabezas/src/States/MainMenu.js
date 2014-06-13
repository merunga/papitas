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
