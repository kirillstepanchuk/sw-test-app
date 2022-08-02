import React, { Component } from "react";
import Cart from "../components/Cart/Cart";
import Header from "../components/Header/Header";

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
