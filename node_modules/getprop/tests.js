var assert = require('assert')
var get = require('./')

test('basic', function(){
  var bob = {name: 'bob'}
  assert.equal(get(bob, 'name'), 'bob')
})

test('nested', function(){
  var bob = {
    name: 'bob',
    friend: {
      name: 'james'
    }
  }
  assert.equal(get(bob, 'friend.name'), 'james')
})

test('swallows nulls', function(){
  var bob = {}
  assert.equal(get(bob, 'foo.bar'), null)
})