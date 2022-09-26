const config = require('./jest.config')
config.testMatch = ['**/*.test.ts']

process.env.SMTP_SERVER_URL = '0.0.0.0'
process.env.SMTP_SERVER_PORT = '0'
process.env.SMTP_CREDENTIAL_USER = 'any'
process.env.SMTP_CREDENTIAL_PASS = 'any'
process.env.EMAIL_SENDER = 'any'
process.env.EMAIL_ATTACHED_FILE = 'any'

module.exports = config
