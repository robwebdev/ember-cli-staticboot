/* eslint-env node */
'use strict';

module.exports = function(defaults) {
  var EmberApp = require('ember-cli/lib/broccoli/ember-app');
  var app = new EmberApp(defaults, {
    'ember-cli-staticboot': {
      paths: ['/']
    }
  });

  return app.toTree();
};
