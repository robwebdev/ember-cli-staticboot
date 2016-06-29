import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('test');
  this.route('post', {path: '/post/:id'});
});

export default Router;
