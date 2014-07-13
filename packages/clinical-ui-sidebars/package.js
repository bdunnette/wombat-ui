Package.describe({
  summary: "Package with navbar Clinical UI sidebar elements."
});

Package.on_use(function (api, where) {
  api.use('templating');
  api.use('ui');
  api.use('less');

  api.add_files('semantic.ui.extended.less', 'client');
  api.add_files('semantic.ui.sidebar.js', 'client');
  api.add_files('semantic.ui.sidebar.less', 'client');
});
