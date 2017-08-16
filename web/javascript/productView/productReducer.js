import { CART } from "./constants"

const initialState = {
  cart: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART.ADD: {
      state = {...state,};
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
  }
  return state
};


export default productReducer;
