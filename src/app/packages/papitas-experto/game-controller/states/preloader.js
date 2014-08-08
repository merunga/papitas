function Preload() {
  this.preloadBarBg = null;
  this.preloadBar = null;
}

Preload.prototype = {
  preload: function() {
    this.preloadBarBg = this.add.sprite(300, 400, 'loadingBG');
    this.preloadBar = this.add.sprite(304, 405, 'loading');
    this.load.atlasJSONHash(
      'botones',
      'assets/spritesheets/botones.png',
      'assets/spritesheets/botones.json'
    );

    this.load.setPreloadSprite(this.preloadBar);
  },
  create: function() {
    this.preloadBar.cropEnabled = false;
    Experto.game.state.start('play');
  }
};

PreloaderState = Preload;
