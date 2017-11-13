/* eslint-env node */
'use strict';

const mergeTrees = require('broccoli-merge-trees');
const StaticBootBuild = require('./lib/broccoli/staticboot');
const Funnel = require('broccoli-funnel');
const replace = require('broccoli-replace');

const defaultOptions = {
  paths: [],
  destDir: 'staticboot',
  include: ['**/*'],
  includeClientScripts: true
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

    this.staticbootOptions = app.options['ember-cli-staticboot'] || {};

    for (var option in defaultOptions) {
      if (!this.staticbootOptions.hasOwnProperty(option)) {
        this.staticbootOptions[option] = defaultOptions[option];
      }
    }
  },

  config () {
    if (!this.staticbootOptions) {
      return;
    }
    return {
      staticBoot: {
      }
    };
  },

  postprocessTree (type, tree) {
    if (type !== 'all') {
      return tree;
    }

    const trees = [tree];
    const destDirIsRoot = this.staticbootOptions.destDir === '';
    const mergeOptions = {};

    let staticBootTree = new StaticBootBuild(tree, {
      paths: this.staticbootOptions.paths
    });

    // If required, remove client scripts
    if (!this.staticbootOptions.includeClientScripts) {
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
      include: this.staticbootOptions.include,
      srcDir: './',
      destDir: this.staticbootOptions.destDir
    });

    trees.push(staticBootTree);

    if (destDirIsRoot) {
      mergeOptions.overwrite = true;
    } else  {
      trees.push(new Funnel(tree, {
          exclude: ['fastboot/**/*', 'index.html', 'tests/**/*', 'testem.js', 'package.json'],
          srcDir: './',
          destDir: this.staticbootOptions.destDir
      }));
    }

    return mergeTrees(trees, mergeOptions);
  }
};
