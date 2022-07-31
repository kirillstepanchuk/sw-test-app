import React, { Component } from "react";
import { connect } from "react-redux";

import cardActions from "../../store/actions/cart";

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
      <div>
        {id} {name} {`${price[0].currency.symbol} ${price[0].amount}`}
        <button
          onClick={() =>
            this.props.addToCart(id, attributes, initialAttributes, prices)
          }
        >
          add
        </button>
      </div>
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
