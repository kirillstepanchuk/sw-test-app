import React, { Component } from "react";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";

import { client } from "../../index";
import ProductCard from "../ProductCard/ProductCard";

export const MUTATE_ADD_ITEMS_TO_AVIABLE = gql`
  mutation ($id: String!) {
    addItemToCart(id: $id) @client
  }
`;

const GET_PRODUCTS = gql`
  query ($category: String!) {
    category(input: { title: $category }) {
      name
      products {
        id
        name
        gallery
        attributes {
          name
          type
          items {
            displayValue
            value
          }
        }
        inStock
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

class ProductList extends Component {
  componentDidMount() {
    console.log(this.props.match.params);
  }

  onButtonClick = async (prod) => {
    console.log(prod);
    await client.mutate({
      mutation: MUTATE_ADD_ITEMS_TO_AVIABLE,
      variables: { id: prod.id },
    });
  };

  render() {
    const { category } = this.props.match.params;

    return (
      <div>
        {/* {this.props.data.map((product) => (
          <>
            <div key={product.id}>{product.id}</div>
            <button type="button" onClick={() => this.onButtonClick(product)}>
              Add
            </button>
            
          </>
        ))} */}
        <Query query={GET_PRODUCTS} variables={{ category }}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading</div>;
            if (error) console.error(error);

            return data.category.products.map((product) => (
              // <div key={product.id}>{product.id}</div>
              <ProductCard key={product.id} product={product} />
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default withRouter(ProductList);
