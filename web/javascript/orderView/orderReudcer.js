import { ORDER } from "./orderConstants";

const initialState = {
  total: 0,
  selected: []
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
    case(ORDER.ADD_SELECTED):
      state = {
        ...state,
      }
      state.selected.push(action.payload)
      break;
    case(ORDER.REMOVE_SELECTED):
      state = {
        ...state,
      }
      state.selected = state.selected.filter(item => item !== action.payload);
      break;
    case(ORDER.CLEAR_TOGGLE):
      state = {
        ...state,
        selected: []
      }
      break;
  }

  return state
};

export default orderReducer;

