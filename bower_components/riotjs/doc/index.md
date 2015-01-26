
title: Why Riot?
description: And why we need a new UI library
body_id: riot-home
hero: true

====

# Custom tags

Riot brings custom tags to all browsers starting from IE8.

``` html
<todo>

  <!-- layout -->
  <h3>{ opts.title }</h3>

  <ul>
    <li each={ item, i in items }>{ item }</li>
  </ul>

  <form onsubmit={ add }>
    <input>
    <button>Add #{ items.length + 1 }</button>
  </form>

  // logic
  this.items = []

  add(e) {
    var input = e.target[0]
    this.items.push(input.value)
    input.value = ''
  }

</todo>
```
A custom tag glues relevant HTML and JavaScript together forming a reusable component. You can roughly think of React + Polymer, but squeezed into 2.5K.


### Human readable

Custom tags lets you build complex views with HTML. Your application might look something like this:

``` html
<body>

  <h1>Acme community</h1>

  <forum-header/>

  <forum-content>
    <forum-threads/>
    <forum-sidebar/>
  </forum-content>

  <forum-footer/>

  &lt;script>riot.mount('*', { api: forum_api })</script>
</body>
```

HTML syntax is the de facto language on the web and it's designed for building user interfaces. The syntax is explicit, nesting is inherent to the language and attributes offer a clean way to provide options for custom tags.


### Virtual DOM
- Smallest possible amount of DOM updates and reflows.
- All expressions are pre-compiled cached for high performance.
- No extra HTML root elements or `data-` attributes.
- No event loops or batching.


### Close to standards
- No proprietary event system.
- Event normalization for IE8.
- The rendered DOM can be freely manipulated with other tools.
- Plays well with jQuery.


# Minimal

Minimalism sets Riot apart from others:


### 1. Minimal syntax

One of the design goals was to introduce a powerful tag syntax with as little boilerplate as possible:

- Power shortcuts: `class={ enabled: is_enabled, hidden: hasErrors() }`.
- No `componentWillMount`, `getInitialState` and the like.
- Interpolation: `Add #{ items.length + 1 }`
- No `render` method, no `state` object.
- Compact ES6 method syntax.


### 2. Minimal API

Riot has 10x or even 100x times less API methods than others.

1. Less to learn. Fewer books and tutorials to view
2. Less proprietary stuff and more standard stuff


### 3. Minimal size

<small><em>react.min.js</em> – 127K</small>
<span class="bar red"></span>

<small><em>polymer.min.js</em> – 120K</small>
<span class="bar red" style="width: 94%"></span>

<small><em>riot.min.js</em> – 5.4K</small>
<span class="bar blue" style="width: 4.3%"></span>


1. Less bugs.
4. Faster to parse and cheaper to download.
3. Embeddable. The library should be smaller than the application.
4. Less to maintain. We don't need a big team to maintain Riot.

### 4. Minimal, but complete

Riot has all the essential building blocks for modern-client side applications:

- "Reactive" views for building user interfaces.
- Event library for building API's with isolated modules.
- Router for taking care of URL and the back button.

Riot is an "open stack". Meant for developers who want to avoid framework specific idioms. The generic tools lest you to mix and match design patterns. Systems like Facebook Flux can be self-made.



==== .tweets.section

This is one of the best piece of code I have seen in #js world. [@notarianni](https://twitter.com/notarianni/status/421388764334669825)

Love the attention to design principles and simplicity. [@sbellware](https://twitter.com/sbellware/status/420025919428755456)

The JavaScript manifesto I wish I could have written. [@trentvb](https://twitter.com/trentvb/status/422904021696122880)

Riot.js is so tiny, I learned most of it while waiting for my GF trying on clothes. [@kkovacs](https://twitter.com/kkovacs/status/422063156945764352)


==== .section.narrow

## Conclusion

Riot is React + Polymer + models + routing without the bloat. It works today, even on IE8. It's dead simple to use and it weights almost nothing. No reinventing the wheel, but rather taking the good parts of what's there and making the simplest tool possible.

Riot 2.0 keeps true with the original [Frameworkless JavaScript](/blog/technology/frameworkless-javascript.html) blog post. While the situation has changed due to the latest realizations in client side engineering (virtual dom, composable views, one way binding) the original Riot principles remain: *extremely small size and full control*.

According to developers of React:

> "Templates separate technologies, not concerns."

This is the biggest change from Riot 1.0 to 2.0. JavaScript and HTML are now part of the same module.


==== .section.tweets


This is how a javascript frameworks should work - Everything else is bloat and abstraction from necessity. [@devayes](https://twitter.com/devayes/status/396311780407783426)

If like me you think js frameworks over complicate things, then take a look at Riot.js [@livingos](https://twitter.com/livingos/status/425557004896460800)

Falled in love with #riotjs. Small, fast and the code, oh, so clean. This is how every framework should be! [@nongeekboy](https://twitter.com/nongeekboy/status/436086922419515392)
