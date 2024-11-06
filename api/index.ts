import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import compression from 'compression'
import express from 'express'
// import enforce from 'express-sslify'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import http from 'http'

import { connect, set } from 'mongoose'
import { rootValue } from './graphql/resolvers'
import { typeDefs } from './graphql/schema'
import { json, urlencoded } from 'body-parser'
import { context } from './middleware/auth'
import type { IContext } from './interfaces/types'

dotenv.config({ path: '../.env' })

const corsOptions = {
  origin: process.env.URI,
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express()

// enforce https for production
// if (process.env.ENV === 'production') {
//   app.use(enforce.HTTPS({ trustProtoHeader: true }))
// }

app.use(cookieParser())
app.use(compression())

app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/', express.static(`${__dirname}/../dist`))

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

const startServer = async () => {
  const httpServer = http.createServer(app)
  const apolloServer = new ApolloServer<IContext>({
    typeDefs,
    rootValue,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await apolloServer.start()
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(corsOptions),
    json(),
    expressMiddleware(apolloServer, {
      context,
    }),
  )

  try {
    set('strictQuery', false)
    if (process.env.MONGODB_URI) {
      await connect(process.env.MONGODB_URI)
    } else {
      throw new Error('MONGODB_URI is not provided!')
    }

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: process.env.PORT }, resolve),
    )
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}/graphql`,
    )
  } catch (err) {
    console.error('Error ocurred while connecting to MongoDB: ', err)
  }
}

startServer()
