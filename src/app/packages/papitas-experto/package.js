Package.describe({
  summary: "Papitas - Experto"
});

Package.on_use(function (api) {
  api.use([
    'coffeescript','deps','session','papitas-libs','underscore','templating','spacebars',
    'showdown','collection2'
  ], 'client');

  api.add_files([
    'models/papas.coffee'
  ], 'client');

  api.add_files([
    'game-controller/states/boot.js',
    'game-controller/states/preloader.js',
    'game-controller/main.js'
  ], 'client');

  api.add_files([
    'lib/jquery-ui-custom/jquery-ui.min.js',
    'lib/jquery-ui-custom/jquery-ui.min.css',
    'lib/jquery-ui-custom/jquery-ui.structure.min.css'
  ], 'client');

  api.add_files([
    'views/experto.html',
    'views/experto.js'
  ], 'client');

  api.export([
    'Experto',
    'Papas'
  ],'client');
});
