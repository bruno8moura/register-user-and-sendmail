import express from 'express'
import setupMiddlewares from '@/main/config/setupMiddlewares'
import setupRoutes from '@/main/config/setupRoutes'
import setupLogger from '@/main/config/setupLogger'

const app = express()
setupLogger({ app })
setupMiddlewares({ app })
setupRoutes({ app })

export { app }
