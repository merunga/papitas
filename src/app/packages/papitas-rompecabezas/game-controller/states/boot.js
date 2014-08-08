function Boot() {
}

Boot.prototype = {
  preload: function() {
    // http://opengameart.org/content/roof-of-the-world
    this.load.audio('cortina', 'assets/audio/cortina.ogg', true);
    this.load.onFileComplete.add(function(percent, asset) {
      if(asset == 'cortina') {
        var cortinaDeFondo = Rompecabezas.sonidos.cortinaDeFondo = Rompecabezas.game.add.audio('cortina',1,true);
        cortinaDeFondo.play();
      } else if(asset == 'efectos') {
        var efectosDeSonido = Rompecabezas.sonidos.efectosDeSonido = Rompecabezas.game.add.audio('efectos');
        efectosDeSonido.addMarker('movimiento', 0.16, 0.232);
      } else if(asset == 'finalEtapa') {
        Rompecabezas.sonidos.finalEtapa = Rompecabezas.game.add.audio('finalEtapa',8);
      }
    });

    this.load.image('loadingBG', 'assets/images/LoadingBG.png');
    this.load.image('loading', 'assets/images/Loading.png');

    // http://opengameart.org/content/stone-rock-or-wood-moved-sound
    this.load.audio('efectos', 'assets/audio/experto-nombres.mp3', true);

    // http://opengameart.org/content/well-done
    this.load.audio('finalEtapa', 'assets/audio/final-etapa.ogg', true);
  },
  create: function() {
    Rompecabezas.game.input.maxPointers = 1;
  }
};

BootState = Boot;
