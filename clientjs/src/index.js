import React from 'react';
import ReactDOM from 'react-dom/client';
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import App from './App';
import { resolvers } from "./resolvers";

const root = ReactDOM.createRoot(document.getElementById('root'));

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  clientState: {
    defaults: {
      cart: {
        items: [],
        total: 0,
        __typename: "Cart",
      },
      availableItems: [{ id: 1, price: 200, __typename: "item", }, { id: 2, price: 200, __typename: "item", }, { id: 3, price: 200, __typename: "item", }],
      currency: "USD",
    },
    resolvers: resolvers,
  }
});

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

