import Ember from 'ember';

export default Ember.LinkComponent.extend({
  href: Ember.computed(function () {
    // Doesn't handle query params yet
    let href = this._super();
    return href[href.length -1] === '/' ? href : `${href}.html`;
  })
});
