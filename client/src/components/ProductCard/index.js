import { connect } from "react-redux";

import ProductCard from "./ProductCard";
import cartActions from "../../store/actions/cart";

const mapStateToProps = (state) => {
  const { activeCurrency } = state.currency;

  return {
    activeCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (productId, attributes, selectedAttributes, prices) =>
      dispatch(
        cartActions.AddProductToCart(
          productId,
          attributes,
          selectedAttributes,
          prices
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);