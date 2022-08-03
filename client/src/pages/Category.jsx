import React, { Component } from "react";

import Header from "../components/Header/Header";
import ProductList from "../components/ProductList/ProductList";

export class CategoryPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <ProductList />
      </div>
    );
  }
}

export default CategoryPage;
