import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';

import * as Client from '../graphql/client';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  // TODO: cache persist
  const Cache = new InMemoryCache().restore(initialState || {});

  const stateLink = withClientState({
    cache: Cache,
    defaults: Client.Defaults,
    resolvers: {
      Mutation: Client.Mutations,
    },
  });

  const authLink = setContext((_, { headers }) => {
    let token;
    if (process.browser) {
      token = localStorage.getItem('welink:token');
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    }

    return { headers };
  });

  const httpLink = new HttpLink();

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([stateLink, authLink.concat(httpLink)]),
    cache: Cache,
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
