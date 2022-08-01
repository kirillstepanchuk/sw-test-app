import React, { Component } from "react";
import { connect } from "react-redux";

import cardActions from "../../store/actions/cart";
import CartImage from "../../images/white_cart.svg";
import { OUT_OF_STOCK_MESSAGE } from "../../constants";
import {
  CardContainer,
  CardImage,
  CardTitle,
  CardPrice,
  OutOfStockTitle,
  AddToCartButton,
} from "./style";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { id, name, gallery, prices, inStock, attributes } =
      this.props.product;
    const { activeCurrency } = this.props;

    let initialAttributes = {};
    attributes.forEach((attribute) => {
      const { name, items } = attribute;
      initialAttributes = {
        ...initialAttributes,
        [name]: items[0].value,
      };
    });

    const price = prices.filter(
      (price) => price.currency.label === activeCurrency
    );

    return (
      <CardContainer inStock={inStock}>
        <CardImage src={gallery[0]} alt="" />
        {/* {id} {name} {`${price[0].currency.symbol} ${price[0].amount}`} */}
        {inStock && (
          <AddToCartButton
            onClick={() =>
              this.props.addToCart(id, attributes, initialAttributes, prices)
            }
          >
            <img src={CartImage} alt="" />
          </AddToCartButton>
        )}
        {!inStock && <OutOfStockTitle>{OUT_OF_STOCK_MESSAGE}</OutOfStockTitle>}
        <CardTitle>{name}</CardTitle>
        <CardPrice>
          {price[0].currency.symbol} {price[0].amount}
        </CardPrice>
      </CardContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { activeCurrency } = state.currency;

  return {
    activeCurrency: activeCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (productId, attributes, selectedAttributes, prices) =>
      dispatch(
        cardActions.AddProductToCart(
          productId,
          attributes,
          selectedAttributes,
          prices
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
