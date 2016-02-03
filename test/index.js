/*global it: true, describe: true */
/*eslint no-console: 0*/

import should from 'should'
import * as m2r from '../src'

describe('module-to-redux', () => {
  it('should export the right stuff', () => {
    should.exist(m2r.toReducer, 'toReducer')
    should.exist(m2r.toReducers, 'toReducers')
    should.exist(m2r.toAction, 'toAction')
    should.exist(m2r.toActions, 'toActions')
  })
})

describe('toReducer', () => {
  it('should return the same object if not an es6 module', () => {
    let mod = {
      default: 123,
      increment: (s) => s + 1
    }

    m2r.toReducer('counter', mod).should.equal(mod)
  })
  it('should convert a module to a reducer', () => {
    let mod = {
      __esModule: true,
      default: 123,
      increment: (s) => s + 1
    }

    let reducer = m2r.toReducer('counter', mod)
    should.exist(reducer)
    reducer.should.be.a.function
    reducer(123, {
      type: 'counter.increment'
    }).should.equal(124)
    reducer(911, {
      type: 'counter.increment'
    }).should.equal(912)
  })
})

describe('toReducers', () => {
  it('should convert a set of modules to a set of reducer', () => {
    let mods = {
      counter: {
        __esModule: true,
        default: 123,
        increment: (s) => s + 1
      }
    }

    let reducer = m2r.toReducers(mods)
    should.exist(reducer.counter)
    reducer.counter.should.be.a.function
    reducer.counter(123, {
      type: 'counter.increment'
    }).should.equal(124)
    reducer.counter(911, {
      type: 'counter.increment'
    }).should.equal(912)
  })
})
