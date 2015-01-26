var assert = require('assert')
var is = require('is-type')

module.exports = function(obj, prop){
  assert(is.object(obj))
  assert(is.string(prop))
  
  var chain = prop.split('.')
  var curr = obj
  while (chain.length > 0){
    var prop = chain.shift()
    curr = curr[prop]
    if (curr == null) return curr
  }
  return curr
}