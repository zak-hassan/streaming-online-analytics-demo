import { MODAL } from "../constants"

export function toggleCartModal(){
  return {
    type: MODAL.TOGGLE_MODAL,
    payload: "add_to_cart_modal"
  };
}

