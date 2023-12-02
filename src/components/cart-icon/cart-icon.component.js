import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import { CartAmountContext } from '../../contexts/cart-amount.context';
import { ReactComponent as ShoppingBagIcon } from './../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const { currentCartAmount } = useContext(CartAmountContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingBagIcon className="shoping-icon" />
      <span className="item-count">{currentCartAmount}</span>
    </div>
  );
};

export default CartIcon;
