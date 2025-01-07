import React, { useState, useEffect } from 'react';
import { fetchProducts, addToCart } from '../api';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        const mappedData = data.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          availableQuantity: product.quantityInStock,
        }));
        setProducts(mappedData);

        const initialQuantities = data.reduce((acc, product) => {
          acc[product.id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products: ' + err.message);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const quantity = quantities[product.id];
      await addToCart({ ...product, quantity });
      alert(`${quantity} ${product.name}(s) has been added to the cart.`);
    } catch (error) {
      console.error('Failed to add to cart:', error.message);
      alert('Failed to add the product to the cart. Please try again.');
    }
  };
  

  const handleQuantityChange = (productId, value) => {
    const quantity = Math.max(1, Math.min(value, products.find(p => p.id === productId).availableQuantity));
    setQuantities({ ...quantities, [productId]: quantity });
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-item" key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Available: {product.availableQuantity}</p>
          <div className="quantity-control">
            <label htmlFor={`quantity-${product.id}`}>Quantity: </label>
            <input
              id={`quantity-${product.id}`}
              type="number"
              value={quantities[product.id] || 1}
              min="1"
              max={product.availableQuantity}
              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
            />
            
          </div>
          <br></br>
          <button
            onClick={() => handleAddToCart(product)}
            disabled={product.availableQuantity === 0}
          >
            {product.availableQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
