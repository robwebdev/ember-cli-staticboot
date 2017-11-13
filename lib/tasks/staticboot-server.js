/* eslint-env node */
'use strict';

const RSVP = require('rsvp');
const CoreObject = require('core-object');
const http = require('http');

module.exports = CoreObject.extend({

  http,
  require,

  run(options) {
    const express = this.require('express');
    const app = express();

    app.use(express.static('dist/staticboot'));
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
