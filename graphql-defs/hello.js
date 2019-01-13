const typeDefs = `
  type Greeting {
    greeting: String
  }

  type Query {
    sayHi(name: String): Greeting
  }
`;

const { makeExecutableSchema } = require('graphql-tools');

const resolvers = {
  Query: {
    sayHi: async (_, { name }) => ({
      greeting: `Hi, ${name || 'there'}!`,
    }),
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
