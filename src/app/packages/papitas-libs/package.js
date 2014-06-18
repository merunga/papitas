Package.describe({
  summary: "Phaser"
});

Package.on_use(function (api, where) {
  api.add_files(['libs/phaser/index.js'],'client');
});

