import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, CHECK_OUT_PRODUCTS_FROM_CART } from "../actionTypes";

const AddProductToCart = (id, attributes, selectedAttributes, prices) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: {
    id,
    attributes,
    selectedAttributes,
    prices,
  },
});

const RemoveProductFromCart = (id, attributes, selectedAttributes, prices) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  payload: {
    id,
    attributes,
    selectedAttributes,
    prices,
  },
});

const CheckOutProductsFromCart = () => ({
  type: CHECK_OUT_PRODUCTS_FROM_CART,
  payload: [],
});

const cartActions = {
  AddProductToCart,
  RemoveProductFromCart,
  CheckOutProductsFromCart,
};

export default cartActions;