import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import enforce from 'express-sslify';
import path from 'path';

import { connect } from 'mongoose';
import { rootValue } from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";

import { constants } from './config/constants';

const { ENV, PORT, MONGODB_URI } = constants;

const app = express();

// enforce https for production
if (ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config();

app.use('/', express.static(`${__dirname}/../build`));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const startServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    rootValue
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  try {
    await connect(MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`🚀  Server ready on port ${PORT}`);
    });

  } catch (err) {
    console.error('Error occured while connecting to MongoDB: ', err);
  }
}

startServer();
