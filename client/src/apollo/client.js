import ApolloClient, { InMemoryCache } from "apollo-boost";

import { API_URL } from "../constants";

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export default client;