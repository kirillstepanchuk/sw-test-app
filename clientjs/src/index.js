import React from 'react';
import ReactDOM from 'react-dom/client';
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createGlobalStyle } from 'styled-components'

import App from './App';
import { resolvers } from "./resolvers";

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

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <App />
    <GlobalStyle />
  </ApolloProvider>
);

