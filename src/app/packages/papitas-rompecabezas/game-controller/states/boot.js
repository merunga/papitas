function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('loadingBG', 'assets/images/LoadingBG.png');
    this.load.image('loading', 'assets/images/Loading.png');

    // http://opengameart.org/content/stone-rock-or-wood-moved-sound
    this.load.audio('efectos', 'assets/audio/efectos.mp3', true);

    // http://opengameart.org/content/roof-of-the-world
    this.load.audio('cortina', 'assets/audio/cortina.ogg', true);
    this.load.onFileComplete.add(function(percent, asset) {
      if(asset == 'cortina') {
        var cortinaDeFondo = Rompecabezas.cortinaDeFondo = Rompecabezas.game.add.audio('cortina',1,true);
        cortinaDeFondo.play();
      }
    });

    
  },
  create: function() {
    Rompecabezas.game.input.maxPointers = 1;
  }
};

BootState = Boot;
