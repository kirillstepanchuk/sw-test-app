import { connect } from "react-redux";

import ProductDescription from "./ProductDescription";
import cartActions from "../../store/actions/cart";

const mapStateToProps = (state) => {
  const { activeCurrency } = state.currency;
  const { selectedAttributes } = state.attributes;

  return {
    activeCurrency: activeCurrency,
    selectedAttributes: selectedAttributes,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);