isMoving = undefined;

var events = {
  'click [data-action="comenzar"]': function(e, tmpl) {
    e.preventDefault();
    Session.set('rompecabezasEtapaElegida',undefined);
    Session.set('rompecabezasStep','elegirEtapa');
    return false;
  },
  'click [data-action="etapa-elegida"]': function(e, tmpl) {
    e.preventDefault();
    var etapa = Etapas.findOne({numero: this.numero});
    Session.set('rompecabezasEtapaElegida', etapa);
    Session.set('rompecabezasStep','juego');
    return false;
  },
  'click [data-action="volver-al-comienzo"]': function(e, tmpl) {
    e.preventDefault();
    bootbox.confirm("¿Estás segur@ de que quieres abandonar el juego?", function(result) {
      if(result) {
        Session.set('rompecabezasEtapaElegida',undefined);
        Session.set('rompecabezasStep','elegirEtapa');
      }
    }); 
    return false;
  },
};

Template.rompecabezas.step = function() {
  var step = Session.get('rompecabezasStep') || 'intro';
  return Template['rompecabezas'+_.capitalize(step)];
}


Template.rompecabezasIntro.events(events);


Template.rompecabezasElegirEtapa.etapas = function() {
  return Etapas.find();
}

Template.rompecabezasElegirEtapa.events(events);


Template.rompecabezasJuego.rendered = function(tmpl) {
  isMoving = false;
  game = new Phaser.Game(900, 1200, Phaser.AUTO, 'rompecabezas-container');

  game.state.add('boot', BootState);
  game.state.add('preloader', PreloaderState);
  game.state.add('credits', CreditsState);
  game.state.add('leaderboards', LeaderBoardsState);
  game.state.add('play', PlayState);

  game.state.start('boot');
}

Template.rompecabezasJuego.events(events);


Template.rompecabezasFin.etapaCompletada = function() {
  return Session.get('rompecabezasEtapaElegida');
}

Template.rompecabezasFin.events(events);
