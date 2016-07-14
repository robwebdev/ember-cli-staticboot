/* jshint node: true */
'use strict';

const mergeTrees = require('broccoli-merge-trees');
const replace = require('broccoli-replace');
const staticPages = require('./lib/broccoli/broccoli-fastboot');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-cli-staticboot',

  includedCommands: function() {
    return {
      'staticboot': require('./lib/commands/staticboot'),
    };
  },

  included (app) {
    this._super.included.apply(this, arguments);

    const defaultOptions = {
      paths: [],
      appendFileExtension: false,
      includeClientScripts: false
    };

    this.options = app.options['ember-cli-staticboot'] || {};

    for (var option in defaultOptions) {
      if (!this.options.hasOwnProperty(option)) {
        this.options[option] = defaultOptions[option];
      }
    }
  },

  config () {
    if (!this.options) {
      return;
    }
    return {
      staticSite: {
        appendFileExtension: this.options.appendFileExtension
      }
    };
  },

  postprocessTree (type, tree) {
    if (type === 'all') {
      if (!this.options.includeClientScripts) {
        const replaceOptions = {
          files: ['index.html'],
          patterns: [{
            match: /<.*?script src=\"assets\/.*.js\".*?>.*?<\/.*?script.*?>/g,
            replacement: ''
          }]
        };
        tree = replace(tree, replaceOptions);
      }

      if (!this.app.options.__is_building_fastboot__) {
        const staticTree = staticPages(tree, {
          paths: this.options.paths
        });
        tree = mergeTrees([tree, staticTree], {overwrite: true});
      }

      const assetsTree = new Funnel(tree, {
        include: ['**/*'],
        srcDir: 'assets',
        destDir: 'staticboot/assets'
      });
      tree = mergeTrees([tree, assetsTree]);
    }

    return tree;
  }
};
