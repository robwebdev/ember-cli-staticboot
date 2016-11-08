/* jshint node: true */
'use strict';

function removeDuplicates (arr) {
  return arr.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
  });
}

module.exports = function (router) {
    let routes = router.recognizer.names;
    let paths = Object.keys(routes).filter((key) => {
      return key.indexOf('_error') === -1 &&
        key.indexOf('_loading') === -1 &&
        routes[key].segments.filter(segment => segment.string && segment.string[0] !== '_').length &&
        !routes[key].segments.filter(segment => segment.name).length;
    }).map((key) => {
      return routes[key].segments.filter(segment => segment.string)
        .map(segment => segment.string)
        .filter(segment => segment.indexOf('error') === -1 &&  segment.indexOf('loading') === -1)
        .join('/');
    });

    paths = removeDuplicates(paths);
    return paths;
};
