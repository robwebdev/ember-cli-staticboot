import Ember from 'ember';
import ExposeRoutesInitializer from 'dummy/initializers/expose-routes';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | expose routes', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  ExposeRoutesInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
