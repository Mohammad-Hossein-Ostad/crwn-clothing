import {
  CartItemContainer,
  ItemDetails,
  Name,
  StyledImage,
} from './cart-item.styles';

import './cart-item.styles.js';

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <StyledImage src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name as="span">{name}</Name>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
