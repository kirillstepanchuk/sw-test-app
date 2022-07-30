import { combineReducers } from "redux";
import cart from "./cart";
import currency from "./currency";

const root = combineReducers({
  cart,
  currency,
});

export default root;
