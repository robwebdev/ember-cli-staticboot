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
    const ENV = this.container.owner.resolveRegistration('config:environment');
    ENV.staticBoot.appendFileExtension = true;
    this.registry.register('-application-instance:main', StubInstance);
    const router = this.container.lookup('router:main');
    router.startRouting(true);
  }
});

test('it renders the index route', function(assert) {

  this.render(hbs`{{link-to 'Home' 'index'}}`);

  assert.equal(this.$('a').text().trim(), 'Home');
  assert.equal(this.$('a').attr('href').trim(), '/');

  this.render(hbs`
    {{#link-to 'index'}}Home{{/link-to}}
  `);

  assert.equal(this.$('a').text().trim(), 'Home');
  assert.equal(this.$('a').attr('href'), '/');
});

test('it renders a non index route', function(assert) {

  this.render(hbs`{{link-to 'Test' 'test'}}`);

  assert.equal(this.$('a').text().trim(), 'Test');
  assert.equal(this.$('a').attr('href').trim(), '/test.html');

  this.render(hbs`
    {{#link-to 'test'}}Test{{/link-to}}
  `);

  assert.equal(this.$('a').text().trim(), 'Test');
  assert.equal(this.$('a').attr('href'), '/test.html');
});

test('it renders a route with parameters', function(assert) {

  this.render(hbs`{{link-to 'Post' 'posts.post' 1}}`);

  assert.equal(this.$('a').text().trim(), 'Post');
  assert.equal(this.$('a').attr('href').trim(), '/posts/1.html');

  this.render(hbs`
    {{#link-to 'posts.post' 1}}Post{{/link-to}}
  `);

  assert.equal(this.$('a').text().trim(), 'Post');
  assert.equal(this.$('a').attr('href'), '/posts/1.html');
});

test('it renders nested index routes', function(assert) {

  this.render(hbs`{{link-to 'Posts' 'posts.index'}}`);

  assert.equal(this.$('a').text().trim(), 'Posts');
  assert.equal(this.$('a').attr('href').trim(), '/posts.html');

  this.render(hbs`
    {{#link-to 'posts.index'}}Posts{{/link-to}}
  `);

  assert.equal(this.$('a').text().trim(), 'Posts');
  assert.equal(this.$('a').attr('href'), '/posts.html');
});

test('it renders deeply nested routes', function(assert) {

  this.render(hbs`{{link-to 'Categorised post' 'categories.category.post' 'deathMetal' 1}}`);

  assert.equal(this.$('a').text().trim(), 'Categorised post');
  assert.equal(this.$('a').attr('href').trim(), '/categories/deathMetal/1.html');

  this.render(hbs`
    {{#link-to 'categories.category.post' 'deathMetal' 1}}Categorised post{{/link-to}}
  `);

  assert.equal(this.$('a').text().trim(), 'Categorised post');
  assert.equal(this.$('a').attr('href'), '/categories/deathMetal/1.html');
});

test('it ignores query parameters', function(assert) {

  this.render(hbs`{{link-to 'Posts' 'posts' (query-params direction="asc") }}`);

  assert.equal(this.$('a').text().trim(), 'Posts');
  assert.equal(this.$('a').attr('href').trim(), '/posts.html');

  this.render(hbs`
    {{#link-to 'posts' (query-params direction="asc")}}Posts{{/link-to}}
  `);

  assert.equal(this.$('a').text().trim(), 'Posts');
  assert.equal(this.$('a').attr('href'), '/posts.html');
});
