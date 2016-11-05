# Ember-cli-staticboot

An Ember CLI addon that allows you to prerender Ember.js apps to be served statically. Useful when the content of an Ember app is mostly static, this provides the benefits of using ember-cli-fastboot without the overhead of having to run an app server to prerender the pages as this is done up front at build time.

`ember install ember-cli-staticboot`

## Running
`ember build`
This will build the static output into `dist/staticboot` or the configured `destDir`.

## Configuration

###Example configuration

```js
  var app = new EmberApp(defaults, {
    'ember-cli-staticboot': {
      paths: [
        '/',
        '/posts',
        '/posts/1',
        '/posts/2'
      ],
      destDir: 'staticboot' // default
    }
  });
```
### paths
An array of paths that the addon will hit when the static pages are generated.
*Default:* `[]`

### destDir
Destination directory for the staticboot build within `dist`.
*Default:* `staticboot`

##`link-to`
Use `link-to` helpers as you would normally. The `href` attribute will be modified with a path to a static page.

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
