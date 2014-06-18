function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('loadingBG', 'assets/images/LoadingBG.png');
    this.load.image('loading', 'assets/images/Loading.png');

    var etapa = Session.get('rompecabezasEtapaElegida');
    this.load.image('fondo', 'assets/images/etapas/'+etapa.slug+'-bn.jpg');
  },
  create: function() {
    game.input.maxPointers = 1;
    game.state.start('preloader');
  }
};

BootState = Boot;
