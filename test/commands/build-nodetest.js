/* jshint node: true */
'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-fs'));
const jsonfile = require('jsonfile');
const addonPackageJson = jsonfile.readFileSync('package.json');
const AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;
const TIMEOUT = 400000;

function prepareApp (app) {
  // AddonTestApp.create doesn't install peerDependencies of the
  // addon under test as it's just symlinked
  const emberCLIFastbootVersion = addonPackageJson.peerDependencies['ember-cli-fastboot'];
  return app.runEmberCommand('install', `ember-cli-fastboot@${emberCLIFastbootVersion}`);
}

describe('package.json', function () {
  it('includes ember-cli-fastboot as a peer dependency', function () {
    expect(addonPackageJson.peerDependencies['ember-cli-fastboot']).to.be.a('string');
  });

  it('runs after ember-cli-fastboot in the pipeline', function () {
    expect(addonPackageJson['ember-addon'].after).to.equal('ember-cli-fastboot');
  });
});

describe('default configuration', function() {
  this.timeout(TIMEOUT);

  let app;

  before(function() {
    app = new AddonTestApp();
    return app.create('default').then(prepareApp);
  });

  it("builds into staticboot", function() {
    return app.runEmberCommand('build')
      .then(function() {
        expect(app.filePath('dist/staticboot/robots.txt')).to.be.a.file();
        expect(app.filePath('dist/staticboot/crossdomain.xml')).to.be.a.file();
        expect(app.filePath('dist/staticboot/assets/vendor.js')).to.be.a.file();
        expect(app.filePath('dist/staticboot/assets/default.js')).to.be.a.file();
        expect(app.filePath('dist/staticboot/index.html')).to.be.a.file();
        expect(app.filePath('dist/staticboot/index.html')).to.have.content.that.match(
          /<h1>Dummy App<\/h1>/
        );
        expect(app.filePath('dist/staticboot/index.html')).to.have.content.that.match(
          /<.*?script src=\"\/assets\/.*.js\".*?>.*?<\/.*?script.*?>/
        )
        expect(app.filePath('dist/staticboot/test/index.html')).to.be.a.file();
        expect(app.filePath('dist/staticboot/test/index.html')).to.have.content.that.match(
          /<h1>Test Page<\/h1>/
        );

        // https://github.com/chaijs/chai-fs/issues/9#issuecomment-223789489
        expect(app.filePath('dist/staticboot/package.json')).to.not.be.a.path();
      });
  });
});

describe('custom configuration', function() {
  this.timeout(TIMEOUT);

  let app;

  before(function() {
    app = new AddonTestApp();
    return app.create('custom').then(prepareApp);
  });

  it("builds into root of dist", function() {
    return app.runEmberCommand('build')
      .then(function() {
        expect(app.filePath('dist/robots.txt')).to.be.a.file();
        expect(app.filePath('dist/crossdomain.xml')).to.be.a.file();
        expect(app.filePath('dist/assets/vendor.js')).to.be.a.file();
        expect(app.filePath('dist/assets/custom.js')).to.be.a.file();
        expect(app.filePath('dist/index.html')).to.be.a.file();
        expect(app.filePath('dist/index.html')).to.have.content.that.match(
          /<h1>Dummy App<\/h1>/
        );
        expect(app.filePath('dist/index.html')).to.not.have.content.that.match(
          /<.*?script src=\"\/assets\/.*.js\".*?>.*?<\/.*?script.*?>/
        );

      });
  });
});

describe('auto discover configuration', function() {
  this.timeout(TIMEOUT);

  let app;

  before(function() {
    app = new AddonTestApp();
    return app.create('autodiscover').then(prepareApp);
  });

  it("auto discovers and builds static roots", function() {
    return app.runEmberCommand('build')
      .then(function() {
        expect(app.filePath('dist/staticboot/robots.txt')).to.be.a.file();
        expect(app.filePath('dist/staticboot/crossdomain.xml')).to.be.a.file();
        expect(app.filePath('dist/staticboot/assets/vendor.js')).to.be.a.file();
        expect(app.filePath('dist/staticboot/assets/autodiscover.js')).to.be.a.file();
        expect(app.filePath('dist/staticboot/index.html')).to.be.a.file();
        expect(app.filePath('dist/staticboot/index.html')).to.have.content.that.match(
          /<h1>Dummy App<\/h1>/
        );
        expect(app.filePath('dist/staticboot/test/index.html')).to.be.a.file();
        expect(app.filePath('dist/staticboot/test/index.html')).to.have.content.that.match(
          /<h1>Test Page<\/h1>/
        );
      });
  });
});
