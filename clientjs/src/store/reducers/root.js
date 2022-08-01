import { combineReducers } from "redux";
import cart from "./cart";
import currency from "./currency";
import attributes from "./attributes";

const root = combineReducers({
  cart,
  currency,
  attributes,
});

export default root;
