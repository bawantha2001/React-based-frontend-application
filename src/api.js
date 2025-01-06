import axios from 'axios';

const API_BASE_URL = 'http://localhost:5132/api'; // Update with your backend URL

export const fetchProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/Products`);
  return response.data;
};

export const addToCart = async (product) => {
  const payload = {
    productId: product.id,
    productName: product.name,
    price: product.price,
    quantity: product.quantity
  };

  const response = await axios.post(`${API_BASE_URL}/Cart`, payload);
  return response.data;
};

export const updateCartQuantity = async (cartItemId, quantity) => {
  const response = await axios.put(`${API_BASE_URL}/Cart/update-quantity/${cartItemId}?newQuantity=${quantity}`);
  return response.data;
};

export const removeItemfromCart = async (cartItemId) => {
  const response = await axios.delete(`${API_BASE_URL}/Cart/${cartItemId}`);
  return response.data;
};

export const fetchCartItems = async () => {
    const response = await axios.get(`${API_BASE_URL}/Cart`);
    return response.data;
  };

  export const placeOrder = async (cart) => {
    const response = await axios.post(`${API_BASE_URL}/Orders`, { items: cart });
    return response.data;
  };
  
