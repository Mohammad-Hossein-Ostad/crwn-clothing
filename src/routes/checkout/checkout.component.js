import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

const CheckOut = () => {
  const { cartItems, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  const displayCheckOutItems = cartItems.map((item) => {
    const { id, name, imageUrl, quantity, price } = item;

    const increaseQuantityHandler = () => addItemToCart(item);
    const decreaseQuantityHandler = () => removeItemFromCart(item);

    return (
      <div key={id}>
        <div>
          <img src={imageUrl} alt={name} />
          <h2>Product: {name}</h2>
          <h2> Quantity: {quantity}</h2>
          <button onClick={increaseQuantityHandler}>+</button>
          <button onClickCapture={decreaseQuantityHandler}>-</button>
          <h2>Price: ${price}</h2>
        </div>
      </div>
    );
  });

  return <> {displayCheckOutItems} </>;
};

export default CheckOut;
