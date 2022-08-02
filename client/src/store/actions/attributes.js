import { SET_ATTRIBUTES } from "../actionTypes";

const setProductAttributes = (attributes) => ({
  type: SET_ATTRIBUTES,
  payload: attributes,
});

const attributesActions = {
  setProductAttributes,
};

export default attributesActions;