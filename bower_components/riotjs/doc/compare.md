
title: Compare
description: How Riot differs from React and Polymer

====

# React
Riot 2.0 is inspired by React and from the idea of "cohesion". According to Facebook developers:

> "Templates separate technologies, not concerns."

We totally respect you guys from this important insight. By combining these JavaScript and HTML together under the view becomes cleaner.

React worked us well, and we still use it on our [Disqus Impoter](/importer/) but we were bothered about the syntax and size of React. We started thinking whether it could be simpler; both the internally and for the user. Especially the verbose syntax bothered us.


### React syntax

Following example taken directly from React home page:


```
var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});

React.render(<TodoApp />, mountNode);
```

JSX is a mixture of HTML and JavaScript. You can include HTML anywhere on the component; inside methods and on property assignments.


### Riot syntax

Here is the above thing with Riot:

``` html
<todo>
  <h3>TODO</h3>

  <ul>
    <li each={ item, i in items }>{ item }</li>
  </ul>

  <form onsubmit={ handleSubmit }>
    <input>
    <button>Add #{ items.length + 1 }</button>
  </form>

  this.items = []

  handleSubmit(e) {
    var input = e.target[0]
    this.items.push(input.value)
    input.value = ''
  }
</todo>
```

And this is how the above tag is mounted on a page:

```
<todo></todo>

&lt;script>riot.mount('todo')</script>
```

### Same, but different

In Riot HTML comes first and JavaScript second. Both are under the same component, but neatly separated from each other. The HTML can mixed with JavaScript expressions.

No proprietary stuff, except the notation of enclosing expressions inside curly brackets.

You see less boilerplate. Less brackets, commas, system properties and method names. Strings can be interpolated: `"Hello {world}"` instead of `"Hello " + this.state.world` and methods can be defined with compact ES6 syntax. Just less everything.

We think Riot syntax is the cleanest way to separate layout and logic while enjoying the benefits of isolated components.


### String based vs DOM based

When a component is initialized React parses a string and Riot traverses a DOM tree.

Riot takes the expressions from the tree and on each run these expressions are evaluated and compared to the values on the DOM. When a value has changed the corresponding DOM node is updated.

Since these expressions can be cached an update cycle is fast. Going trough 100 or 1000 expressions usually takes 1ms or less.

React sync algorithm is much more complex since the HTML layout can change randomly after each update. Given the enormous challenge, Facebook developers did an impressive job with it.

We saw that the complex diffing can be avoided.

In Riot the HTML structure is fixed. Only loops and conditionals can add and remove elements. But a `div` cannot be converted to a `label` for example. Riot only updates the expressions without complex subtree replacements.


### Flux and routing

React deals with UI only, which is a good thing. All great software projects has a laser sharp focus.

Facebook recommends to use [Flux](http://facebook.github.io/flux/docs/overview.html) to structure the client-side code. It's more of a pattern that a framework and is packed with great ideas.

Riot comes bundled with custom tags, an event emitter (observable) and router. We believe that these are the fundamental building blocks client side applications. Events bring modularity, router takes care of URL and the back button and custom tags take care of the user interface.

Just like Flux, Riot is flexible and leaves the bigger architectural decisions for the developer. It's just a library to help you to achieve the goal.

You can build a Flux- like system by using Riot's observable and router. Or you can use some ready made Flux implementation together with Riot.


### 24x - 128x bigger

React is 24x bigger than Riot.

<small><em>react.min.js</em> – 127K</small>
<span class="bar red"></span>

<small><em>riot.min.js</em> – 5.4K</small>
<span class="bar blue" style="width: 4.3%"></span>

<br>

The recommended React router is 128x larger than Riot router.

<small><em>react-router.min.js</em> – 54.9K</small>
<span class="bar red"></span>

<small><em>react-mini-router.min.js</em> – 8.6K</small>
<span class="bar red" style="width: 15.6%"></span>

<small><em>riot.router.min.js</em> – 0.43K</small>
<span class="bar blue" style="width: 0.7%"></span>

Admittedly this router comparison is a bit unfair because [react-router](https://github.com/rackt/react-router) has a lot more features. But the above chart clearly highlights the goal of Riot: to provide the most minimalistic API for the job.

React ecosystem is more frameworky and favors larger API surfaces. The bigger alternative is more popular than [react-mini-router](https://github.com/larrymyers/react-mini-router) on the React community.


# Polymer

Polymer takes the Web Component standard and makes it available for the latest browsers. This allows you to write custom tags in a standard manner.

Conceptually Riot is the same thing but there are differences:

1. Riot uses virtual DOM and only the elements that have changed are updated causing less expensive DOM operations.

2. The standard syntax is more verbose and needs more books to study. And Polymer adds some of it's own syntax to the stack.

3. Individual components are imported with HTML `link rel="import"`. Polyfills must resort to queued up XHRs, which makes it painfully slow. Riot tags are imported with `script src` and multiple tags can be combined with regular tooling.

4. Polymer uses two-way data binding while riot uses one-way data binding.

5. No ability to perform server side rendering, which will be part of Riot on an upcoming version.


### 22x bigger

Polymer (v0.5.2) is 22x bigger than Riot

<small><em>polymer.min.js</em> – 120K</small>
<span class="bar red"></span>

<small><em>riot.min.js</em> – 5.4K</small>
<span class="bar blue" style="width: 4.5%"></span>

Web components are said to be the [King of all polyfilling challenges](http://developer.telerik.com/featured/web-components-arent-ready-production-yet/) and this is why Polymer requires such a large amount of code.


### Experimental

Polymer is based on experimental technology. Native Web Component support is not present in Safari or IE. IE status is "under consideration" and Safari plans are uncertain. Some WebKit [commits](https://lists.webkit.org/pipermail/webkit-dev/2013-May/024894.html) hint that they plan not to support it at all. And Polymer is only capable of polyfilling the _latest versions_ of “evergreen”  browsers (IE 10+).

Polymer project is over [2 years old](https://github.com/Polymer/polymer/commit/0452ada044a6fc5818902e685fb07bb4678b2bc2) and it hasn't gain any significant adoption. It's  uncertain whether Web Components will ever be natively supported.

