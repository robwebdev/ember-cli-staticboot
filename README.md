# Ember-cli-staticboot

An addon for generating static from an Ember App.


`ember install ember-cli-staticboot`


##Examples
- [robwebdev/fastboot-website](https://github.com/robwebdev/fastboot-website) - A fork of the FastBoot website, [converted to a static site](https://github.com/robwebdev/fastboot-website/commit/ce3bca25a980b9a668aeb32aef01e44bcf5c8e23) using ember-cli-static-site.
- [ember-cli-static-site-website](https://github.com/robwebdev/ember-cli-static-site-website) - The source for [ember-cli-static-site.com](http://www.ember-cli-static-com)

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
An array of paths that the addon will hit when the static site is generated.
*Default:* `[]`

### appendFileExtension
Whether generated file names should have a `.html` extension
*Default:* `true`

### includeClientScripts
Whether or not to include the client side scripts in the generated pages.
*Default:* `false`

`vendor.js` and `app.js` are not included in the generated pages therefore **the Ember app will not boot on the client**.

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
