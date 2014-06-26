function timer() {
  if(!Session.get('rompecabezasJueoPausado')) {
    var timeElapsed = Session.get('rompecabezasTiempo') || 0;
    timeElapsed++;
    Session.set('rompecabezasTiempo',timeElapsed);
  }
};

Rompecabezas = {
  isMoving: false,
  blockDimension: 300,
  sonidos: {},
  init: function() {
    Rompecabezas.isMoving = false;
    
    if(Rompecabezas.game) {
      Rompecabezas.game.destroy();
    }

    var game = Rompecabezas.game = new Phaser.Game(900, 900, Phaser.AUTO, 'rompecabezas-container');

    game.state.add('boot', BootState);
    game.state.add('preloader', PreloaderState);
    game.state.add('play', PlayState);

    game.state.start('boot');
  },
  restart: function() {
    Rompecabezas.game.state.states.play.shuffleBoard();
    resetContadores();
  },
  resuelto: function() {
    Session.set('rompecabezasStep','fin');
    if(Rompecabezas.timer) {
      Meteor.clearInterval(Rompecabezas.timer);
    }
    Rompecabezas.sonidos.finalEtapa.play();
  }
};

function resetContadores() {
  Session.set('rompecabezasMovimientos',0);
  Session.set('rompecabezasTiempo',0);
  if(Rompecabezas.timer) {
    Meteor.clearInterval(Rompecabezas.timer);
  }
  Rompecabezas.timer = Meteor.setInterval(timer, 1000);
}

Deps.autorun(function() {
  Session.get('rompecabezasEtapaElegida');
  resetContadores();
});

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
