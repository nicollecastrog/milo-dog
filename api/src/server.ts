import { GraphQLServer, Options } from "graphql-yoga";

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_: void, { name }: { name: string }) =>
      `Hello ${name || "World"}, welcome to Milo.Dog`
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

const startServer = async (callback?: (options: Options) => void) => {
  const startedServer = await server.start(callback);
  return startedServer;
};

export default startServer;
