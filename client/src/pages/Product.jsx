import React, { Component } from "react";

import Header from "../components/Header";
import ProductDescription from "../components/ProductDescription";

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
