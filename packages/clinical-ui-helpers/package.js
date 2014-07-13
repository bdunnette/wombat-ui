Package.describe({
  summary: "Package with Clinical UI global helpers."
});

Package.on_use(function (api, where) {
  api.use('ui');
  api.use('templating');

  api.add_files('ui.helpers.js', 'client');
});
