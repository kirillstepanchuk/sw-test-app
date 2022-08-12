import { connect } from "react-redux";

import ProductAttributes from "./ProductAttributes";
import attributesActions from "../../store/actions/attributes";

const mapDispatchToProps = (dispatch) => {
  return {
    setProductAttributes: (selectedAttributes) =>
      dispatch(attributesActions.setProductAttributes(selectedAttributes)),
  };
};

export default connect(null, mapDispatchToProps)(ProductAttributes);