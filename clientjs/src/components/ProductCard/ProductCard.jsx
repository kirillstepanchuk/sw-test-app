import React, { Component } from "react";
import { connect } from "react-redux";

import cardActions from "../../store/actions/cart";
import { OUT_OF_STOCK_MESSAGE, ROUTE_PAGES } from "../../constants";
import CartImage from "../../images/white_cart.svg";
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
      <CardContainer
        to={inStock && `${ROUTE_PAGES.product}/${id}`}
        inStock={inStock}
      >
        <CardImage src={gallery[0]} alt="" />
        {inStock && (
          <AddToCartButton
            onClick={(evt) => {
              evt.preventDefault();
              this.props.addToCart(id, attributes, initialAttributes, prices);
            }}
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
