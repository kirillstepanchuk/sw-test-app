import React, { Component } from "react";
import gql from "graphql-tag";

import { client } from "../index";
import Header from "../components/Header/Header";
import ProductList from "../components/ProductList/ProductList";

export const QUERY_PRODUCTS = gql`
  query {
    availableItems @client {
      id
      prices {
        currency {
          label
        }
        amount
      }
    }
  }
`;

export class Category extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      tabName: "",
    };

    this.handleChangeName = this.handleChangeName.bind(this);
  }

  componentDidMount = async () => {
    const { data } = await client.query({ query: QUERY_PRODUCTS });

    this.setState({
      products: data.availableItems,
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { data } = await client.query({ query: QUERY_PRODUCTS });

    if (prevState.products !== data.availableItems) {
      this.setState({
        products: data.availableItems,
      });
    }
  };

  handleChangeName(name) {
    this.setState({
      tabName: name,
    });
  }

  render() {
    return (
      <div>
        <Header changeName={this.handleChangeName} />
        <ProductList data={this.state.products} />
      </div>
    );
  }
}

export default Category;
