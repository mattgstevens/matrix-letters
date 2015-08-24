var View = (function (options) {
  var h = require('virtual-dom/h')
  var createElement = require('virtual-dom/create-element')
  var diff = require('virtual-dom/diff')
  var patch = require('virtual-dom/patch')

  var DOM = {
    tree: null,
    rootNode : null
  }

  function render (state) {
    return h('#messages', state.messages.slice(0,30).map(function (msg) {
      return h('.text', [msg])
    }))
  }

  function update (state) {
    var newTree = render(state)
    var patches = diff(DOM.tree, newTree)
    DOM.rootNode = patch(DOM.rootNode, patches)
    DOM.tree = newTree
  }

  function init (state) {
    DOM.tree = render(state)
    DOM.rootNode = createElement(DOM.tree)
    var $display = document.getElementById('stream')
    $display.appendChild(DOM.rootNode)
  }

  return {
    init: init,
    update: update
  }

})();

var Data = (function () {
  var state = { messages: [] }
  var matrix = require('./matrix-stream')

  View.init(state)

  function update (set) {
    state.messages.unshift(set.join('  '))
    View.update(state)
  }
  matrix.random('time for matrix', 0.8, (1000/60), update);

})();
