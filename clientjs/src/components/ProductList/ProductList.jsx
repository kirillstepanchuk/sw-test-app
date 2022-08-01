import React, { Component } from "react";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";

import ProductCard from "../ProductCard/ProductCard";
import MainContainer from "../MainContainer/MainContainer";
import { Heading, ProductListContainer } from "./style";

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
  render() {
    const { category } = this.props.match.params;

    return (
      <MainContainer>
        <Heading>
          {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
        </Heading>
        <ProductListContainer>
          <Query query={GET_PRODUCTS} variables={{ category }}>
            {({ data, loading, error }) => {
              if (loading) return <div>Loading</div>;
              if (error) console.error(error);

              return data.category.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ));
            }}
          </Query>
        </ProductListContainer>
      </MainContainer>
    );
  }
}

export default withRouter(ProductList);
