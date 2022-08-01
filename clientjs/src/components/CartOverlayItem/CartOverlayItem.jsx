import React, { Component } from "react";
import { connect } from "react-redux";

import cardActions from "../../store/actions/cart";
import getQuantityOfItemInArray from "../../utils/getQuantityOfItemInArray";

export class CartOverlayItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, gallery, prices, brand } = this.props.product;
    const { activeCurrency, uniqueCartProducts, productIndex, cartProducts } =
      this.props;
    console.log("uniqueCartProducts: ", uniqueCartProducts);
    const { id, attributes, selectedAttributes } =
      uniqueCartProducts[productIndex];

    const price = prices.filter(
      (price) => price.currency.label === activeCurrency
    );

    return (
      <div>
        {name}{" "}
        {getQuantityOfItemInArray(
          cartProducts,
          uniqueCartProducts[productIndex]
        )}
        <button
          onClick={() =>
            this.props.addItem(id, attributes, selectedAttributes, prices)
          }
        >
          add
        </button>
        <button
          onClick={() =>
            this.props.removeItem(id, attributes, selectedAttributes, prices)
          }
        >
          remove
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { activeCurrency } = state.currency;
  const { cartProducts } = state.cart;

  return {
    activeCurrency: activeCurrency,
    cartProducts: cartProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (id, attributes, selectedAttributes, prices) =>
      dispatch(
        cardActions.AddProductToCart(id, attributes, selectedAttributes, prices)
      ),
    removeItem: (id, attributes, selectedAttributes, prices) =>
      dispatch(
        cardActions.RemoveProductFromCart(
          id,
          attributes,
          selectedAttributes,
          prices
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlayItem);
