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
      if(state.cart[product.id]) state.cart[product.id].pquant +=1;
      else state.cart[product.id] = action.payload;
      break;
    }
    case CART.REMOVE: {
      state = {...state,};
      delete state.cart[action.payload];
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
      break;
    }
    case PRODUCTS.UPDATE_QUANT: {
      state = {...state,};
      state.cart[action.payload.id].pquant = action.payload.quant
      break;
    }
  }
  return state
};


export default productReducer;
