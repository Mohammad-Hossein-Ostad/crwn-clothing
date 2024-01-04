import { createSelector } from "reselect";

// Global variable
const INITIAL = 0;

const selectCartReducer = (state) => state.cart;

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
