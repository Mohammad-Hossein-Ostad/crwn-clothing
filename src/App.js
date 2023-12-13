import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component.js';
import Home from './routes/home/home.component.js';
import Authentication from './routes/authentication/authentication.component.js';
import Shop from './routes/shop/shop.component.js';
import CheckOut from './routes/checkout/checkout.component.js';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;
