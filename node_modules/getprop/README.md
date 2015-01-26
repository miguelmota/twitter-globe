getprop
=======

Property getter for objects which supports nesting i.e. x.y.z

## Install

`npm install getprop`

## Usage

```js
var bob = {
  name: 'bob',
  friend: {
    name: 'james'
  }
}
get(bob, 'friend.name') // => 'james'
```