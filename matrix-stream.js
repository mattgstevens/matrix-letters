var alphabet = (function generateAlphabet () {
  var ranges = [
  //   { start: 0x0100, stop: 0x017F } // extended Latin
  // , { start: 0x03C0, stop: 0x047F } // Greek and Coptic
  // , { start: 0x0561, stop: 0x0587 } // Armenian
  // , { start: 0x05D0, stop: 0x05EA } // Armenian
  , { start: 0x0F40, stop: 0x0F6C } // Tibetan
  , { start: 0x1401, stop: 0x141B } // Cherokee
  ]

  var set = []
  ranges.forEach(function each (range) {
    for(var i = range.start; i <= range.stop; i++) {
      set.push(String.fromCharCode(i))
    }
  })
  return set
})()

function randomValue (set) {
  return set[ Math.floor(Math.random()*10*set.length) % set.length ]
}

function defaultDisplay (set) {
  console.log(set.join('  '))
}

function sequential (message, weight, timing, display) {
  var output = []
  if(!display) {
    display = defaultDisplay
  }

  var index = 0
  function fill(output, start, stop) {
    for(var i=start; i < stop; i++) {
      output[i] = randomValue(alphabet)
    }
  }

  (function loop () {
    if(Math.random() > weight) {
      output[index] = message[index]
      index++
    }
    fill(output, index, message.length)
    display(output)

    if(index < message.length) {
      setTimeout(loop, timing)
    }
  })()

}

function random (message, weight, timing, display) {
  var output = []
  if(!display) {
    display = defaultDisplay
  }

  var indices = []
  for(var i=0; i < message.length; i++) {
    indices.push(i)
  }
  function fill (output, indices) {
    indices.forEach(function each(i) {
      output[i] = randomValue(alphabet)
    })
  }

  (function loop () {
    if(Math.random() > weight) {
      var index = randomValue(indices)
      output[index] = message[index]

      var remove = indices.indexOf(index)
      indices.splice(remove, 1)
    }
    fill(output, indices)
    display(output)

    if(indices.length > 0) {
      setTimeout(loop, timing)
    }
  })()
}

var Matrix = {
  random: random
, sequential: sequential
}

module.exports = Matrix