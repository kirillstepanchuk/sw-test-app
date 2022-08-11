import React, { Component } from "react";
import { connect } from "react-redux";

import ProductAttributes from "../ProductAttributes/ProductAttributes";
import cardActions from "../../store/actions/cart";
import getFixedPrice from "../../utils/getFixedPrice";
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
  render() {
    const { name, gallery, prices, brand } = this.props.product;
    const {
      activeCurrency,
      uniqueCartProducts,
      productIndex,
      cartProducts,
      addItem,
      removeItem,
    } = this.props;
    const { id, attributes, selectedAttributes } =
      uniqueCartProducts[productIndex];

    const price = getFixedPrice(
      prices.filter((price) => price.currency.label === activeCurrency.label)[0]
        .amount
    );

    return (
      <CartItemContainer>
        <CardItemLeftContainer>
          <CartItemBrand>{brand}</CartItemBrand>
          <CartItemName>{name}</CartItemName>
          <CartItemPrice>{`${activeCurrency.symbol} ${price}`}</CartItemPrice>
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
            onClick={() => addItem(id, attributes, selectedAttributes, prices)}
          >
            <img src={PlusIcon} alt="Plus" />
          </CountButton>
          {getQuantityOfItemInArray(
            cartProducts,
            uniqueCartProducts[productIndex]
          )}
          <CountButton
            onClick={() =>
              removeItem(id, attributes, selectedAttributes, prices)
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
    activeCurrency,
    cartProducts,
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
