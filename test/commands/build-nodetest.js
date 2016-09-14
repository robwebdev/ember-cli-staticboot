/* jshint node: true */

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-fs'));

var AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;

describe('it builds', function() {
  this.timeout(300000);

  var app;

  before(function() {
    app = new AddonTestApp();

    return app.create('dummy').then((app) => {
      // AddonTestApp.create doesn't install peerDependencies of the
      // addon under test as it's just symlinked
      return app.runEmberCommand('install', 'ember-cli-fastboot');
    });
  });

  it("builds into staticboot by default", function() {
    return app.runEmberCommand('build')
      .then(function() {
        expect(app.filePath('dist/staticboot/index.html')).to.be.a.file();
        expect(app.filePath('dist/staticboot/index.html')).to.have.content.that.match(
          /<h1>Dummy App<\/h1>/
        );
      });
  });
});
