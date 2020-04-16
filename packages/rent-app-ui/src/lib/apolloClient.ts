import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { resolvers, typeDefs } from '../queries';
import introspectionQueryResultData from '../queries/fragmentTypes.json';



const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});
const cache = new InMemoryCache({fragmentMatcher});
const link = new HttpLink({
  uri: 'http://localhost:3030/graphql',
  credentials: 'include'
});


const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  resolvers,
  typeDefs,
  link
});

export {
    client
}