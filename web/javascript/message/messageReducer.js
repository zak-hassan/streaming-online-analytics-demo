import { MESSAGE } from "./messageConstants"

const messageReducer = (state = {message: null, visible:null, messageType:null, icon:null}, action) => {
  switch (action.type) {
    case MESSAGE.SET_VISIBLE:
      state = {
        ...state,
        visible: action.payload
      };
      break;
    case MESSAGE.SET_MESSAGE:
      state = {
        message: action.payload.message,
        messageType: action.payload.messageType,
        icon: action.payload.icon,
        visible:true
      };
      break;
    case MESSAGE.CLEAR_MESSAGE:
      state = {
        ...state,
        message: null,
        visible: null,
      };
      break
  }
  return state
};

export default messageReducer
