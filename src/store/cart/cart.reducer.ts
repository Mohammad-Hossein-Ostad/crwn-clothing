import { AnyAction } from "redux";
import { setIsCartOpen, setCartItems } from "./cart.action";
import { CartItem } from "./cart.types";

export type CartState = {
  isCartOpen: Boolean;
  cartItems: CartItem[];
}

export const INITIAL_STATE_VALUE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

// TODO: complete it
export const cartReducer = (
  state = INITIAL_STATE_VALUE,
  action: AnyAction,
) => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload
    }
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload
    }
  }

  return state;
}
