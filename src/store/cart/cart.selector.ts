import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";
import { RootState } from "../store";

// Global variable
const INITIAL = 0;

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems,
)

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen,
)

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((total, cartItem) => (
    total + cartItem.quantity), INITIAL)
);

export const selectTotalCart = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((total, cartItem) => (
    total + cartItem.quantity * cartItem.price), INITIAL
  ),
);
