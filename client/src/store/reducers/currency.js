import { SWITCH_CURRENCY } from "../actionTypes";

const initialState = {
  activeCurrency: "USD",
}

const reducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SWITCH_CURRENCY:
      return {
        ...state,
        activeCurrency: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
