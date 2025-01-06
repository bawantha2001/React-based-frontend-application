import { combineReducers } from 'redux';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  PLACE_ORDER_SUCCESS,
} from './actions';

// Products Reducer
const productsReducer = (state = { loading: false, data: [], error: null }, action) => {
    console.log('Action Type:', action.type); // Log action types
    switch (action.type) {
      case FETCH_PRODUCTS_REQUEST:
        return { ...state, loading: true };
      case FETCH_PRODUCTS_SUCCESS:
        console.log('Products Updated:', action.payload); // Log updated products
        return { loading: false, data: action.payload, error: null };
      case FETCH_PRODUCTS_FAILURE:
        return { loading: false, data: [], error: action.payload };
      default:
        return state;
    }
  };
  

// Cart Reducer
const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    case UPDATE_CART_QUANTITY:
      return state.map((item) =>
        item.id === action.payload.cartItemId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.payload);
    case PLACE_ORDER_SUCCESS:
      return []; // Clear cart on successful order
    default:
      return state;
  }
};

// Combine all reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

export default rootReducer;
