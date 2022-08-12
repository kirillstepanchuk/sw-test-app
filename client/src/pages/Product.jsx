import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Header from "../components/Header";
import ProductDescription from "../components/ProductDescription";

export class ProductPage extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
      <div>
        <Header />
        <ProductDescription productId={id} />
      </div>
    );
  }
}

export default withRouter(ProductPage);
