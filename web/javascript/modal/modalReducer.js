import { MODAL } from "./modalConstants"

const initialState = {
  add_to_cart_modal: false,
  show_cart_modal: false,
};

const modalReducer = function(state = initialState, action){
  switch(action.type){
    case MODAL.TOGGLE_MODAL: {
      let mid = action.payload;
      state = {...state};
      state[mid] = (state[mid] === false);
      return state;
    }
    default:
      return state;
  }
};

export default modalReducer
