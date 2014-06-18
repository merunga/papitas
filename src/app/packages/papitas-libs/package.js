Package.describe({
  summary: "Phaser"
});

Package.on_use(function (api, where) {
  api.use([
  	'templating', 'spacebars', 'session'
  ], ['client']);

  api.add_files([
  	'utils.js',
  	'libs/phaser/index.js',
  	'libs/bootbox/index.js'
  ],'client');
});

