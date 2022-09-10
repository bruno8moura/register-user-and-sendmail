import express from 'express'
import setupMiddlewares from '@/main/config/setupMiddlewares'
import setupRoutes from '@/main/config/setupRoutes'

const app = express()
setupMiddlewares({ app })
setupRoutes({ app })

export { app }
