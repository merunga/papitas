Package.describe({
  summary: "Disconnect from server on startup"
});

Package.on_use(function (api) {
  api.use(['meteor'], ['client']);

  api.add_files([
    'disconnect.js'
  ], 'client');
});
