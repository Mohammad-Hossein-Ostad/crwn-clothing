import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '../src/App.js';
import { UserProvider } from './contexts/user.context';
import { CategoriesProvider } from './contexts/categories.context.js';
import { CartProvider } from './contexts/cart.context.js';

import './index.scss';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
