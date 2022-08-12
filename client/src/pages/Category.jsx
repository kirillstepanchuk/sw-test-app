import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Header from "../components/Header";
import ProductList from "../components/ProductList";

export class CategoryPage extends Component {
  render() {
    const { category } = this.props.match.params;

    return (
      <div>
        <Header />
        <ProductList category={category} />
      </div>
    );
  }
}

export default withRouter(CategoryPage);
