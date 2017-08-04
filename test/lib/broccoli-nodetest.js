/* jshint node: true */
'use strict';

const mock = require('mock-require');
const testHelpers = require('broccoli-test-helpers');
const chai = require('chai');
const fs = require('fs');
const expect = chai.expect;
const makeTestHelper = testHelpers.makeTestHelper;
const cleanupBuilders = testHelpers.cleanupBuilders;
const path = require('path');
const RSVP = require('rsvp');
const fixtures = path.join(process.cwd(), 'tests/fixtures');

mock('fastboot', function() {
  return {
    visit() {
      return RSVP.Promise.resolve({
        html() {
          return 'fastboot output';
        }
      });
    }
  };
});

const _staticBootPlugin = require('../../lib/broccoli/staticboot');

describe('staticBootPlugin', function() {
  const staticBootPlugin = makeTestHelper({
    subject: _staticBootPlugin,
    fixturePath: fixtures
  });

  afterEach(() => {
    return cleanupBuilders();
  });

  it('should output all defined paths as directories with index.html', () => {
    const options = {
      paths: ['/', 'a', 'b', 'a/b']
    };
    return staticBootPlugin('.', options).then(result => {
      expect(result.files).to.deep.equal([
        'a/',
        'a/b/',
        'a/b/index.html',
        'a/index.html',
        'b/',
        'b/index.html',
        'index.html'
      ]);

      result.files.splice(1).forEach(file => {
        let filePath = path.join(result.directory, file);

        if (fs.lstatSync(filePath).isFile()) {
          expect(fs.readFileSync(filePath, 'utf8')).to.equal('fastboot output');
        }
      });
    });
  });
});
