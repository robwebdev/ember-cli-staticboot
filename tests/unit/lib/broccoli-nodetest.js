/* jshint node: true */
'use strict';

const mock = require('mock-require');
const testHelpers = require('broccoli-test-helpers');
const expect = require('chai').expect;
const makeTestHelper = testHelpers.makeTestHelper;
const cleanupBuilders = testHelpers.cleanupBuilders;
const fs = require('fs');
const path = require('path');
const RSVP = require('rsvp');
const fixtures = path.join(process.cwd(), 'tests/fixtures');

mock('fastboot', function () {
  return {
    visit () {
      return RSVP.Promise.resolve({html () {
        return 'fastboot output';
      }});
    }
  };
});

const _fastbootPlugin = require('../../../lib/broccoli/broccoli-fastboot');

describe('fastbootPlugin', function() {
  const fastbootPlugin = makeTestHelper({
    subject: _fastbootPlugin,
    fixturePath: fixtures
  });

  afterEach(() => {
    return cleanupBuilders();
  });

  describe('when appendFileExtension is true', () => {
    it('it renders html files containing fastboots output for given paths', () => {
      const options = {
        paths: ['a', 'b'],
        appendFileExtension: true
      };
      return fastbootPlugin('.', options).then((result) => {
        expect(result.files).to.deep.equal([
          'a.html',
          'b.html'
        ]);

        result.files.forEach((file) => {
          expect(fs.readFileSync(path.join(result.directory, file), 'utf8')).to.equal('fastboot output');
        });
      });
    });
  });

  describe('when appendFileExtension is false', () => {
    it('it renders html files containing fastboots output for given paths without an extension', () => {
      const options = {
        paths: ['a', 'b'],
        appendFileExtension: false
      };
      return fastbootPlugin('.', options).then((result) => {
        expect(result.files).to.deep.equal([
          'a',
          'b'
        ]);

        result.files.forEach((file) => {
          expect(fs.readFileSync(path.join(result.directory, file), 'utf8')).to.equal('fastboot output');
        });
      });
    });
  });
});
