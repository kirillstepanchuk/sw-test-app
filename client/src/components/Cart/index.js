import { connect } from "react-redux";

import Cart from "./Cart";
import cartActions from "../../store/actions/cart";

const mapStateToProps = (state) => {
  const { activeCurrency } = state.currency;
  const { cartProducts } = state.cart;

  return {
    cartProducts,
    activeCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkOut: () => dispatch(cartActions.CheckOutProductsFromCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);