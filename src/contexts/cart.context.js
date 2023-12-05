import { createContext, useState, useEffect } from 'react';

const INITIAL_VALUE = 0;

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  counterItems: INITIAL_VALUE,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [counterItems, setCounterItems] = useState(INITIAL_VALUE);

  useEffect(() => {
    const newCounterItems = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      INITIAL_VALUE,
    );
    setCounterItems(newCounterItems);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    counterItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
