const config = require('./jest.config')
config.testMatch = ['**/*.test.ts']

process.env.SMTP_SERVER_URL = '0.0.0.0'
process.env.SMTP_SERVER_PORT = '55443'
process.env.SMTP_CREDENTIAL_USER = 'anyUser'
process.env.SMTP_CREDENTIAL_PASS = 'anyPass'
process.env.EMAIL_SENDER = 'any@mail.com'
process.env.EMAIL_ATTACHED_FILE = '/home/bruno/www/otaviolemos/twd-clean-architecture-api/assets/email-attachment/bonus-data.txt'
process.env.SMTP_IGNORE_TLS = true

module.exports = config
