import $ from "jquery";

import { setMessageWithTimeout } from "../message/messageActions";
import { clearProducts } from "../productView/productActions";
import { ORDER, ROUTES } from "./orderConstants";

export function checkout(cart){
  const url = ROUTES.CHECKOUT_ORDERS;

  return(dispatch) => {
    $.ajax({
      type: "POST",
      url: url,
      data: cart,
      success: function() {
        dispatch(clearProducts());
        dispatch(setMessageWithTimeout("Thanks your order is being processed", "success"));
      },
      error: function() {
        dispatch(setMessageWithTimeout("Unable to checkout", "danger"));
      }
    })
  }
}

export function updateTotal(updateBy) {
  return {
    type: ORDER.UPDATE_TOTAL,
    payload: updateBy
  }
}

export function setTotal(total) {
  return {
    type: ORDER.SET_TOTAL,
    payload: total
  }
}

export function clearToggle() {
  return {
    type:ORDER.CLEAR_TOGGLE
  }
}

export function toggleItem(productId, isSelected) {
  return isSelected ? {type: ORDER.ADD_SELECTED, payload: productId} :
    {type:ORDER.REMOVE_SELECTED, payload:productId};
}




