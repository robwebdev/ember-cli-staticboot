import Ember from 'ember';

export default Ember.LinkComponent.extend({
  href: Ember.computed(function () {
    let href = this._super(...arguments);

    // Strip out query params
    const splitHref = href.split('?');
    if (splitHref.length > 1) {
      Ember.Logger.warn(`
        Query params are not included in href attributes when using link-to with ember-cli-staticboot.
        If you require query params this suggests your app is dynamic and not best suited for ember-cli-staticboot.
      `);
    }
    return splitHref[0];
  })
});
