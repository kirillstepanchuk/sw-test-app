import React, { Component } from "react";

import Header from "../components/Header/Header";
import ProductDescription from "../components/ProductDescription/ProductDescription";

export class ProductPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <ProductDescription />
      </div>
    );
  }
}

export default ProductPage;
