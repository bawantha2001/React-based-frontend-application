import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_PRODUCTS_REQUEST,
  fetchProductsSuccess,
  fetchProductsFailure,
  PLACE_ORDER_REQUEST,
  placeOrderSuccess,
  placeOrderFailure,
} from './actions';
import { fetchProducts, placeOrder } from '../api'; // Import API functions

// Worker Saga: Fetch Products
function* fetchProductsSaga() {
    try {
      const products = yield call(fetchProducts);
      console.log('Fetched Products:', products); // Log fetched products
      yield put(fetchProductsSuccess(products));
    } catch (error) {
      console.error('Fetch Products Error:', error.message);
      yield put(fetchProductsFailure(error.message));
    }
  }
  

// Worker Saga: Place Order
function* placeOrderSaga(action) {
  try {
    yield call(placeOrder, action.payload); // Call API with cart items
    yield put(placeOrderSuccess());
  } catch (error) {
    yield put(placeOrderFailure(error.message));
  }
}

// Watcher Saga
function* rootSaga() {
  yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
  yield takeEvery(PLACE_ORDER_REQUEST, placeOrderSaga);
}

export default rootSaga;
