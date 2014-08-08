function timer() {
  if(!Session.get('expertoJueoPausado')) {
    var timeElapsed = Session.get('expertoTiempo') || 0;
    timeElapsed++;
    Session.set('expertoTiempo',timeElapsed);
  }
};

Experto = {
  isMoving: false,
  blockDimension: 300,
  sonidos: {},
  init: function() {
    Experto.isMoving = false;
    
    if(Experto.game) {
      Experto.game.destroy();
    }

    var game = Experto.game = new Phaser.Game(1, 1, Phaser.AUTO, 'experto-container');

    game.state.add('boot', BootState);
    game.state.add('preloader', PreloaderState);

    game.state.start('boot');
  },
  restart: function() {
    Experto.game.state.states.play.shuffleBoard();
    resetContadores();
  },
  resuelto: function() {
    Session.set('expertoStep','fin');
    if(Experto.timer) {
      Meteor.clearInterval(Experto.timer);
    }
    Experto.sonidos.finalEtapa.play();
  }
};

function resetContadores() {
  Session.set('expertoMovimientos',0);
  Session.set('expertoTiempo',0);
  if(Experto.timer) {
    Meteor.clearInterval(Experto.timer);
  }
  Experto.timer = Meteor.setInterval(timer, 1000);
}

Deps.autorun(function() {
  Session.get('expertoEtapaElegida');
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
