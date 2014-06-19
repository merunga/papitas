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
  'click [data-action="toggle-sound"]': function(e, tmpl) {
    var newMute = !Rompecabezas.game.sound.mute;
    Rompecabezas.game.sound.mute = newMute;
    Session.set('rompecabezasIsMuted', newMute);
  },
  'change [data-action="toggle-help"]': function(e, tmpl) {
    var helpOn = !(Session.get('rompecabezasHelpOn') || false);
    Session.set('rompecabezasHelpOn', helpOn);
  }
};

Template.rompecabezas.rendered = function() {
  Rompecabezas.init();
}

Template.rompecabezas.step = function() {
  var step = Session.get('rompecabezasStep') || 'intro';
  return Template['rompecabezas'+_.capitalize(step)];
}

Template.rompecabezas.events(events);

Template.rompecabezasIntro.events(events);


Template.rompecabezasElegirEtapa.etapas = function() {
  return Etapas.find();
}

Template.rompecabezasElegirEtapa.events(events);


Template.rompecabezasJuego.rendered = function(tmpl) {
  Rompecabezas.game.state.start('preloader');
}

Template.rompecabezasJuego.events(events);


Template.rompecabezasFin.etapaCompletada = function() {
  return Session.get('rompecabezasEtapaElegida');
}

Template.rompecabezasFin.events(events);
