import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '../src/App.js';
import { UserProvider } from './contexts/user.context';
import { ProductsProvider } from './contexts/products.context.js';
import { CartAmountProvider } from './contexts/cart-amount.context.js';
import { CartProvider } from './contexts/cart.context.js';

import './index.scss';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartAmountProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CartAmountProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
