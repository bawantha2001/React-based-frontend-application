import React, { useEffect, useState } from 'react';
import { fetchCartItems,updateCartQuantity, removeItemfromCart } from '../api'; // Replace with actual API functions

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items when component mounts
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

  // Update quantity of a cart item
  const handleUpdateQuantity = async (id, quantity) => {
    try {
      const updatedItem = await updateCartQuantity(id, quantity); // API call to update item quantity
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
      await removeItemfromCart(id); // API call to remove item
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } catch (err) {
      alert(`Failed to remove item: ${err.message}`);
    }
  };

  // Calculate total price
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      max={item.availableQuantity}
                      onChange={(e) =>
                        handleUpdateQuantity(item.id, parseInt(e.target.value, 10))
                      }
                      style={styles.quantityInput}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      style={styles.removeButton}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 style={styles.total}>Total: ${calculateTotal().toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  quantityInput: {
    width: '50px',
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  total: {
    textAlign: 'right',
    marginTop: '20px',
    fontSize: '18px',
  },
};

export default Cart;
