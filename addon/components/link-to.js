import Ember from 'ember';

export default Ember.LinkComponent.extend({
  href: Ember.computed(function () {
    let href = this._super(...arguments);
    if (!href) {
      return;
    }

    // Strip out query params
    const splitHref = href.split('?');
    if (splitHref.length > 1) {
      // Ember.Logger.warn('Query params are ignored when using link-to with ember-cli-static-site');
    }
    href = splitHref[0];

    // Append extension if not an index route
    return href[href.length -1] === '/' ? href : `${href}.html`;
  })
});
