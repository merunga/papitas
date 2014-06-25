Rompecabezas = {
  isMoving: false,
  blockDimension: 300,
  sonidos: {},
  init: function() {
    Rompecabezas.isMoving = false;
    
    if(Rompecabezas.game) {
      Rompecabezas.game.destroy();
    }

    Session.set('rompecabezasMovimientos',0);
    var game = Rompecabezas.game = new Phaser.Game(900, 900, Phaser.AUTO, 'rompecabezas-container');

    game.state.add('boot', BootState);
    game.state.add('preloader', PreloaderState);
    game.state.add('play', PlayState);

    game.state.start('boot');
  },
  restart: function() {
    Rompecabezas.game.state.states.play.shuffleBoard();
    Session.set('rompecabezasMovimientos',0);
  },
  resuelto: function() {
    Session.set('rompecabezasStep','fin');
    Session.set('rompecabezasMovimientos',0);
    Rompecabezas.sonidos.finalEtapa.play()
  }
};

var WebFontConfig;
WebFontConfig = {
  google: { families: [ 'Source+Code+Pro::latin' ] }
};

(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
  '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();
