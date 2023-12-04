import Button from '../../components/button/button.component';

import './cart-dropdown.styles.scss';

const CartDropDown = () => (
  <div className="cart-dropdown-container">
    <div className="cart-items" />
    <Button>GO TO CHECKOUT</Button>
  </div>
);

export default CartDropDown;
