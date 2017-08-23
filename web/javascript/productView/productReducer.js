import { CART, PRODUCTS } from "./productConstants"

const initialState = {
  //cart: {},
  loadingProducts: true,
  products: {},
  selectedProduct: {},

  cart:{1:{productName:"Apple", productPrice:1,productCategory:"fruit", quantity:1 },
      2:{productName:"Apple", productPrice:1,productCategory:"fruit", quantity:1 },
      3:{productName:"Apple", productPrice:1,productCategory:"fruit", quantity:1 },
      4:{productName:"Apple", productPrice:1,productCategory:"fruit", quantity:1 }
    }
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
    case CART.UPDATE_QUANT: {
      state = {...state,};
      state.cart[action.payload.id].quantity = action.payload.quant
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
    }
  }
  return state
};


export default productReducer;
