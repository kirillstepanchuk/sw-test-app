import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    categories {
      name,
      products {
        name,
        gallery,
      }
    }
  }
`;
