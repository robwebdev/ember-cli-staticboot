/* jshint node: true */
'use strict';

const RSVP = require('rsvp');
const FastBoot = require('fastboot');
const fs = require('fs');
const Plugin = require('broccoli-plugin');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
const path = require('path');

function staticFilter(inputTree, options) {
  options = options || {};
  if(!(this instanceof staticFilter)) {
    return new staticFilter(inputTree, options);
  }
  Plugin.call(this, [inputTree]);
  this.paths = options.paths || [];
  this.inputTree = inputTree;
}

staticFilter.prototype = Object.create(Plugin.prototype);
staticFilter.prototype.constructor = staticFilter;

staticFilter.prototype.build = function () {
  var srcDir = this.inputPaths[0];
  var destDir = this.outputPath;

  const app = new FastBoot({
    distPath: srcDir,
    resilient: true
  });

  const buildStaticPage = this.buildStaticPage(app, destDir);
  const promises = this.paths.map(path => buildStaticPage(path));
  return RSVP.all(promises);
};

staticFilter.prototype.buildStaticPage = function (app, directory) {
  return (path) => {
    return new RSVP.Promise((resolve, reject) => {
      app.visit(path, {request: {headers: {}}, response: {}})
        .then(result => result.html())
        .then(html =>   {
          const outputPath = this.outputPathForRoute(path, directory);

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
};

staticFilter.prototype.outputPathForRoute = function (routePath, directory) {
  let isIndex = routePath[routePath.length - 1] === '/';
  let outputPath = isIndex ? routePath + 'index' : routePath;
  return `${path.join(directory, outputPath)}.html`;
};

module.exports = staticFilter;
