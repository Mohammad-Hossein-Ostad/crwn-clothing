import { createContext, useState, useEffect } from 'react';

// Global variable
const INITIAL_VALUE = 0;
const INITIAL_TOTAL_AMOUNT = 0;

const addCartItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id,
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

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id,
  );

  // Filter out quantity 1
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // If find, decrease the item
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  );
};

const clearCartItem = (cartItems, removeAllItems) =>
  cartItems.filter((cartItem) => cartItem.id !== removeAllItems.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  counterItems: INITIAL_VALUE,
  setCounterItems: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: INITIAL_TOTAL_AMOUNT,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [counterItems, setCounterItems] = useState(INITIAL_VALUE);
  const [cartTotal, setCartTotal] = useState(INITIAL_TOTAL_AMOUNT);

  useEffect(() => {
    const newCounterItems = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      INITIAL_VALUE,
    );

    setCounterItems(newCounterItems);
  }, [cartItems]);

  useEffect(() => {
    const calculateTotalAmountCartItem = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      INITIAL_TOTAL_AMOUNT,
    );

    setCartTotal(calculateTotalAmountCartItem);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (removeItem) => {
    setCartItems(removeCartItem(cartItems, removeItem));
  };

  const clearItemFromCart = (removeAllItems) => {
    setCartItems(clearCartItem(cartItems, removeAllItems));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    counterItems,
    setCounterItems,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
