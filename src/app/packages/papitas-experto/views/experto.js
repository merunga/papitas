var events = {
  'click [data-action="comenzar"]': function(e, tmpl) {
    e.preventDefault();
    Session.set('expertoStep','identificarPapas');
    _(['expertoTiempo','expertoPapasActuales','expertoFallos',
      'expertoPapasAAdivinar','expertoPapasAdivinadas']).each( function(varname) {
      Session.set(varname, undefined);
    });
    return false;
  },
  'click [data-action="papas-identificadas"]': function(e, tmpl) {
    e.preventDefault();
    Session.set('expertoStep','juego');
    return false;
  },
  'click [data-action="volver-al-comienzo"]': function(e, tmpl) {
    e.preventDefault();
    bootbox.confirm("¿Estás segur@ de que quieres abandonar el juego?", function(result) {
      if(result) {
        Session.set('expertoStep','identificarPapas');
      }
    }); 
    return false;
  },
  'click [data-action="toggle-sound"]': function(e, tmpl) {
    var newMute = !Experto.game.sound.mute;
    Experto.game.sound.mute = newMute;
    Session.set('expertoIsMuted', newMute);
  },
  'change [data-action="toggle-help"]': function(e, tmpl) {
    var helpOn = !(Session.get('expertoHelpOn') || false);
    Session.set('expertoHelpOn', helpOn);
  },
  'click [data-action="reiniciar"]': function(e, tmpl) {
    e.preventDefault();
    bootbox.confirm("¿Estás segur@ de que quieres abandonar el juego?", function(result) {
      if(result) {
        Experto.restart();
      }
    }); 
    return false;
  },
  'click [data-action="imprimir"]': function(e, tmpl) {
    e.preventDefault();
    window.print(); 
    return false;
  }
};

UI.registerHelper('expertoTiempo', function() {
  return Session.get('expertoTiempo');
});

var PAPAS_A_MOSTRAR = 2;
var PAPAS_A_ELEGIR  = 2;

Template.experto.rendered = function() {
  Experto.init();
}

Template.experto.step = function() {
  var step = Session.get('expertoStep') || 'intro';
  return Template['experto'+_.capitalize(step)];
}

Template.experto.events(events);

Template.expertoIntro.events(events);

Template.expertoIdentificarPapas.rendered = function(tmpl) {
  Experto.game.state.start('preloader');
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Template.expertoIdentificarPapas.papas = function() {
  var numeros = [];
  for(var i=0; i<PAPAS_A_MOSTRAR; i++) {
    numeros.push(getRandomInt(1,Papas.find().count()+1));
  }
  Session.set('expertoPapasActuales', numeros);
  return safePapas(numeros);
}

Template.expertoJuego.rendered = function() {
  Session.set('expertoFallos',0);

  var tmpl = this;
  var numerosAAdivinar = [];
  for(var i=0; i<PAPAS_A_ELEGIR; i++) {
    var numerosDisponibles = Session.get('expertoPapasActuales');
    numerosAAdivinar.push(numerosDisponibles[getRandomInt(0,numerosDisponibles.length-1)]);
  };
  Session.set('expertoPapasAAdivinar', numerosAAdivinar);
}

Template.expertoJuegoOption.rendered = function() {  
  var tmpl = this;
  tmpl.$('.experto-papa').draggable({ revert: function(droppable) {
    if(!droppable) {
      Session.set('expertoFallos',Session.get('expertoFallos')+1);
    }
    return !droppable
  } });
}

Deps.autorun(function(){
  var papasAdivinadas = Session.get('expertoPapasAdivinadas');
  var papasAAdivinar  = Session.get('expertoPapasAAdivinar');

  if(papasAdivinadas && papasAAdivinar
      && papasAdivinadas.length == papasAAdivinar.length
      && _(_(papasAAdivinar).difference(papasAdivinadas)).isEmpty()) {
    Session.set('expertoStep', 'fin');
  }
});

Template.expertoJuegoIncognita.rendered = function() {
  var tmpl = this;
  tmpl.$('.experto-incognita').droppable({
    accept: function(dropElem) {
      return $(dropElem).hasClass("experto-papa")
        && $(this).data('papanumero') == $(dropElem).data('papanumero');
    },
    drop: function(event, ui) {
      tmpl.$(this).addClass("resulta");
      var papaNumero = parseInt($(this).data('papanumero'));
      var pa = Session.get('expertoPapasAdivinadas') || [];
      if(pa.indexOf(papaNumero) < 0) {
        pa.push(papaNumero);
        Session.set('expertoPapasAdivinadas',pa);
      }
    }
  });
}

function papasSlice(ini,fin) {
  var numeros = Session.get('expertoPapasActuales');
  return safePapas(numeros.slice(ini,fin));
}

Template.expertoJuego.papas1 = function() {
  return papasSlice(0, (PAPAS_A_MOSTRAR / 2));
}

Template.expertoJuego.papas2 = function() {
  return papasSlice((PAPAS_A_MOSTRAR / 2), PAPAS_A_MOSTRAR);
}

function safePapas(numerosArray) {
  if(numerosArray) {
    return Papas.find({numero:{$in:numerosArray}});
  }
}


Template.expertoJuego.papasAAdivinar = function() {
  return safePapas(Session.get('expertoPapasAAdivinar'));
}

Template.expertoJuego.events(events);


Template.expertoFin.papasAdivinadas = function() {
  return safePapas(Session.get('expertoPapasAdivinadas'))
}

Template.expertoFin.events(events);
