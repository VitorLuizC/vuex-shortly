(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.vuexShortly = {})));
}(this, (function (exports) { 'use strict';

var shortlyMethods = function (λ) { return function (methods) {
  if ( methods === void 0 ) methods = {};

  var types = Object.keys(methods);
  var shortly = types.reduce(function (shortly, method) {
    var handler = methods[method];
    shortly[method] = typeof handler === 'function' ? handler : λ(handler);
    return shortly
  }, Object.create(null));
  return shortly
}; };

var shortlyGetters = shortlyMethods(function (property) {
  return function (state) { return state[property]; }
});

var shortlyMutations = shortlyMethods(function (property) {
  return function (state, payload) {
    state[property] = payload;
  }
});

var shortlyActions = shortlyMethods(function (type) {
  return function (ref, payload) {
    var commit = ref.commit;

    return commit(type, payload);
  }
});

var index = function (store) {
  if ( store === void 0 ) store = {};

  var shortly = Object.assign({}, store, {
    getters: shortlyGetters(store.getters),
    mutations: shortlyMutations(store.mutations),
    actions: shortlyActions(store.actions)
  });
  return shortly
};

exports.shortlyGetters = shortlyGetters;
exports.shortlyMutations = shortlyMutations;
exports.shortlyActions = shortlyActions;
exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
