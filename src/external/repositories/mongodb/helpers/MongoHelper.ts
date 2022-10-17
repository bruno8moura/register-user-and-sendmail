import { ILogger } from '@/usecases/ports/ILogger'
import { Logger } from '@/external/log/pino/Logger'
import { Collection, MongoClient } from 'mongodb'

interface MapperProps {
  data: any
}

export class MongoHelper {
    private static client = null as MongoClient
    private static logger: ILogger = Logger.getInstance()
    static async connect (url: string): Promise<void> {
      MongoHelper.client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })

      MongoHelper.logger.info('Mongodb connected!')
    }

    static async disconnect (): Promise<void> {
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

    static gracefulShutdown () {
      MongoHelper.client.on('serverOpening', event => {
        console.log(event)
      })

      MongoHelper.client.on('serverClosed', event => {
        console.error(event)
      })
    }
}
