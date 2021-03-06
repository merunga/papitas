Package.describe({
  summary: "Papitas - Rompecabezas"
});

Package.on_use(function (api) {
  api.use([
    'coffeescript','deps','session','papitas-libs','underscore','templating','spacebars',
    'showdown','collection2'
  ], 'client');

  api.add_files([
    'models/etapas.coffee'
  ], 'client');

  api.add_files([
    'game-controller/prefabs/board.js',
    'game-controller/prefabs/block.js',
    'game-controller/states/boot.js',
    'game-controller/states/play.js',
    'game-controller/states/preloader.js',
    'game-controller/main.js',
    'game-controller/solver.js',
    'game-controller/solver-astar.js'
  ], 'client');

  api.add_files([
    'views/rompecabezas.html',
    'views/rompecabezas.js'
  ], 'client');

  api.export([
    'Rompecabezas',
    'Etapas'
  ],'client');
});
