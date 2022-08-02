import React, { Component } from "react";
import { connect } from "react-redux";

import ProductAttributes from "../ProductAttributes/ProductAttributes";
import cardActions from "../../store/actions/cart";
import getQuantityOfItemInArray from "../../utils/getQuantityOfItemInArray";
import PlusIcon from "../../images/plus.svg";
import MinusIcon from "../../images/minus.svg";
import {
  CartItemContainer,
  CardItemLeftContainer,
  CartItemBrand,
  CartItemName,
  CartItemPrice,
  CountButton,
  CountButtonsContainer,
  CartProductImage,
} from "./style";

export class CartOverlayItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, gallery, prices, brand } = this.props.product;
    const { activeCurrency, uniqueCartProducts, productIndex, cartProducts } =
      this.props;
    const { id, attributes, selectedAttributes } =
      uniqueCartProducts[productIndex];

    const price = prices.filter(
      (price) => price.currency.label === activeCurrency
    );

    return (
      <CartItemContainer>
        <CardItemLeftContainer>
          <CartItemBrand>{brand}</CartItemBrand>
          <CartItemName>{name}</CartItemName>
          <CartItemPrice>{`${price[0].currency.symbol} ${price[0].amount}`}</CartItemPrice>
          <ProductAttributes
            type="overlayCart"
            attributes={uniqueCartProducts[productIndex].attributes}
            selectedAttributes={
              uniqueCartProducts[productIndex].selectedAttributes
            }
          />
        </CardItemLeftContainer>

        <CountButtonsContainer>
          <CountButton
            onClick={() =>
              this.props.addItem(id, attributes, selectedAttributes, prices)
            }
          >
            <img src={PlusIcon} alt="Plus" />
          </CountButton>
          {getQuantityOfItemInArray(
            cartProducts,
            uniqueCartProducts[productIndex]
          )}
          <CountButton
            onClick={() =>
              this.props.removeItem(id, attributes, selectedAttributes, prices)
            }
          >
            <img src={MinusIcon} alt="Minus" />
          </CountButton>
        </CountButtonsContainer>

        <CartProductImage src={gallery[0]} alt={name} />
      </CartItemContainer>
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
