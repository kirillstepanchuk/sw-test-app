import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDescription)
);