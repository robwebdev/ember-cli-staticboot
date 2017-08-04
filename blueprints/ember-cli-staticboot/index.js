/* eslint-env node */
'use strict';

module.exports = {
  afterInstall: function() {
    return this.addAddonToProject('ember-cli-fastboot', '^1.0.5');
  }
};
