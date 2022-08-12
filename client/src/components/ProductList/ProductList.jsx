import React, { PureComponent } from "react";
import { Query } from "react-apollo";

import ProductCard from "../ProductCard";
import MainContainer from "../MainContainer";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { GET_PRODUCTS } from "../../apollo/queries/products";
import { Heading, ProductListContainer } from "./style";

class ProductList extends PureComponent {
  render() {
    const { category } = this.props;

    return (
      <MainContainer>
        <Heading>
          {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
        </Heading>
        <ProductListContainer>
          <Query query={GET_PRODUCTS} variables={{ category }}>
            {({ data, loading, error }) => {
              if (loading) return <Loading />;
              if (error) return <ErrorMessage />;

              const { products } = data.category;

              return products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ));
            }}
          </Query>
        </ProductListContainer>
      </MainContainer>
    );
  }
}

export default ProductList;
