var PAPAS_A_MOSTRAR = 10;
var PAPAS_A_ELEGIR  = 5;

function comenzar() {
  Session.set('expertoStep','identificarPapas');
  _(['expertoTiempo','expertoPapasActuales','expertoFallos',
    'expertoPapasAAdivinar','expertoPapasAdivinadas']).each( function(varname) {
    Session.set(varname, undefined);
  });
}

var events = {
  'click [data-action="comenzar"]': function(e, tmpl) {
    e.preventDefault();
    comenzar();
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
    var toMute = !Experto.sonidos.manager._muted;
    if( toMute ) {
      Experto.sonidos.manager.mute();
    } else {
      Experto.sonidos.manager.unmute();
    }
    Session.set('expertoIsMuted', toMute);
  },
  'click [data-action="set-papa-actual"]': function(e, tmpl) {
    e.preventDefault();
    Session.set('expertoPapaConsultada', this.numero);
  },
  'click [data-action="mezclar"]': function(e, tmpl) {
    e.preventDefault();
    Session.set('expertoPapasActuales', undefined);
  },
  'click [data-action="presentarse"]': function(e, tmpl) {
    e.preventDefault();
    var $papa = tmpl.$(e.currentTarget);
    var papaNro = $papa.data('papanumero');
    var papa = Papas.findOne({numero: papaNro})
    $papa.find('.centro').grumble({
      text: papa.nombre, 
      angle: 85, 
      distance: 0, 
      hideAfter: papa.audio.dur
    });
    
    Experto.sonidos.papas.play(papa.numero);
    return false;
  }
};

UI.registerHelper('expertoTiempo', function() {
  return Session.get('expertoTiempo');
});

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
}

function getRandomInt(min, max, notIn) {
  var trial;
  do {
    trial = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (notIn.indexOf(trial) > -1);
  return trial;
}

function papasAIdentificar() {
  var papasActuales = Session.get('expertoPapasActuales');
  if(!papasActuales) {
    papasActuales = [];
    for(var i=0; i<PAPAS_A_MOSTRAR; i++) {
      papasActuales.push(getRandomInt(1, Papas.find().count(), papasActuales));
    }
    Session.set('expertoPapasActuales', papasActuales);
  }
  return safePapas(papasActuales);
}

Template.expertoIdentificarPapas.papas1 = function() {
  papasAIdentificar();
  return papas1();
}

Template.expertoIdentificarPapas.papas2 = function() {
  papasAIdentificar();
  return papas2();
}

Template.expertoJuego.rendered = function() {
  Session.set('expertoFallos',0);

  var tmpl = this;
  var numerosAAdivinar = [];
  var indexesVisitados = [];
  for(var i=0; i<PAPAS_A_ELEGIR; i++) {
    var numerosDisponibles = Session.get('expertoPapasActuales');
    var randomIdx = getRandomInt(0, numerosDisponibles.length-1, indexesVisitados);
    numerosAAdivinar.push(numerosDisponibles[randomIdx]);
    indexesVisitados.push(randomIdx);
  };
  Session.set('expertoPapasAAdivinar', numerosAAdivinar);
}

Template.expertoJuego.events({
  'click [data-action="reiniciar"]': function(e, tmpl) {
    e.preventDefault();
    bootbox.confirm("¿Estás segur@ de que quieres abandonar el juego?", function(result) {
      if(result) {
        comenzar();
      }
    }); 
    return false;
  }
});

Template.expertoJuegoOption.rendered = function() {  
  var tmpl = this;
  tmpl.$('.experto-papa').draggable({ revert: function(droppable) {
    if(!droppable) {
      Session.set('expertoFallos',Session.get('expertoFallos')+1);
      Experto.sonidos.incorrecto.play();
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
    Experto.camion.go(function() {
      Session.set('expertoStep', 'fin');
    });
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
      ui.draggable.draggable( "destroy" );
      tmpl.$(this).addClass("resuelta");
      var papaNumero = parseInt($(this).data('papanumero'));
      var pa = Session.get('expertoPapasAdivinadas') || [];
      if(pa.indexOf(papaNumero) < 0) {
        pa.push(papaNumero);
        Session.set('expertoPapasAdivinadas',pa);
      }
      Experto.sonidos.correcto.play();
    }
  });
}

function papasSlice(ini,fin) {
  var numeros = Session.get('expertoPapasActuales');
  return safePapas(numeros.slice(ini,fin));
}

function papas1() {
  return papasSlice(0, (PAPAS_A_MOSTRAR / 2));
}

function papas2() {
  return papasSlice((PAPAS_A_MOSTRAR / 2), PAPAS_A_MOSTRAR);
}

Template.expertoJuego.papas1 = function() {
  return papas1();
} 

Template.expertoJuego.papas2 = function() {
  return papas2();  
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

function papasAdivinadas() {
  return safePapas(Session.get('expertoPapasAdivinadas'));
}

Template.expertoFin.rendered = function() {
  Experto.sonidos.final.play()
}

Template.expertoFin.papasAdivinadas = function() {
  return papasAdivinadas();
}

Template.expertoFin.papasCamposExtra = function() {
  return [
    { field: 'nombre',              label: 'Nombre',  mainField: true },
    { printOnly: true,              label: 'Colorea' },
    { field: 'significadoNombre',   label: 'Significado del nombre' },
    { field: 'nombreAlternativo',   label: 'Nombre alternativo' },
    { field: 'colorFlor',           label: 'Color principal de la flor' },
    { field: 'toleranciaGranizada', label: 'Tolerancia a la granizada' },
    { field: 'colorPulpa',          label: 'Color principal de la pulpa del tubérculo' },
    { field: 'formaRara',           label: 'Forma rara' },
    { field: 'toleranciaHelada',    label: 'Tolerancia a la helada'},
    { field: 'usoCocina',           label: 'Uso en la cocina'}
  ];
}

Template.expertoFin.papaConsultada = function(field) {
  var numeroPapa = Session.get('expertoPapaConsultada');
  if( !numeroPapa ) {
    papa = papasAdivinadas().fetch()[0];
    Session.set('expertoPapaConsultada', papa.numero);
  } else {
    papa = Papas.findOne({ numero:numeroPapa })
  }
  return papa[field]
}

Template.expertoFin.papaConsultadaPrint = function(papa, field) {
  return papa[field]
}

Template.expertoFin.events(events);
Template.expertoFin.events({
  'click [data-action="imprimir"]': function(e, tmpl) {
    e.preventDefault();
    window.print(); 
    return false;
  }
});

Template.expertoPapaAdivinada.active = function() {
  if( this.numero == Session.get('expertoPapaConsultada') ) {
    return "active";
  }
}

Template.expertoPapaAdivinada.events(events);
