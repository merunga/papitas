Package.describe({
  summary: "Rompecabezas para papitas"
});

Package.on_use(function (api) {
  api.use('meteor', {unordered: true});
  api.use(['underscore','phaser'], ['client']);

  api.export([
    'BootS',
    'PreloaderS',
    'CreditsS',
    'LeaderBoardsS',
    'MainMenuS',
    'PlayS'
  ]);

  api.add_files([
    'client/Main.js',
    'client/Solver.js',
    'client/Prefabs/Board.js',
    'client/Prefabs/NumberBlock.js',
    'client/States/Boot.js',
    'client/States/Credits.js',
    'client/States/LeaderBoards.js',
    'client/States/MainMenu.js',
    'client/States/Play.js',
    'client/States/Preloader.js'
  ], 'client');

  if (typeof api.export !== 'undefined') {
    api.use('webapp', 'server');
  }
});