import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component.js';
import Home from './routes/home/home.component';

const Shop = () => {
  return <h1>Im Shop section</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="contact" element={<h1>Contact page</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
