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
      if(state.cart[product.id]) {
        state.cart[product.id].pquant +=1;
        state.cart[product.id].newQuant +=1;
      }
      else {
        state.cart[product.id] = action.payload;
        state.cart[product.id].newQuant = action.payload.pquant;
      }
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
      state.selectedProduct = action.payload;
      break;
    }
    case PRODUCTS.HANDLE_NEW_QUANT_CHANGE: {
      state = {...state};
      state.cart = {...state.cart};
      let newQuant = action.payload[1];
      let id = action.payload[0];
      state.cart[id].newQuant = newQuant;
      break;
    }
    case PRODUCTS.UPDATE_QUANT: {
      state = {...state, cart: {...state.cart}};
      state.cart[action.payload.id].pquant = action.payload.quant;
      break;
    }
  }
  return state
};


export default productReducer;
