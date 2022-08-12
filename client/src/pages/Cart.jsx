import React, { Component } from "react";
import Cart from "../components/Cart";
import Header from "../components/Header";

export class CartPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Cart />
      </div>
    );
  }
}

export default CartPage;
