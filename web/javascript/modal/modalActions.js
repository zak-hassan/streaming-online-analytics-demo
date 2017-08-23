import { MODAL } from "./modalConstants"

export function toggleCartModal(){
  return {
    type: MODAL.TOGGLE_MODAL,
    payload: "add_to_cart_modal"
  };
}

export function toggleShowCartModal(){
  return {
    type: MODAL.TOGGLE_MODAL,
    payload: "show_cart_modal",
  }
}

