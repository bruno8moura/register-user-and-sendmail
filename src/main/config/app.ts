import express from 'express'
import setupMiddlewares from '@/main/config/setupMiddlewares'

const app = express()
setupMiddlewares({ app })

export { app }
