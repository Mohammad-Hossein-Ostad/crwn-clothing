import { createContext, useState } from 'react';

let INITIAL_VALUE = 0;

export const CartAmount = createContext({
  cartAmount: INITIAL_VALUE,
  setCartAmount: () => [],
});

export const CartAmountProvider = ({ children }) => {
  const [cartAmount, setCartAmount] = useState(INITIAL_VALUE);
  const value = { cartAmount, setCartAmount };

  return <CartAmount.Provider value={value}>{children}</CartAmount.Provider>;
};
