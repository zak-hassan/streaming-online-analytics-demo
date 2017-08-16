import { ORDER } from "./orderConstants"

export function setCheckout(cart) {
  return {
    type: ORDER.SET_CHECKOUT,
    payload: cart
  }
}

export function checkout(cart) {

}

