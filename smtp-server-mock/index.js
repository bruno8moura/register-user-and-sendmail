const SMTPServer = require('smtp-server').SMTPServer

const server = new SMTPServer({
  secure: false,
  banner: 'Greeting message',
  disabledCommands: ['AUTH'],
  onData (stream, session, callback) {
    stream.pipe(process.stdout) // print message to console
    stream.on('end', callback)
  },
  onMailFrom (address, session, callback) {
    return callback() // Accept the address
  }
})
server.on('error', err => console.error(err))
server.listen(55443, 'localhost')
