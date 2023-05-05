import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import compression from 'compression'
import express from 'express'
import enforce from 'express-sslify'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import http from 'http'

import { connect, set } from 'mongoose'
import { rootValue } from './graphql/resolvers'
import { typeDefs } from './graphql/schema'
import { json, urlencoded } from 'body-parser'

import { constants } from './config/constants'
import { context } from './middleware/auth'
import { IContext } from './interfaces/types'

dotenv.config()

const { ENV, PORT, URI, MONGODB_URI } = constants

const corsOptions = {
  origin: URI,
  credentials: true,
}

const app = express()

// enforce https for production
if (ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }))
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(compression())

app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/', express.static(`${__dirname}/../build`))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
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
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(apolloServer, {
      context,
    }),
  )

  try {
    set('strictQuery', false)
    await connect(MONGODB_URI)

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: PORT }, resolve),
    )
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
  } catch (err) {
    console.error('Error occured while connecting to MongoDB: ', err)
  }
}

startServer()
