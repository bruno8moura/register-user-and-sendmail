export const env = {
  server: {
    PORT: process.env.PORT
  },
  database: {
    MONGO_URL: process.env.MONGO_URL
  },
  smtpServer: {
    HOST: process.env.SMTP_SERVER_URL,
    PORT: process.env.SMTP_SERVER_PORT,
    credentials: {
      USER: process.env.SMTP_CREDENTIAL_USER,
      PASS: process.env.SMTP_CREDENTIAL_PASS
    },
    SECURE: process.env.ENV !== 'local'
  },
  email: {
    SENDER: process.env.EMAIL_SENDER,
    ATTACHED_FILE_PATH: process.env.EMAIL_ATTACHED_FILE
  }
}
