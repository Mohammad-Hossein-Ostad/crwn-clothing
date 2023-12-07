import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.component';
import Button from '../../components/button/button.component';

import './cart-dropdown.styles.scss';

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const addProductToCart = cartItems.map((item) => (
    <div key={item.id} className="cart-items">
      <CartItem cartItem={item} />
    </div>
  ));

  const redirectIntoCheckOutPage = () => navigate('/checkout');

  return (
    <div className="cart-dropdown-container">
      {addProductToCart}
      <Button buttonType="inverted" onClick={redirectIntoCheckOutPage}>
        GO TO CHECKOUT
      </Button>
    </div>
  );
};

export default CartDropDown;
