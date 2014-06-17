
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

  var PreloaderS = Preload;

