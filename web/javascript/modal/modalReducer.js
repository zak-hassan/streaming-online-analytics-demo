import { MODAL } from "../constants"

const initialState = {
  config_modal: false,
  class_modal: false,
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
