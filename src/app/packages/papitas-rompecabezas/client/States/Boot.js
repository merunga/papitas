function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('loadingBG', 'assets/res/images/LoadingBG.png');
    this.load.image('loading', 'assets/res/images/Loading.png');
    this.load.image('fondo', 'assets/res/textures/etapa-01-bn.jpg');
  },
  create: function() {
    game.input.maxPointers = 1;
    game.state.start('preloader');
  }
};

var BootS = Boot;
