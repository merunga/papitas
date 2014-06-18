Package.describe({
  summary: "Juegos de las papitas"
});

Package.on_use(function (api) {
  api.use(['papitas-libs','underscore'], ['client']);

  api.add_files([
    'client/prefabs/board.js',
    'client/prefabs/block.js',
    'client/states/boot.js',
    'client/states/credits.js',
    'client/states/leader-boards.js',
    'client/states/main-menu.js',
    'client/states/play.js',
    'client/states/preloader.js',
    'client/main.js',
    'client/solver.js'
  ], 'client');

  if (typeof api.export !== 'undefined') {
    api.use('webapp', 'server');
  }

  api.export([
    'BootState',
    'PreloaderState',
    'CreditsState',
    'LeaderBoardsState',
    'MainMenuState',
    'PlayState'
  ],'client');
});