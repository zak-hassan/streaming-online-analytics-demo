import { getIcon } from "../utils";
import { MESSAGE } from "./messageConstants"

export function setMessage(message, type){
  const icon = getIcon(type);
  return {
    type: MESSAGE.SET_MESSAGE,
    payload: {message:message, messageType: type, icon: icon}
  }
}

export function setVisible(isVisible) {
  return {
    type: MESSAGE.SET_VISIBLE,
    payload: isVisible
  }
}

export function clearMessage() {
  return {
    type: MESSAGE.CLEAR_MESSAGE
  }
}

export function setMessageWithTimeout(message, type) {
  return(dispatch) => {
    dispatch(setMessage(message, type));
    setTimeout(() => {
      dispatch(setVisible(false))}, 3000);
    }
}

