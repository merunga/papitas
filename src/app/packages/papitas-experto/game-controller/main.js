Experto = {
  sonidos: {
    manager: Howler
  },
  init: function() {
    Experto.sonidos.cortina = new Howl({
      urls: ['assets/audio/cortina.mp3', 'assets/audio/cortina.ogg'],
      autoplay: true,
      loop: true
    });

    var sprite = {};
    Papas.find().forEach(function(papa) {
      sprite[papa.numero] = [papa.audio.ini, papa.audio.dur];
    })
    Experto.sonidos.papas = new Howl({
      urls: ['assets/audio/papas.ogg', 'assets/audio/papas.mp3'],
      sprite: sprite,
      volume: 6
    });

    Experto.sonidos.final = new Howl({
      urls: ['assets/audio/final-etapa.mp3', 'assets/audio/final-etapa.ogg'],
      volume: 7
    });

    Experto.sonidos.correcto = new Howl({
      urls: ['assets/audio/correcto.mp3', 'assets/audio/correcto.ogg'],
      volume: 5
    });

    Experto.sonidos.incorrecto = new Howl({
      urls: ['assets/audio/incorrecto.mp3', 'assets/audio/incorrecto.ogg'],
      volume: 3
    });

    Experto.camion = new Camion('#camion-container');
  },
  restart: function() {
    // Experto.game.state.states.play.shuffleBoard();
    // resetContadores();
  },
  resuelto: function() {
    Session.set('expertoStep','fin');
    // if(Experto.timer) {
    //   Meteor.clearInterval(Experto.timer);
    // }
    Experto.sonidos.finalEtapa.play();
  }
};

// function resetContadores() {
//   Session.set('expertoMovimientos',0);
//   Session.set('expertoTiempo',0);
//   if(Experto.timer) {
//     Meteor.clearInterval(Experto.timer);
//   }
//   Experto.timer = Meteor.setInterval(timer, 1000);
// }

// Deps.autorun(function() {
//   Session.get('expertoEtapaElegida');
//   resetContadores();
// });

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
