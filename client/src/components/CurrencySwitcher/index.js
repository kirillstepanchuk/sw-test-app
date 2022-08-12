import {connect} from "react-redux";

import CurrencySwitcher from "./CurrencySwitcher";
import currencyActions from "../../store/actions/currency";

const mapStateToProps = (state) => {
  const { activeCurrency } = state.currency;

  return {
    activeCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    currencySwitch: (currency) =>
      dispatch(currencyActions.CurrencySwitch(currency)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);