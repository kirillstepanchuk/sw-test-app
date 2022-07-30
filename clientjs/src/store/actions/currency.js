import { SWITCH_CURRENCY } from "../actionTypes";

const CurrencySwitch = (currency) => ({
  type: SWITCH_CURRENCY,
  payload: currency,
});

const currencyActions = {
  CurrencySwitch,
};

export default currencyActions;
