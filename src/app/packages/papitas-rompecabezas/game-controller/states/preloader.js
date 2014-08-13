function Preload() {
  this.preloadBarBg = null;
  this.preloadBar = null;
}

function timerFunc() {
  if(!Session.get('rompecabezasJuegoPausado')) {
    var timeElapsed = Session.get('rompecabezasTiempo') || 0;
    timeElapsed++;
    Session.set('rompecabezasTiempo',timeElapsed);
  }
};

Preload.prototype = {
  preload: function() {
    var game = Rompecabezas.game;
    game.stage.backgroundColor = '#000';

    var etapa = Session.get('rompecabezasEtapaElegida');
    this.load.image('fondo', 'assets/images/etapas/'+etapa.slug+'-bn.jpg');

    this.preloadBarBg = this.add.sprite(300, 400, 'loadingBG');
    this.preloadBar = this.add.sprite(304, 405, 'loading');

    this.load.atlasJSONHash(
      'bloques',
      'assets/images/etapas/'+etapa.slug+'.jpg',
      'assets/spritesheets/bloques.json'
    );

    this.load.setPreloadSprite(this.preloadBar);
  },
  create: function() {
    this.preloadBar.cropEnabled = false;
    Rompecabezas.game.state.start('play');
    Rompecabezas.timer = Meteor.setInterval(timerFunc, 1000);
  }
};

PreloaderState = Preload;
