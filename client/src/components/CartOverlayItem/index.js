import { connect } from "react-redux";

import CartOverlayItem from "./CartOverlayItem";
import cardActions from "../../store/actions/cart";

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