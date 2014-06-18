Rompecabezas = {
  isMoving: false,
  blockDimension: 300,
  init: function() {
    Rompecabezas.isMoving = false;
    
    if(Rompecabezas.game) {
      Rompecabezas.game.destroy();
    }
    var game = Rompecabezas.game = new Phaser.Game(900, 1200, Phaser.AUTO, 'rompecabezas-container');

    game.state.add('boot', BootState);
    game.state.add('preloader', PreloaderState);
    game.state.add('credits', CreditsState);
    game.state.add('leaderboards', LeaderBoardsState);
    game.state.add('play', PlayState);

    game.state.start('boot');
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
