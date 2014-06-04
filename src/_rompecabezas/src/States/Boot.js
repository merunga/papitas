(function () {
  'use strict';

  function Boot() {
  }

  Boot.prototype = {
    preload: function() {
      this.load.image('loadingBG', '/assets/res/img/LoadingBG.png');
      this.load.image('loading', '/assets/res/img/Loading.png');
      this.load.image('frame', '/assets/res/textures/frame.png');
    },
    create: function() {
      game.input.maxPointers = 1;
      game.state.start('preloader');
    }
  };

  BootS = Boot;
}());
