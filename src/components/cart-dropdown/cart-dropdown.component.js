import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.component';
import Button, {
  BUTTON_TYPE_CLASSES,
} from '../../components/button/button.component';

import {
  CardDropDownContainer,
  CartItems,
  EmptyMessage,
} from './cart-dropdown.styles.js';

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const addProductToCart = cartItems.map((item) => (
    <CartItems key={item.id}>
      <CartItem cartItem={item} />
    </CartItems>
  ));

  const redirectIntoCheckOutPage = () => navigate('/checkout');

  return (
    <CardDropDownContainer>
      {cartItems.length ? (
        addProductToCart
      ) : (
        <EmptyMessage>Your cart is empty</EmptyMessage>
      )}
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={redirectIntoCheckOutPage}
      >
        GO TO CHECKOUT
      </Button>
    </CardDropDownContainer>
  );
};

export default CartDropDown;
