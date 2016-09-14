/* jshint node: true */
'use strict';

var glob = require('glob');
var Mocha = require('mocha');

var mocha = new Mocha({
  reporter: 'spec'
});

var root = 'test/';

function addFiles(mocha, files) {
  glob.sync(root + files).forEach(mocha.addFile.bind(mocha));
}

addFiles(mocha, '/**/*-nodetest.js');

mocha.run(function(failures) {
  process.on('exit', function() {
    process.exit(failures);
  });
});
