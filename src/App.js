import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component.js';
import Home from './routes/home/home.component.js';
import SignIn from './routes/sign-in/sign-in.component.js';

const Shop = () => {
  return <h1>Im Shop section</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
