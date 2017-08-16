import { MODAL } from "../constants"

export function toggleConfigModal(){
  return {
    type: MODAL.TOGGLE_MODAL,
    payload: "config_modal"
  };
}

export function toggleClassModal(){
  return {
    type: MODAL.TOGGLE_MODAL,
    payload: "class_modal"
  };
}
