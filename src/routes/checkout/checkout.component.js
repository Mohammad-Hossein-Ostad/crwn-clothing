import { useSelector } from 'react-redux';

import { selectCartItems, selectTotalCart } from '../../store/cart/cart.selector';
import CheckOutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const CheckOut = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectTotalCart);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => {
        const { id } = cartItem;

        return <CheckOutItem key={id} cartItem={cartItem} />;
      })}
      <div className="total">TOTAL: ${cartTotal}</div>
    </div>
  );
};

export default CheckOut;
