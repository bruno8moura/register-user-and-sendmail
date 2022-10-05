const SMTPServer = require('smtp-server').SMTPServer

const server = new SMTPServer({
  secure: false,
  banner: 'Greeting message',
  disabledCommands: ['AUTH', 'STARTTLS'],
  logger: true,
  onData (stream, session, callback) {
    stream.pipe(process.stdout) // print message to console
    stream.on('end', callback)
  },
  onMailFrom (address, session, callback) {
    console.log('onMailFrom')
    return callback() // Accept the address
  },
  onClose: () => {
    console.log('onClose')
  }
})
server.on('error', err => console.error(err))
const PORT = process.env.PORT || 55443
console.log('PORT:', PORT)
server.listen(PORT, () => {
  console.log('SMTP Server Fake is up!')
})
