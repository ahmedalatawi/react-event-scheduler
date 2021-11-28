import { ApolloServer, gql } from "apollo-server-express";
import bodyParser from "body-parser";
import compression from "compression";
import express from "express";

import { postMessages, putMessage } from "./routes/messages";
import { getUser } from "./routes/users";


const app = express();
const port = process.env.PORT || 4000;

app.use(compression());

app.use('/', express.static(`${__dirname}/build`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//user
app.get("/api/users/:id", getUser);

// messages
app.post("/api/messages", postMessages);
app.put("/api/messages/:id", putMessage);

const files = [];

const typeDefs = gql`
scalar FileUpload

  type Query {
    files: [String]
  }

  type Mutation {
    uploadFile(file: FileUpload!): Boolean
  }
`;

const resolvers = {
  Query: {
    files: () => files
  },
  Mutation: {
    uploadFile: async (_, { file }) => {
      //const { createReadStream, filename } = await file;

    //   await new Promise(res =>
    //     createReadStream()
    //       .pipe(createWriteStream(path.join(__dirname, "../images", filename)))
    //       .on("close", res)
    //   );

      //files.push(filename);

      return true;
    }
  }
};

let apolloServer = null;

const startServer = async () => {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}

startServer();

// const server = new ApolloServer({ typeDefs, resolvers });
// server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`🚀  Server ready on port ${port}`);
});

// tslint:disable-next-line:no-console
//app.listen(port, () => console.log(`Listening on port ${port}`));
