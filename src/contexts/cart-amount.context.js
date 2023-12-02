import { createContext, useState } from 'react';

export const CartAmountContext = createContext({
  currentCartIconAmount: 0,
  setCurrentCartIconAmount: () => null,
});

export const CartAmountProvider = ({ children }) => {
  const [currentCartAmount, setCurrentCartAmount] = useState(0);
  const value = { currentCartAmount, setCurrentCartAmount };

  return (
    <CartAmountContext.Provider value={value}>
      {children}
    </CartAmountContext.Provider>
  );
};
