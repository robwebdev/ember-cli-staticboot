/* jshint node: true */
'use strict';

const RSVP = require('rsvp');
const FastBoot = require('fastboot');
const fs = require('fs');
const Plugin = require('broccoli-plugin');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
const path = require('path');
const recognizePaths = require('../utilities/recognise-paths');


function StaticBootBuild(inputTree, options) {
  options = options || {};
  if(!(this instanceof StaticBootBuild)) {
    return new StaticBootBuild(inputTree, options);
  }
  Plugin.call(this, [inputTree]);
  this.paths = options.paths || [];
  this.inputTree = inputTree;
  this.autoDiscover = options.autoDiscover;
}

StaticBootBuild.prototype = Object.create(Plugin.prototype);
StaticBootBuild.prototype.constructor = StaticBootBuild;

StaticBootBuild.prototype.build = function () {
  this.autoDiscoverDeferred = new RSVP.defer();
  var srcDir = this.inputPaths[0];
  this.destDir = this.outputPath;

  this.app = new FastBoot({
    distPath: srcDir,
    resilient: true,
    sandboxGlobals: {
      provideRouterInstanceToStaticBoot: this.provideRouterInstanceToStaticBoot.bind(this)
    }
  });

  if (this.autoDiscover) {
    return this.autoDiscoverPaths();
  } else {
    return this.buildStaticPages();
  }
};

StaticBootBuild.prototype.autoDiscoverPaths = function () {
  return this.app.visit('/', {request: {headers: {}}, response: {}}).then(() => {
    return this.autoDiscoverDeferred.promise.then(() => {
      return this.buildStaticPages();
    });
  });
};

StaticBootBuild.prototype.provideRouterInstanceToStaticBoot = function (appInstance) {
  let interval = setInterval(() => {
      if (appInstance.router) {
        this.paths = recognizePaths(appInstance.router);
        this.app._app.sandbox.globals.provideAppInstanceToStaticBoot = null;
        clearInterval(interval);
        this.autoDiscoverDeferred.resolve();
      }
  }, 50);
};

StaticBootBuild.prototype.buildStaticPages = function () {
    const promises = this.paths.map(path => this.buildStaticPage(path));
    return RSVP.all(promises);
};

StaticBootBuild.prototype.buildStaticPage = function (path) {
  return new RSVP.Promise((resolve, reject) => {
    this.app.visit(path, {request: {headers: {}}, response: {}})
      .then(result => result.html())
      .then(html =>   {
        const outputPath = this.outputPathForRoute(path, this.destDir);

        mkdirp(getDirName(outputPath), function (err) {
          if (err) {
            return reject(err);
          }
          fs.writeFile(outputPath, html, (err) => {
            if (err) {
              reject(err);
            }
            resolve();
          });
        });
      });
  });
};

StaticBootBuild.prototype.outputPathForRoute = function (routePath, directory) {
  const isIndex = routePath[routePath.length - 1] === '/';
  let outputPath = routePath + '/index.html';

  if (isIndex) {
    outputPath = 'index.html';
  }

  return path.join(directory, outputPath);
};


module.exports = StaticBootBuild;
