# Ember-cli-staticboot

An addon for generating static from an Ember App.


`ember install ember-cli-staticboot`

## Running
`ember staticboot`

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
      appendFileExtension: true,
      includeClientScripts: false
    }
  });
```
### paths
An array of paths that the addon will hit when the static pages are generated.
*Default:* `[]`

### appendFileExtension
Whether generated file names should have a `.html` extension
*Default:* `true`

### includeClientScripts
Whether or not to include the client side scripts (app.js / vendor.js) in the generated pages.
*Default:* `false`

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
