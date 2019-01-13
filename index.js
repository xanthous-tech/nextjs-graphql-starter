const next = require('next');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { mergeSchemas } = require('graphql-tools');
const debug = require('debug')('welink-wechat-bot:index');

const routes = require('./routes');
const helloSchema = require('./graphql-defs/hello');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handler = routes.getRequestHandler(app);
const { PORT } = require('./server-config');

app.prepare().then(async () => {
  const server = express();

  // setup gql and let Next.js handle the rest.
  server.use(
    '/graphql',
    graphqlHTTP({
      schema: mergeSchemas({
        schemas: [helloSchema],
      }),
      graphiql: true,
    }),
  );

  server.get('*', (req, res) => handler(req, res));
  server.listen(PORT, (error) => {
    if (error) {
      throw error;
    }

    debug(`ready on port: ${PORT}`);
  });
});
