import React, { useEffect, useState } from 'react';
import { fetchCartItems, placeOrder } from '../api';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const data = await fetchCartItems(); // API call to fetch cart items
        setCart(data);
        setLoading(false);
      } catch (err) {
        setError(`Failed to load cart: ${err.message}`);
        setLoading(false);
      }
    };

    getCartItems();
  }, []);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      await placeOrder(cart); // Place order via API
      setCart([]); // Clear cart after successful order
      setOrderSuccess(true);
    } catch (error) {
      alert(`Failed to place order: ${error.message}`);
    }
  };

  if (loading) return <p>Loading order summary...</p>;
  if (error) return <p>{error}</p>;

  if (orderSuccess) {
    return (
      <div className="order-confirmation">
        <h2>Order Confirmation</h2>
        <p>Your order has been placed successfully! Thank you for shopping with us.</p>
      </div>
    );
  }

  return (
    <div className="order-confirmation">
      <h2>Order Summary</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.productName || item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total Amount: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
          <button onClick={handlePlaceOrder} className="place-order-button">Place Order</button>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
