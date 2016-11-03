import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('test');
  this.route('posts', function () {
    this.route('post', {path: '/:id'});
  });
  this.route('categories', function () {
    this.route('category', {path: '/:categoryName'}, function () {
      this.route('post', {path: '/:postId'});
    });
  });
});

export default Router;
