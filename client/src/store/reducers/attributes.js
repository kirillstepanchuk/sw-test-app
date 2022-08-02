import { SET_ATTRIBUTES } from "../actionTypes";

const initialState = {
  selectedAttributes: null,
}

const reducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_ATTRIBUTES:
      return {
        ...state,
        selectedAttributes: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
