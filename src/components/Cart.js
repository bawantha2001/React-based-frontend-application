import React, { useEffect, useState } from 'react';
import { fetchCartItems, updateCartQuantity, removeItemfromCart } from '../api';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items when component mounts
  useEffect(() => {
    const getCartItems = async () => {
      try {
        const data = await fetchCartItems();
        setCart(data);
        setLoading(false);
      } catch (err) {
        setError(`Failed to load cart: ${err.message}`);
        setLoading(false);
      }
    };

    getCartItems();
  }, []);

  // Update quantity of a cart item
  const handleUpdateQuantity = async (id, quantity) => {
    try {
      const updatedItem = await updateCartQuantity(id, quantity);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: updatedItem.quantity } : item
        )
      );
    } catch (err) {
      alert(`Failed to update quantity: ${err.message}`);
    }
  };

  // Remove a cart item
  const handleRemoveFromCart = async (id) => {
    try {
      await removeItemfromCart(id);
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } catch (err) {
      alert(`Failed to remove item: ${err.message}`);
    }
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <h3 className="cart-total">Total Amount: ${calculateTotal().toFixed(2)}</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <h3>{item.productName}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Quantity:</p>
              <input
                type="number"
                value={item.quantity}
                min="1"
                max={item.availableQuantity}
                onChange={(e) =>
                  handleUpdateQuantity(item.id, parseInt(e.target.value, 10))
                }
              />
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Cart;
