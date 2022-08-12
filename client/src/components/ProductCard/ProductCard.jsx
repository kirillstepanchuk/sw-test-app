import React, { PureComponent } from "react";

import { OUT_OF_STOCK_MESSAGE, ROUTE_PAGES } from "../../constants";
import getFixedPrice from "../../utils/getFixedPrice";
import CartImage from "../../images/white_cart.svg";
import {
  CardContainer,
  CardImage,
  CardTitle,
  CardPrice,
  OutOfStockTitle,
  AddToCartButton,
} from "./style";

class ProductCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { id, name, brand, gallery, prices, inStock, attributes } =
      this.props.product;
    const {
      activeCurrency: { label, symbol },
      addToCart,
    } = this.props;

    let initialAttributes = {};
    attributes.forEach((attribute) => {
      const { name, items } = attribute;
      const { value } = items[0];

      initialAttributes = {
        ...initialAttributes,
        [name]: value,
      };
    });

    const price = getFixedPrice(
      prices.filter((price) => price.currency.label === label)[0].amount
    );

    return (
      <CardContainer
        to={`${ROUTE_PAGES.product}/${id}`}
        instock={inStock ? 1 : 0}
      >
        <CardImage src={gallery[0]} alt="Image" />
        {inStock && (
          <AddToCartButton
            onClick={(evt) => {
              evt.preventDefault();
              addToCart(id, attributes, initialAttributes, prices);
            }}
          >
            <img src={CartImage} alt="" />
          </AddToCartButton>
        )}
        {!inStock && <OutOfStockTitle>{OUT_OF_STOCK_MESSAGE}</OutOfStockTitle>}
        <CardTitle>
          {brand} {name}
        </CardTitle>
        <CardPrice>
          {symbol} {price}
        </CardPrice>
      </CardContainer>
    );
  }
}

export default ProductCard;
