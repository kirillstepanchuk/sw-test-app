import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";

import ProductCard from "../ProductCard/ProductCard";
import MainContainer from "../MainContainer/MainContainer";
import Loading from "../Loading/Loading";
import { GET_PRODUCTS } from "../../queries/products";
import { Heading, ProductListContainer } from "./style";

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
              if (loading) return <Loading />;
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
