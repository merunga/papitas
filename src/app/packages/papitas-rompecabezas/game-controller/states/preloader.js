function Preload() {
  this.preloadBarBg = null;
  this.preloadBar = null;
}

Preload.prototype = {
  preload: function() {
    var game = Rompecabezas.game;
    game.stage.backgroundColor = '#000';

    var etapa = Session.get('rompecabezasEtapaElegida');
    this.load.image('fondo', 'assets/images/etapas/'+etapa.slug+'-bn.jpg');

    this.preloadBarBg = this.add.sprite(300, 400, 'loadingBG');
    this.preloadBar = this.add.sprite(304, 405, 'loading');
    this.load.atlasJSONHash(
      'botones',
      'assets/spritesheets/botones.png',
      'assets/spritesheets/botones.json'
    );

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
  }
};

PreloaderState = Preload;
