import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, CHECK_OUT_PRODUCTS_FROM_CART } from "../actionTypes";

const initialState = {
  cartProducts: JSON.parse(localStorage.getItem("cartProducts")) || [],
}

const reducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      const newAddState = {
        ...state,
        cartProducts: [...state.cartProducts, action.payload],
      };

      localStorage.setItem(
        "cartProducts",
        JSON.stringify(newAddState.cartProducts)
      );

      return newAddState;

    case REMOVE_PRODUCT_FROM_CART:
      state.cartProducts.reverse();

      const indexOfProduct = state.cartProducts.findIndex((object) => JSON.stringify(object) === JSON.stringify(action.payload));

      state.cartProducts.splice(indexOfProduct, 1);

      const newRemoveState = {
        ...state,
        cartProducts: [...state.cartProducts.reverse()],
      };

      localStorage.setItem(
        "cartProducts",
        JSON.stringify(newRemoveState.cartProducts)
      );

      return newRemoveState;

    case CHECK_OUT_PRODUCTS_FROM_CART:
      return {
        ...state,
        cartProducts: [],
      };

    default:
      return state;
  }
};

export default reducer;
