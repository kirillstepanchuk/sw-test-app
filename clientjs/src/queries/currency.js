import { gql } from "apollo-boost";

export const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;