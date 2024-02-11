import { CartItem, CART_ACTION_TYPES } from "./cart.types";
import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";

// Helper functions
export const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // If find, increment quantity by one
  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CategoryItem // Or CartItem, back here later
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id,
  );

  // Filter out quantity 1
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // If find, decrease the item
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  );
};

export const clearCartItem = (
  cartItems: CartItem[],
  removeAllItems: CartItem
): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== removeAllItems.id);

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  Boolean
>

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>

export const setIsCartOpen = withMatcher(
  (boolean: Boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
)

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
)

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CartItem,
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);

  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  removeItem: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, removeItem);

  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  removeAllItems: CartItem,
) => {
  const newCartItems = clearCartItem(cartItems, removeAllItems);

  return setCartItems(newCartItems);
};

