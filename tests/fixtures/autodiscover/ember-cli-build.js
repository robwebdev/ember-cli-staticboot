/*jshint node:true*/
/* global require, module */

module.exports = function(defaults) {
  var EmberApp = require('ember-cli/lib/broccoli/ember-app');
  var app = new EmberApp(defaults, {
    'ember-cli-staticboot': {
      autoDiscover: true
    }
  });

  return app.toTree();
};
