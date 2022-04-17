import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import enforce from 'express-sslify';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connect } from 'mongoose';
import { rootValue } from './graphql/resolvers';
import { typeDefs } from './graphql/schema';

import { constants } from './config/constants';
import { context } from './middleware/auth';

dotenv.config();

const { ENV, PORT, URI, MONGODB_URI } = constants;

const corsOptions = {
  origin: URI,
  credentials: true,
};

const app = express();

// enforce https for production
if (ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(`${__dirname}/../build`));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const startServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    rootValue,
    context,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  try {
    await connect(MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`🚀  Server ready on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error occured while connecting to MongoDB: ', err);
  }
};

startServer();
