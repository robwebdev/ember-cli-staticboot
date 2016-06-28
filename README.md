# Ember-cli-static-site

Build static sites using Ember CLI. An early example usage can be found at [ember-cli-static-site-website](https://github.com/robwebdev/ember-cli-static-site-website).

`ember install ember-cli-static-site`

This addon currently requires ember-cli-fastboot to also be installed as a dependency to your ember-cli application.

`ember install ember-cli-fastboot`

This addon has been tested with Ember CLI 2.6.1.

## Configuration
You need to tell the addon which routes to hit when the static site is generated. This is done by passing a `ember-cli-static-site` config object to `ember-cli-build.js`. For example:

```js
  var app = new EmberApp(defaults, {
    'ember-cli-static-site': {
      paths: [
        '/',
        '/posts',
        '/posts/1',
        '/posts/2'
      ]
    }
  });
```

Script tags are stripped out of the generated pages therefore **the Ember app will not boot on the client**.

##`link-to`
Use `link-to` helpers as you would normally. The `href` attribute will be modified with a path to a static page.

##`build` and `serve`
Use `ember build` and `ember serve` as you would normally. The static pages will be output to the dist path like a regular build.

## Collaboration
### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
