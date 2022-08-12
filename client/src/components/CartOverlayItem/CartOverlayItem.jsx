import React, { PureComponent } from "react";

import ProductAttributes from "../ProductAttributes";
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

class CartOverlayItem extends PureComponent {
  render() {
    const { name, gallery, prices, brand } = this.props.product;
    const {
      activeCurrency: { label, symbol },
      uniqueCartProducts,
      productIndex,
      cartProducts,
      addItem,
      removeItem,
    } = this.props;
    const { id, attributes, selectedAttributes } =
      uniqueCartProducts[productIndex];

    const price = getFixedPrice(
      prices.filter((price) => price.currency.label === label)[0].amount
    );

    return (
      <CartItemContainer>
        <CardItemLeftContainer>
          <CartItemBrand>{brand}</CartItemBrand>
          <CartItemName>{name}</CartItemName>
          <CartItemPrice>{`${symbol} ${price}`}</CartItemPrice>
          <ProductAttributes
            type="overlayCart"
            attributes={attributes}
            selectedAttributes={selectedAttributes}
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

export default CartOverlayItem;
