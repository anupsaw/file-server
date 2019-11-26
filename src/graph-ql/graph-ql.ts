import { Application } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
type Query {
  hello: String
}
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

export class ApolloGraphQlServer {

    constructor() {

    }

    public static init(app: Application, path: string = '/graphQl'): void {
        const server = new ApolloServer({ typeDefs, resolvers });
        server.applyMiddleware({ app, path });
    }
}
