import { CART, PRODUCTS } from "./productConstants"

const initialState = {
  cart: {},
  loadingProducts: true,
  products: {},
  selectedProduct: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART.ADD: {
      state = {...state,};
      state.cart = {...state.cart};
      let product = action.payload;
      state.cart[product.id] = product;
      break;
    }
    case CART.REMOVE: {
      state = {...state,};
      let product = action.payload;
      delete state.cart[product.id];
      break;
    }
    case CART.CLEAR: {
      state = {...state,};
      state.cart = {};
      break;
    }
    case PRODUCTS.SET_LOADING_PRODUCTS: {
      state = {...state};
      state.loadingProducts = action.payload;
      break;
    }
    case PRODUCTS.SET_PRODUCTS: {
      state = {...state};
      state.products = action.payload;
      break;
    }
    case PRODUCTS.SELECT_PRODUCT: {
      state = {...state};
      state.selectedProduct = action.payload
    }
  }
  return state
};


export default productReducer;
