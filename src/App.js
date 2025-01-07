import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import './App.css'; // Ensure the CSS is correctly imported

const App = () => {
  const [cart, setCart] = useState([]); // Centralized cart state

  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
          <Link to="/order" className="nav-link">Order Confirmation</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/order" element={<OrderConfirmation cart={cart} setCart={setCart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
