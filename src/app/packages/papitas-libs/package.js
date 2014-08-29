Package.describe({
  summary: "Papitas Libs"
});

Package.on_use(function (api, where) {
  api.use([
  	'templating', 'spacebars', 'session', 'jquery', 'less'
  ], ['client']);

  api.add_files([
  	'utils.js',
    'libs.less',
  	'libs/phaser/index.js',
  	'libs/bootbox/index.js',
  	'libs/howlerjs/index.js',
    'libs/grumble.js/js/Bubble.js',
    'libs/grumble.js/js/jquery.grumble.js',
  ],'client');
});

