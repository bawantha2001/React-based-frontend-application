import React, { useState } from 'react';
import { placeOrder } from '../api';

const OrderConfirmation = ({ cart, setCart }) => {
  const [orderSuccess, setOrderSuccess] = useState(false);

  console.log('Cart in OrderConfirmation:', cart); // Debug cart data

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

  if (orderSuccess) {
    return (
      <div>
        <h2>Order Confirmation</h2>
        <p>Your order has been placed successfully! Thank you for shopping with us.</p>
      </div>
    );
  }

  return (
    <div>
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
          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
