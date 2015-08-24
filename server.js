var http = require('http')
var ecstatic = require('ecstatic')(__dirname + '/public')

var port = process.env.PORT || 3000
var server = http.createServer(function (req, res) {
  ecstatic(req, res)
}).listen(port, function () {
  console.log('Server listening on port %s', port)
})
