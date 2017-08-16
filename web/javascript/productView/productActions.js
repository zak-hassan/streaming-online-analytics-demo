import { CART } from "./constants"

export function addProduct (product) {
  return {
    type: CART.ADD,
    payload: product
  }
}

export function removeProduct (product) {
  return {
    type: CART.REMOVE,
    payload: product
  }
}

export function clearProducts () {
  return {
    type: CART.CLEAR,
  }
}
