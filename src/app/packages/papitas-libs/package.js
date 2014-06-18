Package.describe({
  summary: "Phaser"
});

Package.on_use(function (api, where) {
  api.use([
  ], ['client']);

  api.add_files([
  	'libs/phaser/index.js',
  	'libs/bootbox/index.js'
  ],'client');
});

