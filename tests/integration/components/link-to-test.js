import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('link-to', 'Integration | Component | link to', {
  integration: true,
  setup () {
    // need to provide a stub application instance to prevent the following error
    // https://github.com/rwjblue/ember-qunit/issues/52#issuecomment-169091214
    const StubInstance = Ember.Object.extend({
      didCreateRootView () {}
    });
    this.registry.register('-application-instance:main', StubInstance);
    const router = this.container.lookup('router:main');
    router.startRouting(true);
  }
});

test('it ignores query parameters', function(assert) {

  this.render(hbs`{{link-to 'Posts' 'posts' (query-params direction="asc") }}`);

  assert.equal(this.$('a').text().trim(), 'Posts');
  assert.equal(this.$('a').attr('href').trim(), '/posts');

  this.render(hbs`
    {{#link-to 'posts' (query-params direction="asc")}}Posts{{/link-to}}
  `);

  assert.equal(this.$('a').text().trim(), 'Posts');
  assert.equal(this.$('a').attr('href'), '/posts');
});
