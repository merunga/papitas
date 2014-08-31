Camion = function (container, cb) {
  var self = this;
  self._init(container, cb);
};

Camion.prototype._init = function(container, cb) {
  var self = this;
  if(container) {
    self._containerId = container;
  } else {
    container = self._containerId;
  }
  self.snapContainer = Snap(container);
  self.ready = false;

  Snap.load("assets/images/camion.svg", function (f) {
    self.snapElement = f.select("svg");
    self.camion = self.snapElement.select("#camion");
    // self.camion.drag();
    self.camion.attr({opacity: 0, transform: "matrix(1,0,0,1,-290,0)"});
    self.snapContainer.append(self.snapElement);
    self.ready = true;
    if(cb) {
      cb(self);
    }
  });

  self.sonidos = {
    arranque: new Howl({
      urls: ['assets/audio/camion/arranque.mp3', 'assets/audio/camion/arranque.ogg'],
      volume: 7,
      onend: function() {
        self.sonidos.marcha.play();
      }
    }),
    marcha: new Howl({
      urls: ['assets/audio/camion/marcha.mp3', 'assets/audio/camion/marcha.ogg'],
      volume: 7,
      loop: true
    })
  };
};

Camion.prototype._destroy = function() {
  var self = this;
  self.snapElement.clear();
  $(self._containerId).empty();
  self.sonidos.arranque.unload();
  self.sonidos.marcha.unload();
};

Camion.prototype.go = function (cb) {
  var self = this;
  var g = self.snapElement;
  
  var carroceria = g.select('#carroceria');
  var ruedaDelantera = g.select('#rueda-delantera');
  var ruedaTrasera = g.select('#rueda-trasera');

  self.camion.animate({opacity: 100}, 1500, mina.linear, function() {
    self.sonidos.arranque.play();
    self.vibrar(carroceria);
    setTimeout(function(){
      self.girar(ruedaTrasera);
      self.girar(ruedaDelantera);
      self.camion.animate({transform: 'translate(2000, 0)'}, 7000, mina.easeout, function() {
        if(cb) {
          cb();
        }
        self._destroy();
        self._init();
      });
      setTimeout(function() {
        self.sonidos.marcha.fadeOut(0, 6000);
      }, 1000);
    }, 1370); // duración arranque motor
  });
}

Camion.prototype.stop = function () {
  this.sonidos.marcha.stop();
}


Camion.prototype.vibrar = function(elemento) {
  var self = this;

  var delay = 40;
  var ratio = 2;
  var ratioNeg = ratio*-1;
  var ratioDouble = ratio*2;
  var ratioDoubleNeg = ratio*2;

  elemento.animate({transform: "translate("+ratioNeg+", "+ratioNeg+")"}, delay, null, function() {
    elemento.animate({transform: "translate("+ratioDouble+", "+0+")"}, delay, null, function() {
      elemento.animate({transform: "translate("+0+", "+ratioDoubleNeg+")"}, delay, null, function() {
        elemento.animate({transform: "translate("+ratioDoubleNeg+", "+0+")"}, delay, null, function() {
          self.vibrar(elemento);
        });
      });
    });
  });
}

Camion.prototype.girar = function (elemento) {
  var delay = 1000;
  var loops = 1;

  function girarAux() {
    var bbox = elemento.getBBox();
    elemento.animate(
      { transform: "rotate("+(360*loops)+","+bbox.cx+","+bbox.cy+")" },
      delay, null, function() {
        girarAux();
      }
    );
    loops++;
  }

  girarAux();
}
