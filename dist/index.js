'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toActions = exports.toAction = exports.toReducers = exports.toReducer = undefined;

var _reduxActions = require('redux-actions');

var _lodash = require('lodash.mapvalues');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.mapkeys');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.omit');

var _lodash6 = _interopRequireDefault(_lodash5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// general purpose utility for converting es6 modules to redux things

// toReducer:
// takes a single module and namespaces + exports it
// if it isnt a babel module, it just returns
// if it is a babel module, the default export = initialState for the reducer
// and every function exported is its own reducer
// all reducers are passed into handleActions, with the key being prefixed
// by the module name.
// export const test = () => {} in a.js would listen for the `a.test` actions
// toReducer returns a reducer function from redux-actions handleActions
var toReducer = exports.toReducer = function toReducer(moduleName, mod) {
  if (!mod.__esModule) return mod;
  if (typeof mod.default === 'undefined') {
    throw new Error('Missing initialState export in ' + moduleName);
  }

  var initialState = mod.default;
  var reducerNames = (0, _lodash6.default)(mod, 'default');
  var namespaced = (0, _lodash4.default)(reducerNames, function (v, k) {
    return moduleName + '.' + k;
  });
  return (0, _reduxActions.handleActions)(namespaced, initialState);
};

// toReducers:
// maps all values in an object against toReducer
// where the key is the moduleName and the value is the module export
var toReducers = exports.toReducers = function toReducers(o) {
  return (0, _lodash2.default)(o, function (v, k) {
    return toReducer(k, v);
  });
};

// toAction:
// takes in the same arguments as toReducer
// instead of returning the action handler, this returns all of the action names
// this is for generating actions based on reducers
var toAction = exports.toAction = function toAction(moduleName, mod) {
  if (!mod.__esModule) return mod;
  var reducerNames = (0, _lodash6.default)(mod, 'default');
  return (0, _lodash2.default)(reducerNames, function (v, k) {
    return moduleName + '.' + k;
  });
};

// toActions:
// maps all values in an object against toAction
// where the key is the moduleName and the value is the module export
var toActions = exports.toActions = function toActions(o) {
  return (0, _lodash2.default)(o, function (v, k) {
    return toAction(k, v);
  });
};