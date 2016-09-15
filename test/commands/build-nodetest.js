/* jshint node: true */

var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-fs'));
var jsonfile = require('jsonfile');
var addonPackageJson = jsonfile.readFileSync('package.json');

var AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;

describe('package.json', function () {
  it('includes ember-cli-fastboot as a peer dependency', function () {
    expect(addonPackageJson.peerDependencies['ember-cli-fastboot']).to.be.a('string');
  });

  it('runs after ember-cli-fastboot in the pipeline', function () {
    expect(addonPackageJson['ember-addon'].after).to.equal('ember-cli-fastboot');
  });
});

describe('it builds', function() {
  this.timeout(300000);

  var app;

  before(function() {
    app = new AddonTestApp();

    return app.create('dummy').then((app) => {
      // AddonTestApp.create doesn't install peerDependencies of the
      // addon under test as it's just symlinked
      var emberCLIFastbootVersion = addonPackageJson.peerDependencies['ember-cli-fastboot'];
      return app.runEmberCommand('install', `ember-cli-fastboot@${emberCLIFastbootVersion}`);
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
