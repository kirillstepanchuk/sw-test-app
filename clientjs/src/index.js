import React from 'react';
import ReactDOM from 'react-dom/client';
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';

import App from './App';
import GlobalStyle from "./globalStyle";
import rootReducer from "./store/reducers/root";
import "./fonts/fonts.css";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </ApolloProvider>
);

