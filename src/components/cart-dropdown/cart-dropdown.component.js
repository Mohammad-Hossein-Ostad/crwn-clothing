import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.component';
import Button from '../../components/button/button.component';

import './cart-dropdown.styles.scss';

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);

  const addProductToCart = cartItems.map((item) => (
    <div key={item.id} className="cart-items">
      <CartItem cartItem={item} />
    </div>
  ));

  return (
    <div className="cart-dropdown-container">
      {addProductToCart}
      <Button buttonType="inverted">ADD TO CART</Button>
    </div>
  );
};

export default CartDropDown;
