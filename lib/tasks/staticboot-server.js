/* jshint node: true */

'use strict';

const RSVP = require('rsvp');
const CoreObject = require('core-object');
const debug = require('debug')('ember-cli-fastboot/server');
const http = require('http');

module.exports = CoreObject.extend({

  http,
  httpServer: null,
  nextSocketId: 0,
  require,
  restartAgain: false,
  restartPromise: null,
  sockets: {},

  run(options) {
    debug('start');

    const express = this.require('express');
    const app = express();

    app.use(express.static(options.assetsPath));
    app.use((req, res) => res.sendStatus(404));

    this.httpServer = this.http.createServer(app);

    return new RSVP.Promise((resolve, reject) => {
      this.httpServer.listen(options.port, options.host, (err) => {
        if (err) { return reject(err); }
        const o = this.httpServer.address();
        const port = o.port;
        const family = o.family;
        let host = o.address;
        if (family === 'IPv6') { host = `[${host}]`; }
        this.ui.writeLine(`Ember StaticBoot running at http://${host}:${port}`);
        resolve();
      });
    });
  }
});
