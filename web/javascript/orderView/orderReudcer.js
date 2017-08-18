import { ORDER } from "./orderConstants";

const initialState = {
  total: 0
}

const orderReducer = (state = initialState, action) => {

  switch(action.type) {
    case(ORDER.SET_TOTAL):
      state = {
        ...state,
        total: action.payload
      }
      break;

    case(ORDER.UPDATE_TOTAL):
      state = {
        ...state,
        total: state.total + action.payload
      }
      break;
  }

  return state
};

export default orderReducer;

