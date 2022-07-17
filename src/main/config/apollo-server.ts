import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from '@/main/graphql/type-defs'
import resolvers from '@/main/graphql/resolvers'

export default (app: Express): void => {
  const server = new ApolloServer({
    resolvers,
    typeDefs
  })
  server.start().then(() => {
    server.applyMiddleware({ app })
  })
}
