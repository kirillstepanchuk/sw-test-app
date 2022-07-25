import React, { Component } from "react";
import gql from "graphql-tag";

import { client } from "../../index";

export const QUERY_PRODUCTS = gql`
  query {
    availableItems @client {
      id
    }
  }
`;

export class ProductList extends Component {
  componentDidMount = async () => {
    const res = await client.query({ query: QUERY_PRODUCTS });
    console.log("res: ", res);
  };

  render() {
    return <div>ProductList</div>;
  }
}

export default ProductList;
