import { handleActions } from 'redux-actions'
import mapValues from 'lodash.mapvalues'
import mapKeys from 'lodash.mapkeys'
import omit from 'lodash.omit'

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
export const toReducer = (moduleName, mod) => {
  if (!mod.__esModule) return mod
  if (typeof mod.default === 'undefined') {
    throw new Error(`Missing initialState export in ${moduleName}`)
  }

  let initialState = mod.default
  let reducerNames = omit(mod, 'default')
  let namespaced = mapKeys(reducerNames, (v, k) => `${moduleName}.${k}`)
  return handleActions(namespaced, initialState)
}

// toReducers:
// maps all values in an object against toReducer
// where the key is the moduleName and the value is the module export
export const toReducers = (o) =>
  mapValues(o, (v, k) => toReducer(k, v))

// toAction:
// takes in the same arguments as toReducer
// instead of returning the action handler, this returns all of the action names
// this is for generating actions based on reducers
export const toAction = (moduleName, mod) => {
  if (!mod.__esModule) return mod
  let reducerNames = omit(mod, 'default')
  return mapValues(reducerNames, (v, k) => `${moduleName}.${k}`)
}

// toActions:
// maps all values in an object against toAction
// where the key is the moduleName and the value is the module export
export const toActions = (o) =>
  mapValues(o, (v, k) => toAction(k, v))
