## An API to register users on a mailing list and send them an welcome email(written in Node.js and TypeScript in a Clean Architecture)

The API was developed using concepts from *Clean Architecture*, *Domain-Driven Design*, *Test-Driven Development*, *Continuos Refactoring*, and *Atomic Commits*.

To run this project you will need to create a `.env` file at the root of your project with values for the following environment variables:

* `PORT`
* `MONGO_URL`
* `SMTP_SERVER_URL`
* `SMTP_SERVER_PORT`
* `SMTP_CREDENTIAL_USER`
* `SMTP_CREDENTIAL_PASS`
* `EMAIL_SENDER`
* `EMAIL_ATTACHED_FILE`

The `SMTP_`* variables are used to send the e-mail to the registered user; `MONGO_URL` is where your MongoDB is located (*you can also create other implementations for the UserRepository for other specific databases if you like; the use cases were developed independent from specific database implementations*); and `PORT` is the port where your API will run.
