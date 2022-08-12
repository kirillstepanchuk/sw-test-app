import { connect } from "react-redux";

import CartItem from "./CartItem";
import cartActions from "../../store/actions/cart";

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
        cartActions.AddProductToCart(id, attributes, selectedAttributes, prices)
      ),
    removeItem: (id, attributes, selectedAttributes, prices) =>
      dispatch(
        cartActions.RemoveProductFromCart(
          id,
          attributes,
          selectedAttributes,
          prices
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);