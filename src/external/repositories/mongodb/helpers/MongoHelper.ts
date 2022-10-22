import { Logger } from '@/external/log/pino/Logger'
import { howMuchTimePassed } from '@/shared/util/date/DateCalculation'
import { Collection, MongoClient } from 'mongodb'

interface MapperProps {
  data: any
}

export class MongoHelper {
    private static client = null as MongoClient
    private static logger = Logger.getInstance()
    private static lastTimeLostConnection = null as Date
    static async connect (url: string): Promise<void> {
      const client = new MongoClient(url,
        {
          logger: MongoHelper.logger,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          heartbeatFrequencyMS: 2000,
          serverSelectionTimeoutMS: 500
        })

      MongoHelper.configEvents(client)
      MongoHelper.client = await client.connect()
    }

    static async disconnect (): Promise<void> {
      MongoHelper.logger.info('Mongodb will be disconnected')
      await MongoHelper.client.close()
    }

    static getCollection (name: string): Collection {
      return MongoHelper.client.db().collection(name)
    }

    static async clearCollection (name: string): Promise<void> {
      await MongoHelper.client.db().collection(name).deleteMany({})
    }

    static modelMap ({ data }: MapperProps): any {
      const dataClone = { ...data }
      delete dataClone._id

      return dataClone
    }

    static configEvents (client: MongoClient) {
      client.on('serverOpening', function (event) {
        MongoHelper.logger.info('Mongodb connected!')
      })

      client.on('serverHeartbeatFailed', function (event) {
        MongoHelper.logger.error('received serverHeartbeatFailed')
        MongoHelper.logger.error(JSON.stringify(event, null, 2))

        if (MongoHelper.lastTimeLostConnection) {
          const timePassed = howMuchTimePassed(MongoHelper.lastTimeLostConnection)

          const FIVE_SECONDS = 5000
          if (timePassed < FIVE_SECONDS) {
            MongoHelper.logger.error('Turn off the application')
            return process.emit('SIGINT')
          }
        }

        MongoHelper.lastTimeLostConnection = new Date()
      })

      client.on('serverClosed', function (event) {
        MongoHelper.logger.info('Mongodb connection is closed')
        process.emit('SIGINT')
      })
    }
}
