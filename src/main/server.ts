import 'module-alias/register'
import { MongoHelper } from '@/external/repositories/mongodb/helpers/MongoHelper'
import { app } from '@/main/config/app'
import { env } from './config/env'
import { hostname } from 'os'

const { MONGO_URL, PORT } = env

MongoHelper.connect(MONGO_URL).then(() => {
  app.listen(PORT, () => console.log(`Server running at http://${hostname}:${PORT}`))
}).catch(console.error)
