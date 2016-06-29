import Ember from 'ember';

export default Ember.LinkComponent.extend({
  href: Ember.computed('models', 'qualifiedRouteName',function () {
    // Doesn't handle query params yet
    let href = this._super(...arguments);
    if (!href) {
      return;
    }
    return href[href.length -1] === '/' ? href : `${href}.html`;
  })
});
