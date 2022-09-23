export const env = {
  database: {
    PORT: process.env.PORT || '3000',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://root:root@localhost:27017'
  },
  smtpServer: {
    HOST: process.env.SMTP_SERVER_URL || 'locahost',
    PORT: process.env.SMTP_SERVER_PORT || '0000',
    credentials: {
      USER: process.env.SMTP_CREDENTIAL_USER || 'admin',
      PASS: process.env.SMTP_CREDENTIAL_PASS || 'admin'
    }
  },
  email: {
    SENDER: process.env.EMAIL_SENDER || 'any@mail.net'
  }
}
