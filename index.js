/* jshint node: true */
'use strict';

const mergeTrees = require('broccoli-merge-trees');
const StaticBootBuild = require('./lib/broccoli/staticboot');
const Funnel = require('broccoli-funnel');
const replace = require('broccoli-replace');

const defaultOptions = {
  paths: [],
  destDir: 'staticboot',
  include: ['**/*'],
  includeClientScripts: true,
  autoDiscover: false
};

module.exports = {
  name: 'ember-cli-staticboot',

  includedCommands: function() {
    return {
      'staticboot': require('./lib/commands/staticboot'),
    };
  },

  included (app) {
    this._super.included.apply(this, arguments);

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
      staticBoot: {
      }
    };
  },

  postprocessTree (type, tree) {
    if (type !== 'all' || this.app.options.__is_building_fastboot__) {
      return tree;
    }

    const trees = [tree];
    const destDirIsRoot = this.options.destDir === '';
    const mergeOptions = {};

    let staticBootTree = new StaticBootBuild(tree, {
      paths: this.options.paths,
      autoDiscover: this.options.autoDiscover
    });

    // If required, remove client scripts
    if (!this.options.includeClientScripts) {
      const replaceOptions = {
        files: ['**/index.html'],
        patterns: [{
          match: /<.*?script src=\"\/assets\/.*.js\".*?>.*?<\/.*?script.*?>/g,
          replacement: ''
        }]
      };
      staticBootTree = replace(staticBootTree, replaceOptions);
    }

    staticBootTree = new Funnel(staticBootTree, {
      include: this.options.include,
      srcDir: './',
      destDir: this.options.destDir
    });

    trees.push(staticBootTree);

    if (destDirIsRoot) {
      mergeOptions.overwrite = true;
    } else  {
      trees.push(new Funnel(tree, {
          exclude: ['fastboot/**/*', 'index.html', 'tests/**/*', 'testem.js', 'package.json'],
          srcDir: './',
          destDir: this.options.destDir
      }));
    }

    return mergeTrees(trees, mergeOptions);
  }
};
