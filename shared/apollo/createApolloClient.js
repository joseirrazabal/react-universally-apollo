import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ws from 'ws';
import { ApolloCache } from 'apollo-cache';

// The ApolloClient takes its options as well as a network interface.
// function createApolloClient({ clientOptions = {}, networkInterface }) {
function createApolloClient(server = false) {
  // if (!networkInterface) {
  //   throw Error("Please pass a network interface to be used on apollo client");
  // }
  // const options = Object.assign(
  //   {},
  //   {
  //     addTypeName: true,
  //     // DataIdFromObject is used by Apollo to identify unique entities from
  //     // your queries.
  //     dataIdFromObject: result =>
  //       // you might see o => o.id commonly with Apollo.
  //       // If the IDs are only unique per type (this is typical if an ID is just an
  //       // ID out of a database table), you can use the `__typename` field to scope it.
  //       // This is a GraphQL field that's automatically available, but you do need
  //       // to query for it also. @SEE: http://dev.apollodata.com/angular2/cache-updates.html#dataIdFromObject
  //       // eslint-disable-next-line no-underscore-dangle
  //       result.id && result.__typename
  //         ? `${result.__typename}${result.id}`
  //         : null
  //   },
  //   clientOptions
  // );

  const httpLink = new HttpLink({
    uri: '/graphql',
  });
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token') || null,
      },
    });
    return forward(operation);
  });
  const httpLinkFinal = middlewareLink.concat(httpLink);

  const client = new SubscriptionClient('ws://localhost:4000/subscriptions', {
    reconnect: true,
  }, ws);
  const wsLink = new WebSocketLink(client);

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    server ? wsLink : null,
    httpLinkFinal,
  );

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    // ...options,
  });

  // return new ApolloClient({
  //   networkInterface,
  //   ...options
  // });
}

export default createApolloClient;
